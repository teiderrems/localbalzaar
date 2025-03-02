import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import CreateGroupDto from '../../dtos/groups/CreateGroupDto';
import CategorieDto from 'src/dtos/categories/CategorieDto';

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<CategorieDto[]> {
    return this.prismaService.group.findMany({
        select: {
          id: true,
          name: true,
        },
      });
  }

  findOne(id: number): Promise<CategorieDto | null> {
    return this.prismaService.group.findUnique({
        where: { id },
        select: { id: true, name: true },
      });
  }

  create(createGroupDto: CreateGroupDto): Promise<any> {
    return this.prismaService.group.create({
        data: createGroupDto,
        select: { id: true },
      });
  }

  delete(id: number): Promise<any> {
    return this.prismaService.group.delete({
        where: { id },
        select: { id: true },
      });
  }
}
