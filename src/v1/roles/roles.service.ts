import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { from, Observable } from 'rxjs';
import RoleDto from '../../dtos/categories/CategorieDto';
import CreateRoleDto from '../../dtos/roles/CreateRoleDto';

@Injectable()
export class RolesService {

  constructor(private readonly  prismaService: PrismaService) {
  }

  findAll():Observable<RoleDto[]>{

    return from(this.prismaService.category.findMany({
      select:{
        name:true,
        id:true,
      }
    }));
  }

  findOne(id:number):Observable<RoleDto | null>{
    return from(
      this.prismaService.category.findUnique({where:{id},
        select:{
          name:true,
          id:true,
        }})
    );
  }

  create(categoryDto:CreateRoleDto):Observable<any>{
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
