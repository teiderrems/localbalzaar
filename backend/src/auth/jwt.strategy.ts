import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY ?? 'ok',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      firstname: payload.firstname,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
