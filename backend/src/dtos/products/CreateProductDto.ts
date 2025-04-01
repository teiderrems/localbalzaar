import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

class CreateProductDto {
  @ApiProperty({
    type: String,
    name: 'name',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    type: String,
    name: 'image',
    required: false,
  })
  @IsString()
  image: string | null;

  @ApiProperty({
    type: Number,
    name: 'shopId',
  })
  @IsNumber()
  shopId: number;

  @ApiProperty({
    type: String,
    name: 'price',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: Number,
    name: 'quantity',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: String,
    name: 'description',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    type: Array,
    name: 'categories',
  })
  @IsNumber({}, { each: true })
  categories: number[];
}

export default CreateProductDto;
