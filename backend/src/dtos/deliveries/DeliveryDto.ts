import { DeliveryStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class DeliveryDto {
  @ApiProperty({
    name: 'id',
    type: Number,
    required: true,
  })
  id: number;

  @ApiProperty({
    name: 'status',
    type: String,
    required: true,
    enum: DeliveryStatus,
  })
  status: DeliveryStatus;

  @ApiProperty({
    name: 'deliveryAddress',
    type: String,
    required: true,
  })
  deliveryAddress: string;

  @ApiProperty({
    name: 'deliveryDate',
    type: Date,
    required: true,
  })
  deliveryDate: Date | null;
}
