import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { from, Observable } from 'rxjs';
import CategoriesDto from '../../dtos/categories/CategorieDto';
import { CreateCategorieDto } from '../../dtos/categories/CreateCategorieDto';

@Injectable()
export class CategoriesService {

  constructor(private readonly  prismaService: PrismaService) {
  }

  findAll():Observable<CategoriesDto[]>{

    return from(this.prismaService.category.findMany({
      select:{
        name:true,
        id:true,
      }
    }));
  }

  findOne(id:number):Observable<CategoriesDto | null>{
    return from(
      this.prismaService.category.findUnique({where:{id},
      select:{
        name:true,
        id:true,
      }})
    );
  }

  create(categoryDto:CreateCategorieDto):Observable<any>{
    return from(this.prismaService.category.create({
      data:categoryDto,
    }));
  }

  delete(id:number):Observable<any>{
    return from(
      this.prismaService.category.delete({where:{id}})
    );
  }
}
