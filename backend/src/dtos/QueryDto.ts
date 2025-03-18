import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    default: 20,
    name: 'limit',
  })
  limit: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    default: 0,
    name: 'offset',
  })
  offset: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    default: 10,
    name: 'last',
  })
  last: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    default: 1,
    name: 'first',
  })
  first: number;

  @ApiProperty({
    type: String,
    required: false,
    name: 'search',
  })
  search?: string;
}

export class PaginationResponseDto<T> {
  @IsNumber()
  @ApiProperty({
    type: Number,
    name: 'total',
  })
  total: number;

  @ApiProperty({
    type: Array<T>,
    name: 'data',
  })
  data?: T[];

  @IsNumber()
  @ApiProperty({
    type: Number,
    name: 'pageSize',
  })
  pageSize: number;
}
