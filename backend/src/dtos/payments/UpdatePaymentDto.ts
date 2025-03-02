import { PaymentStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentDto {
  @ApiProperty({
    name: 'id',
    description: 'Payment ID',
    example: '12345678',
    type: Number,
    nullable: true,
    required: true,
  })
  id: number;

  @IsNotEmpty()
  @ApiProperty({
    enum: PaymentStatus,
    type: String,
    required: true,
    description: 'Payment status is required',
    name: 'status',
    nullable: true,
  })
  status: PaymentStatus;
}
