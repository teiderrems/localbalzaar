/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { UpdateDeliveryDto } from '../../dtos/deliveries/UpdateDeliveryDto';
import { JwtAuthGuardGuard } from '../../auth/jwt-auth.guard/jwt-auth.guard.guard';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
import { DeliveryDto } from '../../dtos/deliveries/DeliveryDto';
import { CreateDeliveryDto } from '../../dtos/deliveries/CreateDeliveryDto';

@UseGuards(JwtAuthGuardGuard)
@Controller('v1/deliveries')
export class DeliveriesController {
  constructor(private deliveries: DeliveriesService) {}

  @Get()
  findAll(
    @Query() pagination: QueryDto,
  ): Promise<PaginationResponseDto<DeliveryDto>> {
    try {
      return this.deliveries.findAll(pagination);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DeliveryDto | null> {
    try {
      return this.deliveries.findOne(id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  create(@Body() delivery: CreateDeliveryDto): Promise<{ id: number }> {
    try {
      return this.deliveries.create(delivery);
    } catch (error) {
      console.error(error.message);
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
    delivery: UpdateDeliveryDto,
  ): Promise<{ id: number }> {
    try {
      return this.deliveries.update(id, delivery);
    } catch (error) {
      console.error(error.message);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<{ id: number }> {
    try {
      return this.deliveries.delete(id);
    } catch (error) {
      console.error(error.message);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
