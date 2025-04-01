import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class ShopDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsPhoneNumber()
  @IsString()
  phone: string;

  user: {
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
