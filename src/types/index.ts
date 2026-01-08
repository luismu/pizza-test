export interface Pizza {
  id: string;
  name: string;
  price: number;
  ingredients: string[];
  imageUrl?: string;
  description?: string;
  category?: string;
}

export interface OrderItem {
  pizzaId: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  totalDiscount: number;
  total: number;
  timestamp: string;
}
