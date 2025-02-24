import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import RoleDto from '../../dtos/roles/RoleDto';
import CreateRoleDto from '../../dtos/roles/CreateRoleDto';
import { JwtAuthGuardGuard } from '../../auth/jwt-auth.guard/jwt-auth.guard.guard';
import { Role, Roles } from '../../decorators/role.decorator';
import { RolesGuard } from '../../auth/roles.gaurds';

@UseGuards(JwtAuthGuardGuard,RolesGuard)
@Controller('v1/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll(): Promise<RoleDto[]> {
    try {
      return this.rolesService.findAll();
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<RoleDto | null> {
    try {
      return this.rolesService.findOne(id);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }

  @Roles(Role.ADMIN,Role.SUPERUSER)
  @Post()
  create(@Body() category: CreateRoleDto): Promise<any> {
    try {
      return this.rolesService.create(category);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }

  @Roles(Role.ADMIN,Role.SUPERUSER)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    try {
      return this.rolesService.delete(id);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }
}
