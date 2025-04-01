import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({
    type: String,
    name: 'deliveryAddress',
  })
  @IsNotEmpty()
  @IsString()
  deliveryAddress: string;

  @ApiProperty({
    type: Date,
    name: 'deliveryDate',
  })
  @IsDate()
  deliveryDate?: Date;

  @ApiProperty({
    type: Number,
    name: 'orderId',
  })
  @IsNumber()
  orderId: number;
}
