import {OrderStatus} from '../../enums';

export type OrderDto= {
  OrderItem: {
    quantity: number;
  }[];
  totalAmount: number;
  status: OrderStatus;
  user: {
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
