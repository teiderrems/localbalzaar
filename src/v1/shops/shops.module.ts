import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { PrismaService } from '../../prisma.service';
import { ShopsService } from './shops.service';

@Module({
  imports: [],
  controllers: [ShopsController],
  providers: [ShopsService, PrismaService],
})
export class ShopsModule {}
