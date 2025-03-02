import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'password',
    required: true,
    type: String,
  })
  password: string;

  @IsString()
  @ApiProperty({
    name: 'code',
    required: false,
    type: String,
  })
  @IsOptional()
  code: string | undefined;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    name: 'email',
    required: true,
    type: String,
  })
  email: string;
}
