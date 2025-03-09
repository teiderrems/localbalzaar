import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PrismaService } from 'src/prisma.service';
import { ProductsController } from './products.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [ProductsService, PrismaService],
  controllers: [ProductsController],
  imports: [MulterModule, ConfigModule],
})
export class ProductsModule {}
