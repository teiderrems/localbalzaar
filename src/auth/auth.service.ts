import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SignInDto } from '../dtos/auth/SignInDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { ResetPasswordDto } from '../dtos/auth/ResetPasswordDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: SignInDto) {
    try {
      let user = await this.prismaService.user.findUnique({
        where: { email: credentials.email },
        select: {
          email: true,
          password: true,
          firstname: true,
          lastname: true,
          id: true,
          userRole: {
            select: {
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (
        !user ||
        !(await bcrypt.compare(credentials.password, user.password!))
      ) {
        return null;
      } else {
        const payload = {
          firstname: user.firstname,
          email: user.email,
          sub: user.id,
          roles: user.userRole,
        };

        return Promise.resolve({
          access_token: this.jwtService.sign(payload, {
            secret: process.env.SECRET_KEY ?? 'ok',
            expiresIn: '1h',
          }),
          refresh_token: this.jwtService.sign(
            payload,
            {
              secret: process.env.SECRET ?? 'ok',
              expiresIn: '1d',
            },
          ),
        });
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async reset_password(credentials: ResetPasswordDto) {
    let user= await this.prismaService.user.findUnique({ where: { email: credentials.email }, select: {password: true,id: true} });
    if (
      !user || !(await bcrypt.compare(credentials.password, user.password!)) || credentials.code !== 'hello') {
      return Promise.resolve(null);
    }
    else {
      let salt = await bcrypt.genSalt(10);
      return Promise.resolve(
        this.prismaService.user.update({
          where: { id: user.id },
          data: {
            password: await bcrypt.hash(user.password!, salt),
          },
        }),
      );
    }
  }

  async confirm_email(email: string): Promise<{ code: string } | null> {
    let user: any = null;
    this.prismaService.user
      .findUnique({
        where: { email },
        select: {
          id: true,
        },
      })
      .then((value) => (user = value));
    if (!user) {
      return Promise.resolve(null);
    }
    return Promise.resolve({ code: 'hello' });
  }

  async refresh_token(refresh_token: string) {
    if (!!refresh_token) {
      try {
        return await this.jwtService.verifyAsync(refresh_token,{secret:process.env.SECRET_KEY});
      }
      catch (error) {
        console.error(error);
      }
    }
    return null;
  }
}
