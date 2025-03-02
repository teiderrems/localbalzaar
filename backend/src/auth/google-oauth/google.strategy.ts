/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      clientID: configService.get<string>('CLIENT_ID_GOOGLE_OAUTH') as string,
      clientSecret: configService.get<string>(
        'CLIENT_SECRET_GOOGLE_OAUTH',
      ) as string,
      callbackURL: configService.get<string>('REDIRECT_URL') as string,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      email: emails[0].value,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      name: `${name.givenName} ${name.familyName}`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      picture: photos[0].value,
    };
    try {
      const currentuser = await this.prisma.user.findFirst({
        where: { email: user.email },
      });
      if (!currentuser) {
        const salt = await bcrypt.genSalt(10);
        const password = this.configService.get<string>(
          'DEFAULT_PASSWORD',
        ) as string;
        await this.prisma.user.create({
          data: {
            email: user.email,
            emailConfirm: true,
            password: await bcrypt.hash(password, salt),
            firstname: user.name.split(' ')[1],
            lastname: user.name.split(' ')[0],
            profile: user.picture,
          },
        });
      }
    } catch (error: any) {
      console.log(error);
    }

    done(null, user);
  }
}
