import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PrismaService } from 'src/prisma.service';
import { ProductsController } from './products.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../../multer.config.service';

@Module({
  providers: [ProductsService, PrismaService],
  controllers: [ProductsController],
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
})
export class ProductsModule {}
