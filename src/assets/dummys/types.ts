// User 정보 타입 정의
type User = {
  id: string;
  name: string;
};

// Review 정보 타입 정의
type Review = {
  review_id: number;
  user: User;
  rating: number;
  title: string;
  body: string;
  date: string;
};

// 가격 정보 타입 정의
type Price = {
  currency: string;
  original: number;
  discounted: number;
};

// 할인 정보 타입 정의
type Discount = {
  percentage: number;
  amount: number;
};

// 색상 정보 타입 정의
export type Color = {
  id: string;
  name: string;
  hex: string;
  images: string[];
};

// 재고 정보 타입 정의
export type StockItem = {
  id: string;
  size: string;
  status: string;
  quantity: number;
};

// 평점 정보 타입 정의
type Rating = {
  average: number;
  reviews_count: number;
};

// 배송 정보 타입 정의
type Shipping = {
  method: string;
  cost: number;
  freeAbove: number;
};

// 제품 상세 정보 타입 정의
export interface ProductDetailInfo {
  id: string;
  name: string;
  description: string;
  brand: string;
  categories: string[];
  price: Price;
  discount: Discount;
  colors: Color[];
  sizes: string[];
  stock: StockItem[];
  rating: Rating;
  reviews: Review[];
  tags: string[];
  shipping: Shipping;
}

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
