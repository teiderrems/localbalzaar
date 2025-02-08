import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { from, Observable } from 'rxjs';
import CreateGroupDto from '../../dtos/groups/CreateGroupDto';
import CategorieDto from 'src/dtos/categories/CategorieDto';

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Observable<CategorieDto[]> {
    return from(
      this.prismaService.group.findMany({
        select: {
          id: true,
          name: true,
        },
      }),
    );
  }

  findOne(id: number): Observable<CategorieDto | null> {
    return from(
      this.prismaService.group.findUnique({
        where: { id },
        select: { id: true, name: true },
      }),
    );
  }

  create(createGroupDto: CreateGroupDto): Observable<any> {
    return from(
      this.prismaService.group.create({
        data: createGroupDto,
        select: { id: true },
      }),
    );
  }

  delete(id: number): Observable<any> {
    return from(
      this.prismaService.group.delete({
        where: { id },
        select: { id: true },
      }),
    );
  }
}
