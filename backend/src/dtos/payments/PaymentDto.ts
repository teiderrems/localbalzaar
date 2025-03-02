import { PaymentMethod, PaymentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({
    name: 'status',
    type: String,
    enum: PaymentStatus,
  })
  status: PaymentStatus;

  @ApiProperty({
    name: 'method',
    type: String,
    enum: PaymentMethod,
  })
  method: PaymentMethod;

  @ApiProperty({
    name: 'amount',
    type: Number,
  })
  amount: number;

  @ApiProperty({
    name: 'order',
    type: Object,
  })
  order: {
    id: number;
    user: {
      email: string;
    };
  };

  @ApiProperty({
    name: 'createdAt',
    type: Date,
  })
  createdAt: Date;
}
