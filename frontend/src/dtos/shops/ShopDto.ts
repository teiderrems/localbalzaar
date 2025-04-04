export type ShopDto= {

  id: number;

  name: string;

  address: string;

  phone: string;

  user: {
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
