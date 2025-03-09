import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { SendmailModule } from '../../sendmail/sendmail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [UsersService, PrismaService],
  imports: [MulterModule, SendmailModule, ConfigModule],
  controllers: [UsersController],
})
export class UsersModule {}
