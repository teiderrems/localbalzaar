import {DeliveryStatus} from '../../enums';


export type DeliveryDto= {
  id: number;

  status: DeliveryStatus;

  deliveryAddress: string;

  deliveryDate: Date | null;
}
