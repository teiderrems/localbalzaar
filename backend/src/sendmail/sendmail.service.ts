import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailDto } from '../dtos/auth/SendMailDto';
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendmailService {
  constructor(private configService: ConfigService) {}

  @OnEvent('user.*')
  async sendWelcomeEmail(credential: SendMailDto): Promise<any> {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    try {
      const transport = nodemailer.createTransport({
        port: 1025,
      });
      return await transport.sendMail({
        to: credential.email,
        from: this.configService.get<string>('FROM') ?? 'raoul.teida@gmail.com',
        subject: credential.subject ?? 'Welcome to LocalBalzaar',
        html:
          credential.content ??
          `
     <!DOCTYPE html>
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
              <h1>Bienvenue à bord ! ${credential.email}</h1>
              <p>Nous sommes ravis de vous accueillir parmi nous. Préparez-vous à vivre une expérience exceptionnelle.</p>
              <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
              <a href="http://localhost:3000/auth/confirm-email?email=${credential.email}" class="button">Confirmer votre adresse e-mail</a>
              <p class="footer">&copy; 2025 Votre Entreprise. Tous droits réservés.</p>
          </div>
      </body>
      </html>
    `,
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
