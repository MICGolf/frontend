export interface UserData {
  name: string;
  email: string;
}

export interface CartItemData {
  id: number;
  image: string;
  name: string;
  color: string;
  size: string;
  amount: number;
  price: number;
}

export interface Size {
  name: string;
  stock: number;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  images: string[];
  sizes: Size[];
}

export interface ProductDetail {
  name: string;
  id: string;
  price: number;
  description: string;
  feature: string;
  colors: Color[];
}
