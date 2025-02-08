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
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { UpdateShopDto } from '../../dtos/shops/UpdateShopDto';
import { CreateShopDto } from '../../dtos/shops/CreateShopDto';
import { User } from '../../decorators/user.decorator';
import {
  JwtAuthGuardGuard,
  Public,
} from '../../auth/jwt-auth.guard/jwt-auth.guard.guard';
import { Role, Roles } from '../../decorators/role.decorator';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
import { ShopDto } from '../../dtos/shops/ShopDto';
import { Payload } from 'src/auth/roles.gaurds';

@UseGuards(JwtAuthGuardGuard)
@Controller('v1/shops')
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  @Public()
  @Get()
  findAll(
    @Query() pagination: QueryDto,
  ): Promise<PaginationResponseDto<ShopDto>> {
    try {
      return this.shopsService.findAll(pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND, error);
    }
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ShopDto | null> {
    try {
      return this.shopsService.findOne(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND, error);
    }
  }

  @Roles(Role.ADMIN, Role.SUPERUSER)
  @Post()
  create(
    @Body() createShopDto: CreateShopDto,
    @User() user: Payload,
  ): Promise<{ id: number }> {
    try {
      return this.shopsService.create(createShopDto, user);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Roles(Role.ADMIN, Role.SUPERUSER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() shop: UpdateShopDto,
  ): Promise<{ id: number }> {
    try {
      return this.shopsService.update(id, shop);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Roles(Role.ADMIN, Role.SUPERUSER)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<{ id: number }> {
    try {
      return this.shopsService.delete(id);
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
