/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Redirect,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../dtos/auth/SignInDto';
import { ResetPasswordDto } from '../dtos/auth/ResetPasswordDto';
import { ConfirmEmailDto } from '../dtos/auth/ConfirmEmailDto';
import { RefreshTokenDto } from '../dtos/auth/RefreshTokenDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: SignInDto) {
    try {
      const access_token = await this.authService.login(credentials);
      if (access_token) {
        return access_token;
      }
      return new UnauthorizedException();
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Post('reset-password')
  resetPassword(@Body() credentials: ResetPasswordDto) {
    try {
      return this.authService.reset_password(credentials);
    } catch (error) {
      console.error(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error);
      throw new UnauthorizedException(error.message, error);
    }
  }

  @Post('verify-email')
  verifyEmail(@Body() credential: ConfirmEmailDto) {
    try {
      return this.authService.verify_email(credential.email);
    } catch (error) {
      console.error(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error);
      throw new UnauthorizedException(error.message, error);
    }
  }

  @Get('confirm-email')
  async confirmEmail(@Query('email') email: string) {
    try {
      const user = await this.authService.confirm_email(email);
      return user
        ? Redirect('http://localhost:3000/v1/products')
        : new UnauthorizedException();
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN, error);
    }
  }

  @Post('refresh-token')
  refreshToken(@Body() credential: RefreshTokenDto) {
    try {
      return this.authService.refresh_token(credential.refresh_token);
    } catch (error) {
      console.error(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error);
      throw new UnauthorizedException(error.message, error);
    }
  }
}
