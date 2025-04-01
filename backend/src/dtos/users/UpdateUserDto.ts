import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

class UpdateUserDto {
  @ApiProperty({
    type: Number,
    name: 'id',
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    name: 'firstname',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty({
    type: String,
    name: 'profile',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  profile?: string | null;

  @ApiProperty({
    type: String,
    name: 'email',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    type: String,
    name: 'lastname',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({
    type: String,
    name: 'password',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    type: String,
    name: 'phone',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phone?: string;
}

export default UpdateUserDto;
