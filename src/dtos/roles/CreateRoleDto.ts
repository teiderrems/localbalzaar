import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class CreateRoleDto {
  @ApiProperty({
    name: 'name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export default CreateRoleDto;
