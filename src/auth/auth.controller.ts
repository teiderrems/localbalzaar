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
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../dtos/auth/SignInDto';
import { ResetPasswordDto } from '../dtos/auth/ResetPasswordDto';
import { ConfirmEmailDto } from '../dtos/auth/ConfirmEmailDto';
import { RefreshTokenDto } from '../dtos/auth/RefreshTokenDto';
import { GoogleOauthGuard } from './google-oauth/google-oauth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req) {
    if (req.user) {
      try {
        const token = await this.authService.login({
          email: req.user.email as string,
          password: this.configService.get<string>(
            'DEFAULT_PASSWORD',
          ) as string,
        });
        if (token) {
          return token;
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
  }

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
