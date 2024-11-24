// 상품의 기본 정보 타입
export interface ProductDetail2 {
  id: number;
  product_code: string;
  name: string;
  price: number;
  discount: number;
  discount_option: 'percent' | 'amount';
  origin_price: number;
  description: string;
  detail: string;
  brand: string;
  status: 'Y' | 'N'; // 상품 활성화 여부
}

// 상품 이미지 타입
export interface ProductImage {
  id: number;
  image_url: string;
}

// 상품 옵션 사이즈 타입
export interface ProductSize {
  size: string;
  stock: number;
}

export interface ProductColor {
  color: string;
  color_code: string;
}

// 상품 옵션 타입
export interface ProductOption {
  id: number;
  color: string;
  color_code: string; // 색상 코드 (e.g., #FF0000)
  images: ProductImage[];
  sizes: ProductSize[];
}

// 전체 상품 데이터 타입
export interface ProductData {
  product: ProductDetail2;
  options: ProductOption[];
}

export interface getAllProductsParams {
  page?: number;
  pageSize?: number;
  sort?: 'created_at' | 'price';
  order?: 'desc' | 'asc';
  categoryId?: number;
}
