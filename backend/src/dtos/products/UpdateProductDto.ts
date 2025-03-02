import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

class UpdateProductDto {
  @ApiProperty({
    type: Number,
    name: 'id',
    nullable: true,
    required: true,
  })
  id: number;

  @ApiProperty({
    type: String,
    name: 'name',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: String,
    name: 'image',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    type: Number,
    name: 'price',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    type: Number,
    name: 'quantity',
    nullable: true,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    type: Array<number>,
    name: 'categories',
    nullable: true,
    required: false,
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  categories?: number[];
}

export default UpdateProductDto;
