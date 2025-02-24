import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import CategoriesDto from '../../dtos/categories/CategorieDto';
import { CreateCategorieDto } from '../../dtos/categories/CreateCategorieDto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<CategoriesDto[]> {
    return this.prismaService.category.findMany({
        select: {
          name: true,
          id: true,
        },
      })
  }

  findOne(id: number): Promise<CategoriesDto | null> {
    return this.prismaService.category.findUnique({
        where: { id },
        select: {
          name: true,
          id: true,
        },
      })
  }

  create(categoryDto: CreateCategorieDto): Promise<any> {
    return this.prismaService.category.create({
        data: categoryDto,
      }) 
  }

  delete(id: number): Promise<any> {
    return(this.prismaService.category.delete({ where: { id } }));
  }
}
