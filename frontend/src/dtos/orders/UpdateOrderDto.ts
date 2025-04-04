import {OrderStatus} from '../../enums';

export type UpdateOrderDto= {

  id: number;

  status: OrderStatus;
}
