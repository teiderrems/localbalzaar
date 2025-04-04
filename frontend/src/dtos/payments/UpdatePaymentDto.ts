import {PaymentStatus} from '../../enums';

export type UpdatePaymentDto= {

  id: number;

  status: PaymentStatus;
}
