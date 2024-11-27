export interface UserData {
  name: string;
  email: string;
}

export type CartItemData = {
  id: string; // 장바구니 id
  productId: number; // 상품 id
  productCode: string; // 상품 코드
  name: string; // 상품 이름
  image: string | undefined; // 썸네일 이미지 url
  color: {
    name: string | undefined; // 컬러 이름
    code: string | undefined; // 컬러 hex code
  };
  size: string | undefined;
  amount: number; // 선택 갯수
  stock: number | undefined; // 상품 재고량
  originPrice: number; // 상품 원가
  price: number; // 최종가
  discount: number; // 할인률 또는 할인금액
  discountOption: 'percent' | 'amount';
};

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
