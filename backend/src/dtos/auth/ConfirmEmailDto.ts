import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailDto {
  @ApiProperty({
    name: 'email',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  email: string;
}
