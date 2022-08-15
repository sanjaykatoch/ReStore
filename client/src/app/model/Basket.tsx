export interface BasketItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  type: string;
  quantity: number;
  brand: string;
}

export interface Basket {
  id: number;
  buyerId: number;
  items: BasketItem[];
}
