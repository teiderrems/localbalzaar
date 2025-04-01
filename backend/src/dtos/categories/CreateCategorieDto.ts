import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategorieDto {
  @ApiProperty({
    name: 'name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
