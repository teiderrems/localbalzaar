import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategorieDto } from '../../dtos/categories/CreateCategorieDto';
import CategorieDto from '../../dtos/categories/CategorieDto';
import { Role, Roles } from '../../decorators/role.decorator';
import { RolesGuard } from '../../auth/roles.gaurds';
import {
  JwtAuthGuardGuard,
  Public,
} from '../../auth/jwt-auth.guard/jwt-auth.guard.guard';

@UseGuards(JwtAuthGuardGuard, RolesGuard)
@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get()
  findAll(): Promise<CategorieDto[]> {
    try {
      return this.categoriesService.findAll();
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }

  @Public()
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategorieDto | null> {
    try {
      return this.categoriesService.findOne(id);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }

  @Roles(Role.ADMIN, Role.SUPERUSER)
  @Post()
  create(@Body() category: CreateCategorieDto): Promise<any> {
    try {
      return this.categoriesService.create(category);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Roles(Role.ADMIN, Role.SUPERUSER)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    try {
      return this.categoriesService.delete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
