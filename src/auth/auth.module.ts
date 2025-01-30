import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.gaurds';
import { JwtAuthGuardGuard } from './jwt-auth.guard/jwt-auth.guard.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule,],
  providers: [
    AuthService,PrismaService,JwtStrategy ],
  controllers: [AuthController],
  exports:[AuthService,JwtStrategy]
})
export class AuthModule {}
