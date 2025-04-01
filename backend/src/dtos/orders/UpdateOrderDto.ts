import { OrderStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    name: 'id',
    type: Number,
    nullable: true,
    required: true,
  })
  id: number;
  @ApiProperty({
    enum: OrderStatus,
    name: 'status',
    type: String,
    nullable: true,
    required: true,
  })
  status: OrderStatus;
}
