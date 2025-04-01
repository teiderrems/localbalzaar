import { PaymentMethod } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    enum: PaymentMethod,
    type: String,
    required: true,
    description: 'Payment method is required',
    name: 'method',
  })
  method: PaymentMethod;

  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Payment amount is required',
    name: 'amount',
  })
  amount: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    name: 'orderId',
  })
  orderId: number;
}
