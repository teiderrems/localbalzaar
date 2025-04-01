import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { SendmailModule } from '../../sendmail/sendmail.module';
import { ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe.service';

@Module({
  providers: [UsersService, PrismaService, StripeService],
  imports: [MulterModule, SendmailModule, ConfigModule],
  controllers: [UsersController],
  exports:[StripeService]
})
export class UsersModule {}
