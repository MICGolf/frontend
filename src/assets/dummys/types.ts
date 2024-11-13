// 이미지 타입을 지정합니다.
type Image = string;

// 가격 정보를 포함한 타입입니다.
export type Price = {
  currency: string;
  original: number;
  discounted: number;
};

// 할인 정보를 포함한 타입입니다.
type Discount = {
  percentage: number;
  amount: number;
};

// 색상 옵션을 위한 타입입니다.
export type ColorOption = {
  id: string;
  name: string;
  hex: string;
  images: Image[];
};

// 사이즈 옵션을 위한 타입입니다.
export type SizeOption = {
  id: string;
  name: string;
};

// 추가 옵션을 위한 타입입니다.
export type AdditionalOption = {
  id: string;
  name: string;
  extra_cost: number;
};

// 재고 상태를 위한 타입입니다.
export type StockItem = {
  color_id: string;
  size_id: string;
  status: string;
  quantity: number;
};

// 사용자 리뷰 타입입니다.
type User = {
  id: string;
  name: string;
};

type Review = {
  review_id: number;
  user: User;
  rating: number;
  title: string;
  body: string;
  date: string;
};

// 평가 정보를 위한 타입입니다.
type Rating = {
  average: number;
  reviews_count: number;
};

// 배송 정보를 위한 타입입니다.
type Shipping = {
  method: string;
  cost: number;
  freeAbove: number;
};

// 제품 상세 정보를 위한 타입 정의입니다.
export type ProductDetailInfo = {
  id: string;
  name: string;
  description: string;
  brand: string;
  categories: string[];
  price: Price;
  discount: Discount;
  colors: ColorOption[];
  sizes: SizeOption[];
  options: AdditionalOption[];
  stock: StockItem[];
  rating: Rating;
  reviews: Review[];
  tags: string[];
  shipping: Shipping;
};

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
