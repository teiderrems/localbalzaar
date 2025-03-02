import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';

@Module({
  imports: [],
  controllers: [GroupsController],
  providers: [GroupsService,PrismaService],
})
export class GroupsModule {}
