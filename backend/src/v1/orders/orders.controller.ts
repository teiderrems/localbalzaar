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
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from '../../dtos/orders/UpdateOrderDto';
import { CreateOrderDto } from '../../dtos/orders/CreateOrderDto';
import { User } from '../../decorators/user.decorator';
import { JwtAuthGuardGuard } from '../../auth/jwt-auth.guard/jwt-auth.guard.guard';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
import { OrderDto } from '../../dtos/orders/OrderDto';
import { Payload } from '../../auth/roles.gaurds';

@UseGuards(JwtAuthGuardGuard)
@Controller('v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(
    @Query() pagination: QueryDto,
  ): Promise<PaginationResponseDto<OrderDto>> {
    try {
      return this.ordersService.findAll(pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, error);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderDto | null> {
    try {
      return this.ordersService.findOne(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, error);
    }
  }

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @User() user: Payload,
  ): Promise<{ id: number }> {
    try {
      return this.ordersService.create(createOrderDto, user);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<{ id: number }> {
    try {
      return this.ordersService.update(id, updateOrderDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
  @Delete(':id')
  delete(@Param('id') id: number): Promise<{ id: number }> {
    try {
      return this.ordersService.delete(id);
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
