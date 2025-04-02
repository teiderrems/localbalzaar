export type ProductDto= {
  id: number;

  name: string;

  quantity?: number;

  image: string | null;

  price?: number;

  isAvailable?: boolean;

  description: string | null;

  shop: {
    name: string;
    id: number;
  };

  createdAt: Date;
  updatedAt: Date;
}
