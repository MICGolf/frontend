import { client } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useLocalStorage from './useLocalStorage';
import { handleApiError } from '@/utils/handleApiError';
import { useAuthStore } from '@/config/store';

const useGuestToUserCartItem = () => {
  const { user } = useAuthStore();
  const [guestCartItems] = useLocalStorage('cartItems', []);
  const queryClient = useQueryClient();

  const syncGuestCartToUser = async () => {
    if (!user) return;

    if (guestCartItems.length > 0) {
      try {
        const response = await client.post(`/api/v1/cart/${user.id}`, { cartItems: guestCartItems });
        return response.data;
      } catch (err) {
        handleApiError(err);
      }
    }
  };

  const { isError, isPending, error } = useMutation({
    mutationKey: ['updateCartItem'],
    mutationFn: syncGuestCartToUser,
    onSuccess: () => {
      localStorage.removeItem('cartItems');
      if (user) {
        queryClient.invalidateQueries({ queryKey: ['cartItems', user.id] });
      }
    },
    onError: () => {
      throw new Error('비회원 장바구니 동기화에 실패했습니다.');
    },
  });

  return { isError, isPending, error };
};

export default useGuestToUserCartItem;
