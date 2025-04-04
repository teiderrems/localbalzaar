import {PaymentMethod} from '../../enums';

export type CreatePaymentDto= {

  method: PaymentMethod;

  amount: number;

  orderId: number;
}
