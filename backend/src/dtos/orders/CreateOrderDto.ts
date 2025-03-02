import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    name: 'items',
    type: Array<Item>,
    required: true,
    description: 'items list',
  })
  items: Item[];
}

export class Item {
  @ApiProperty({
    name: 'quantity',
    type: Number,
    required: true,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    name: 'price',
    type: Number,
    required: true,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    name: 'productId',
    type: Number,
    required: true,
  })
  @IsNumber()
  productId: number;
}
