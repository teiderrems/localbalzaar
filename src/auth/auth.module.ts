import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google-oauth/google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [PassportModule, JwtModule, ConfigModule],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    GoogleStrategy,
    ConfigService,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
