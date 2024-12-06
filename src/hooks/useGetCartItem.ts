import { client } from '@/api/client';
import { useAuthStore } from '@/config/store';
import { useQuery } from '@tanstack/react-query';
import useLocalStorage from './useLocalStorage';
import { handleApiError } from '@/utils/handleApiError';

export type ServerCartItem = {
  cart_id: number; // 장바구니 아이템 ID
  user_id: number; // 사용자 ID
  product_id: number; // 상품 ID
  option_id: number;
  product_code: string; // 상품 코드
  product_name: string; // 상품 이름
  product_image_url: string; // 상품 이미지 URL
  product_color: string; // 상품 색상
  product_size: string; // 상품 사이즈
  product_amount: number; // 상품 수량
  product_stock: number; // 상품 재고
  origin_price: number; // 원래 가격
  price: number; // 가격
  discount: number; // 할인율
  discount_option: 'percent' | 'amount'; // 할인 옵션 ('percent' 또는 'amount')
};

export type TransformedCartItems = {
  id: number; // 장바구니 아이템 ID
  userId: number; // 사용자 ID
  productId: number; // 상품 ID
  optionId: number;
  productCode: string; // 상품 코드
  name: string; // 상품 이름
  image: string; // 상품 이미지 URL
  color: string; // 상품 색상
  size: string; // 상품 사이즈
  amount: number; // 상품 수량
  stock: number; // 상품 재고
  originPrice: number; // 원래 가격
  price: number; // 가격
  discount: number; // 할인율
  discountOption: 'percent' | 'amount'; // 할인 옵션 ('percent' 또는 'amount')
};

const useGetCartItem = () => {
  const { user } = useAuthStore();
  const [guestCartItems] = useLocalStorage('cartItems', []);
  const accessToken = localStorage.getItem('accessToken') || '';

  const {
    data: cartItems = [],
    isPending,
    isError,
    error,
  } = useQuery<TransformedCartItems[], Error>({
    queryKey: ['cartItems'],
    queryFn: async (): Promise<TransformedCartItems[]> => {
      try {
        const response = await client.get('/cart', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        // 응답을 올바르게 매핑하여 반환
        const transformedCartItems = response.data.items.map((item: ServerCartItem) => {
          return {
            id: item.cart_id,
            userId: item.user_id,
            optionId: item.option_id,
            productId: item.product_id,
            productCode: item.product_code,
            name: item.product_name,
            image: item.product_image_url,
            color: item.product_color,
            size: item.product_size,
            amount: item.product_amount,
            stock: item.product_stock,
            originPrice: item.origin_price,
            price: item.price,
            discount: item.discount,
            discountOption: item.discount_option as 'percent' | 'amount',
          };
        });

        return transformedCartItems;
      } catch (err: unknown) {
        handleApiError(err);
        return []; // 실패 시 빈 배열을 반환하여 undefined를 방지
      }
    },
    enabled: !!user,
    initialData: guestCartItems, // 초기 데이터는 guestCartItems로 설정
    retry: 0,
  });

  return { cartItems, isPending, isError, error };
};

export default useGetCartItem;
