import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { SendMailDto } from './dtos/auth/SendMailDto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Response } from 'express';

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

  @Get()
  index(@Res() res:Response){
    return res.status(200).send(`<!DOCTYPE html>
      <html lang="fr">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Bienvenue !</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  display:flex;
                  height:100vh;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  text-align: center;
              }
              h1 {
                  color: #333;
              }
              p {
                  color: #555;
                  font-size: 16px;
                  line-height: 1.5;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin-top: 20px;
                  background-color: #007BFF;
                  color: #ffffff;
                  text-decoration: none;
                  font-size: 18px;
                  border-radius: 5px;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 14px;
                  color: #888;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Bienvenue à bord !</h1>
              <p>Nous sommes ravis de vous accueillir parmi nous. Préparez-vous à vivre une expérience exceptionnelle.</p>
              <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
              <p class="footer">&copy; 2025 Votre Entreprise. Tous droits réservés.</p>
          </div>
      </body>
      </html>
    `)
  }
}
