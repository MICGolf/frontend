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

export interface Sale {
  is_active: boolean;
  unit: string;
  value: number;
  result: number;
}

export interface ProductDetail {
  name: string;
  id: string;
  timestamp: number;
  price: number;
  sale: Sale;
  description: string;
  feature: string;
  colors: Color[];
}

// 중분류 타입 정의
export interface MiddleCategory {
  id: number;
  category: string;
}

// 대분류 타입 정의
export interface MajorCategory {
  id: number;
  majorCategory: string;
  middleCategories: MiddleCategory[];
}
