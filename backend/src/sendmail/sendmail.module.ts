import { Module } from '@nestjs/common';
import { SendmailService } from './sendmail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [SendmailService, ConfigService],
  imports: [ConfigModule],
  exports: [SendmailService, ConfigService],
})
export class SendmailModule {}
