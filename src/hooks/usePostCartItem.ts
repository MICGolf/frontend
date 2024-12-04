import { client } from '@/api/client';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/config/store';

export interface UserCartItemParam {
  productId: number;
  optionId: number | undefined;
  amount: number;
}

const usePostCartItem = () => {
  const { user } = useAuthStore();

  const postCartItem = async (userCartItem: UserCartItemParam) => {
    if (!user) throw new Error('사용자가 인증되지 않았습니다.');

    try {
      const response = await client.post(`/cart`, {
        product_id: userCartItem.productId,
        option_id: userCartItem.optionId,
        product_count: userCartItem.amount,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const mutation = useMutation({
    mutationFn: postCartItem,
  });

  return mutation;
};

export default usePostCartItem;
