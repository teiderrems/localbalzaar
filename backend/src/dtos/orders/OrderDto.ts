import { OrderStatus } from '@prisma/client';

export class OrderDto {
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
