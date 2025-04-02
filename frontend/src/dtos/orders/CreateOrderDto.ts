
export type CreateOrderDto ={
  items: Item[];
}

export type Item ={
  quantity: number;

  price: number;

  productId: number;
}
