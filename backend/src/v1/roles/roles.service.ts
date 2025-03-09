import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import RoleDto from '../../dtos/categories/CategorieDto';
import CreateRoleDto from '../../dtos/roles/CreateRoleDto';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<RoleDto[]> {
    return this.prismaService.role.findMany({
      select: {
        name: true,
        id: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  findOne(id: number): Promise<RoleDto | null> {
    return this.prismaService.category.findUnique({
      where: { id },
      select: {
        name: true,
        id: true,
      },
    });
  }

  create(createRoleDto: CreateRoleDto): Promise<any> {
    return this.prismaService.category.create({
      data: createRoleDto,
    });
  }

  delete(id: number): Promise<any> {
    return this.prismaService.category.delete({ where: { id } });
  }
}
