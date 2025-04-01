import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty({
    type: Number,
    name: 'id',
  })
  id: number;
  @ApiProperty({
    type: String,
    name: 'email',
  })
  email: string;
  @ApiProperty({
    type: String,
    name: 'firstname',
  })
  firstname: string | null;
  @ApiProperty({
    type: String,
    name: 'lastname',
  })
  lastname: string | null;
  @ApiProperty({
    type: String,
    name: 'phone',
  })
  phone: string | null;
  @ApiProperty({
    type: Date,
    name: 'createdAt',
  })
  createdAt: Date;
  @ApiProperty({
    type: Date,
    name: 'updatedAt',
  })
  updatedAt: Date;
}

export default UserDto;
