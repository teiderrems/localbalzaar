import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Observable, of } from 'rxjs';
import { SendmailService } from './sendmail/sendmail.service';

@Injectable()
export class AppService {

  // constructor(private readonly sendmailService: SendmailService) {}

  // async sendEmail(email: string): Promise<any> {
  //
  // }
}
