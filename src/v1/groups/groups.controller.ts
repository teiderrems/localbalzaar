/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Observable } from 'rxjs';
import { JwtAuthGuardGuard } from '../../auth/jwt-auth.guard/jwt-auth.guard.guard';
import { Role, Roles } from '../../decorators/role.decorator';
import CreateGroupDto from '../../dtos/groups/CreateGroupDto';
import { RolesGuard } from '../../auth/roles.gaurds';

@UseGuards(JwtAuthGuardGuard, RolesGuard)
@Controller('v1/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll(): Observable<any[]> {
    try {
      return this.groupsService.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND, error);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    try {
      return this.groupsService.findOne(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND, error);
    }
  }

  @Post()
  create(@Body() createPaymentDto: CreateGroupDto): Observable<any> {
    try {
      return this.groupsService.create(createPaymentDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Roles(Role.SUPERUSER || Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Observable<any> {
    try {
      return this.groupsService.delete(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
