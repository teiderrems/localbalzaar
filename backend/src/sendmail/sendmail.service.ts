import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailDto } from '../dtos/auth/SendMailDto';
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendmailService {
  constructor(private configService: ConfigService) {}

  @OnEvent('user.valided-email')
  async sendWelcomeEmail(email:string): Promise<any> {
    try {
      const transport = nodemailer.createTransport({
        host: "mail.gmx.com",
        port: 587,
        service: 'GMX',
        auth: {
          user: this.configService.get<string>('FROM'),
          pass: this.configService.get<string>('GMX_PASSWORD'),
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      return await transport.sendMail({
        to: email,
        from: this.configService.get<string>('FROM'),
        subject:'Welcome to LocalBalzaar',
        html:
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
              <h1>Bienvenue à bord ! ${email}</h1>
              <p>Nous sommes ravis de vous accueillir parmi nous. Préparez-vous à vivre une expérience exceptionnelle.</p>
              <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
              <a href="http://localhost:3000/auth/confirm-email?email=${email}" class="button">Confirmer votre adresse e-mail</a>
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
  
  @OnEvent('user.email')
  async sendEmail(credential: SendMailDto): Promise<any> {
    try {
      const transport = nodemailer.createTransport({
        host: "mail.gmx.com",
        port: 587,
        service: 'GMX',
        auth: {
          user: this.configService.get<string>('FROM'),
          pass: this.configService.get<string>('GMX_PASSWORD'),
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      return await transport.sendMail({
        to: credential.email,
        from: this.configService.get<string>('FROM') ?? 'raoul.teida@gmx.com',
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
              <h1>Bienvenue à bord !</h1>
              <p>Nous sommes ravis de vous accueillir parmi nous. Préparez-vous à vivre une expérience exceptionnelle.</p>
              <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
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


  @OnEvent('user.password-reset')
  async sendResetPasswordEmail(email:string,resetCode:string): Promise<any> {
    try {
      const transport = nodemailer.createTransport({
        host: "mail.gmx.com",
        port: 587,
        service: 'GMX',
        auth: {
          user: this.configService.get<string>('FROM'),
          pass: this.configService.get<string>('GMX_PASSWORD'),
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      return await transport.sendMail({
        to: email,
        from: this.configService.get<string>('FROM') ?? 'raoul.teida@gmx.com',
        subject: 'Reset Password',
        html:
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
              
              <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
              <a href="http://localhost:3000/auth/confirm-email?email=${email}&reset_code=${resetCode}" class="button">Merci de suivre ce lien pour réinitialiser votre mot de passe</a>
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
