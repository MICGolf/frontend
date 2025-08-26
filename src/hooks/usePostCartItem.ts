import { client } from '@/api/client';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/config/store';
import axios from 'axios';

export interface UserCartItemParam {
  productId: number;
  color: string | undefined;
  size: string | undefined;
  amount: number;
}

const usePostCartItem = () => {
  const { user } = useAuthStore();
  const accessToken = localStorage.getItem('accessToken');

  const postCartItem = async (userCartItem: UserCartItemParam) => {
    if (!user) throw new Error('사용자가 인증되지 않았습니다.');

    try {
      const response = await client.post(
        `/cart`,
        {
          product_id: userCartItem.productId,
          color: userCartItem.color,
          size: userCartItem.size,
          product_count: userCartItem.amount,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const { response, request } = err;
        if (response) {
          const { status } = response;
          switch (status) {
            case 400:
              throw new Error('재고 부족으로 더이상 담을 수 없어요.');
            case 401:
              throw new Error('계정 권한에 오류가 있어요.');
            case 500:
              throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도하세요.');
            default:
              throw new Error(response.data?.error || '알 수 없는 오류가 발생했습니다.');
          }
        }
        if (request) {
          throw new Error('서버와 연결할 수 없습니다. 인터넷 연결을 확인하세요.');
        }
        if (typeof err === 'object' && err !== null && 'message' in err) {
          throw new Error((err as any).message);
        }
        throw new Error('요청 중 오류가 발생했습니다.');
      }
    }
  };

  const mutation = useMutation({
    mutationFn: postCartItem,
  });

  return mutation;
};

export default usePostCartItem;
