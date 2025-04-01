import { DeliveryStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateDeliveryDto {
  @ApiProperty({
    type: Number,
    required: true,
    name: 'id',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    enum: DeliveryStatus,
    description: 'Delivery status',
    name: 'status',
    nullable: true,
    required: false,
  })
  status: DeliveryStatus;
}
