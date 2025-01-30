import { Body, Controller, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../dtos/auth/SignInDto';
import { ResetPasswordDto } from '../dtos/auth/ResetPasswordDto';
import { ConfirmEmailDto } from '../dtos/auth/ConfirmEmailDto';
import { RefreshTokenDto } from '../dtos/auth/RefreshTokenDto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService){}

  @Post('login')
  login(@Body() credentials:SignInDto){
    try {
      return this.authService.login(credentials);
    }
    catch(error){
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR,error);
    }
  }

  @Post('reset-password')
  resetPassword(@Body() credentials:ResetPasswordDto){
    try {
      return this.authService.reset_password(credentials);
    }
    catch(error){
      console.error(error.message,HttpStatus.INTERNAL_SERVER_ERROR,error);
      throw new UnauthorizedException(error.message,error);
    }
  }

  @Post('confirm-email')
  confirmEmail(@Body() credential:ConfirmEmailDto){
    try {
      return this.authService.confirm_email(credential.email);
    }
    catch(error){
      console.error(error.message,HttpStatus.INTERNAL_SERVER_ERROR,error);
      throw new UnauthorizedException(error.message,error);
    }
  }

  @Post('refresh-token')
  refreshToken(@Body() credential:RefreshTokenDto){
    try {
      return this.authService.refresh_token(credential.refresh_token);
    }
    catch(error){
      console.error(error.message,HttpStatus.INTERNAL_SERVER_ERROR,error);
      throw new UnauthorizedException(error.message,error);
    }
  }

}
