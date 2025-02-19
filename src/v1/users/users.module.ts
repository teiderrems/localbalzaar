import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../../multer.config.service';
import { SendmailModule } from '../../sendmail/sendmail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [UsersService, PrismaService],
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    SendmailModule,
    ConfigModule,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
