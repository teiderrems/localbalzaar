import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SendMailDto } from './dtos/auth/SendMailDto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class AppController {
  constructor(private eventEmitter: EventEmitter2) {}
  @Post('email')
  sendMail(@Body() sendMailDto: SendMailDto) {
    try {
      const sdm = new SendMailDto();
      sdm.subject = sendMailDto.subject;
      sdm.email = sendMailDto.email;
      sdm.content = sendMailDto.content;
      return this.eventEmitter.emit('user.email', sdm);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, error);
    }
  }
}
