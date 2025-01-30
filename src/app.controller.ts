import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SendmailService } from './sendmail/sendmail.service';
import { SendMailDto } from './dtos/auth/SendMailDto';

@Controller()
export class AppController {

  constructor(private readonly sendmailService: SendmailService) {}
  @Post('email')
  async sendMail(@Body() sendMailDto: SendMailDto) {
    try {
      return await this.sendmailService.sendWelcomeEmail(sendMailDto);
    }
    catch (error) {
      console.error(error);
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST,error);
    }
  }
}
