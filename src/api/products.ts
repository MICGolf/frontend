import { client } from './client';

/**
 * 인자가 필요하다면 인자를 받고 api를 return 하세요
 * index.ts 에서 모든 API를 return 하고있으니
 * 여기서는 API 하나만 return 하면 됩니다.
 *
 * { productsApi, bannersApi, categoryApi, promotionApi, userApi, cartApi, orderApi }
 * 본인 API 위치에서 productsApi.예시(인자) 이런식으로 사용하세요
 * @param id
 * @returns
 */
export const 예시 = async (id: number) => {
  return client.get(`/API 주소 적으세요/${id}`);
};

type Product = {
  name: string; // 제품 이름
  price: number; // 할인된 가격
  discount: number; // 할인 값
  discount_option: 'percent' | 'amount'; // 할인 옵션 (퍼센트 또는 고정 금액)
  origin_price: number; // 원래 가격
  description: string; // 간단한 설명
  detail: string; // 상세 설명
  product_code: string; // 제품 코드
};

type ProductOptionSize = {
  size: string; // 예: 'M', 'L'
  stock: number; // 재고 수량
};

type ProductOption = {
  color: string; // 예: 'Black', 'White'
  color_code: string; // 예: '#000000', '#FFFFFF'
  sizes: ProductOptionSize[]; // 크기와 재고 리스트
};

type ImageMapping = {
  [colorCode: string]: string[]; // 색상 코드와 관련된 이미지 배열 매핑
};

type ProductData = {
  category_id: number; // 카테고리 ID
  product: Product; // 제품 정보
  options: ProductOption[]; // 제품 옵션 (색상, 크기, 재고 등)
  image_mapping: ImageMapping; // 색상 코드와 이미지 매핑
};

export const createProduct = (data: ProductData) => {
  return client.post('/products', { data });
};
