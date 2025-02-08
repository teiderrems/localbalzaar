import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    name: 'email',
    description: 'Email',
    required: true,
  })
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'Password',
    required: true,
  })
  password: string;
}
