import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    name: 'email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(8)
  @ApiProperty({
    type: String,
    name: 'password',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    name: 'firstname',
  })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    name: 'lastname',
  })
  lastname: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    name: 'phone',
  })
  phone: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    name: 'profile',
    required: false,
  })
  profile?: string;
}
