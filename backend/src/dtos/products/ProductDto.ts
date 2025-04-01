import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  quantity?: number;

  @IsString()
  image: string | null;

  @IsNumber()
  price?: number;

  @IsBoolean()
  isAvailable?: boolean;

  @IsString()
  description: string | null;

  shop: {
    name: string;
    id: number;
  };

  createdAt: Date;
  updatedAt: Date;
}
