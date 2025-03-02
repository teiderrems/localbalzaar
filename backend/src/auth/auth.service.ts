import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SignInDto } from '../dtos/auth/SignInDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { ResetPasswordDto } from '../dtos/auth/ResetPasswordDto';
import { Payload } from './roles.gaurds';
import { v6 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: SignInDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: credentials.email, emailConfirm: true },
        select: {
          email: true,
          password: true,
          firstname: true,
          lastname: true,
          emailConfirm: true,
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
          refresh_token: this.jwtService.sign(payload, {
            secret: process.env.SECRET_KEY ?? 'ok',
            expiresIn: '1d',
          }),
        });
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async reset_password(credentials: ResetPasswordDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: credentials.email },
      select: { password: true, id: true },
    });
    const token = await this.prismaService.token.findUniqueOrThrow({
      where: { email: credentials.email },
      select: {
        code: true,
      },
    });
    if (!user || credentials.code != token.code) {
      return Promise.resolve(null);
    } else {
      await this.prismaService.token.delete({
        where: { email: credentials.email },
      });
      const salt = await bcrypt.genSalt(10);
      return Promise.resolve(
        this.prismaService.user.update({
          where: { id: user.id },
          data: {
            password: await bcrypt.hash(credentials.password, salt),
          },
        }),
      );
    }
  }

  async confirm_email(email: string): Promise<{ id: number }> {
    return this.prismaService.user.update({
      where: { email: email },
      data: { emailConfirm: true },
      select: {
        id: true,
      },
    });
  }

  async verify_email(email: string): Promise<{ code: string } | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });
    if (!user) {
      return Promise.resolve(null);
    }
    const token = await this.prismaService.token.create({
      data: {
        email: email,
        code: v6(),
      },
      select: {
        code: true,
      },
    });
    return { code: token.code };
  }

  async refresh_token(refresh_token: string) {
    if (refresh_token) {
      try {
        const paylaod = await this.jwtService.verifyAsync<Payload>(
          refresh_token,
          {
            secret: process.env.SECRET_KEY,
          },
        );
        return {
          access_token: this.jwtService.sign(paylaod, {
            secret: process.env.SECRET_KEY,
          }),
        };
      } catch (error) {
        console.error(error);
      }
    }
    return null;
  }
}
