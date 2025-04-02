export enum OrderStatus {
  PENDING,
  PROCESSING,
  COMPLETED,
  CANCELLED
}

export enum PaymentStatus {
  PENDING,
  SUCCESS,
  FAILED
}

export enum PaymentMethod {
  CASH,
  CARD,
  MOBILE
}

export enum DeliveryStatus {
  PENDING,
  INTRANSIT,
  DELIVERED,
  CANCELLED
}
