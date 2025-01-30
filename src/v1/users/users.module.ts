import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../../multer.config.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendmailService } from '../../sendmail/sendmail.service';
import { SendmailModule } from '../../sendmail/sendmail.module';

@Module({
  providers: [UsersService,SendmailService, PrismaService,],
  imports: [
    MulterModule.registerAsync({
      useClass:MulterConfigService,
    }),
    SendmailModule
  ],
  controllers: [UsersController],
})
export class UsersModule {}
