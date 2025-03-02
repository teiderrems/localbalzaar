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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from '../../dtos/payments/CreatePaymentDto';
import { UpdatePaymentDto } from '../../dtos/payments/UpdatePaymentDto';
import { JwtAuthGuardGuard } from '../../auth/jwt-auth.guard/jwt-auth.guard.guard';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
import { PaymentDto } from '../../dtos/payments/PaymentDto';

@UseGuards(JwtAuthGuardGuard)
@Controller('v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll(
    @Query() pagination: QueryDto,
  ): Promise<PaginationResponseDto<PaymentDto>> {
    try {
      return this.paymentsService.findAll(pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND, error);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PaymentDto | null> {
    try {
      return this.paymentsService.findOne(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND, error);
    }
  }

  @Post()
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<{ id: number }> {
    try {
      return await this.paymentsService.create(createPaymentDto);
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
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<{ id: number }> {
    try {
      return await this.paymentsService.update(id, updatePaymentDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Delete('id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ id: number }> {
    try {
      return await this.paymentsService.delete(id);
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
