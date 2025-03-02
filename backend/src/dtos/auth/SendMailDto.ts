import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMailDto {
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
  })
  @IsString()
  email: string;

  @IsOptional()
  @ApiProperty({
    name: 'content',
    type: String,
    required: false,
  })
  @IsString()
  content?: string;

  @IsOptional()
  @ApiProperty({
    name: 'subject',
    type: String,
    required: false,
  })
  @IsString()
  subject?: string;
}
