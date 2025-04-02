import {PaymentMethod, PaymentStatus} from '../../enums';

export type PaymentDto= {

  status: PaymentStatus;

  method: PaymentMethod;

  amount: number;

  order: {
    id: number;
    user: {
      email: string;
    };
  };

  createdAt: Date;
}
