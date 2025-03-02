import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    name: 'refresh_token',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
