import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
import { IsNumber } from 'class-validator';

export class UpdateShopDto {
  @ApiProperty({
    type: Number,
    name: 'id',
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    name: 'name',
    required: false,
  })
  @Optional()
  name?: string;

  @ApiProperty({
    type: String,
    name: 'address',
    required: false,
  })
  @Optional()
  address?: string;

  @ApiProperty({
    type: String,
    name: 'phone',
    required: false,
  })
  @Optional()
  phone?: string;
}
