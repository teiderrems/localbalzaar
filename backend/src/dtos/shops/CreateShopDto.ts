import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateShopDto {
  @ApiProperty({
    type: String,
    required: true,
    name: 'name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    name: 'address',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    required: true,
    name: 'phone',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
