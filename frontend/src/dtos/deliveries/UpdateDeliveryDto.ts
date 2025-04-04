import {DeliveryStatus} from '../../enums';

export type UpdateDeliveryDto= {

  id: number;

  status: DeliveryStatus;
}
