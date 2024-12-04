import { client } from '@/api/client';
import { CartItemData } from '@/assets/dummys/types';
import { useAuthStore } from '@/config/store';
import { useQuery } from '@tanstack/react-query';
import useLocalStorage from './useLocalStorage';
import { handleApiError } from '@/utils/handleApiError';

const useGetCartItem = () => {
  const { user } = useAuthStore();
  const [guestCartItems] = useLocalStorage('cartItems', []);

  const {
    data: cartItems = [],
    isPending,
    isError,
    error,
  } = useQuery<CartItemData[]>({
    queryKey: ['cartItems'],
    queryFn: async () => {
      try {
        const response = await client.get(`/api/v1/cart/${user?.user_id}`);
        return response.data.cartItems || guestCartItems;
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    enabled: Boolean(user),
    initialData: guestCartItems,
  });

  return { cartItems, isPending, isError, error };
};

export default useGetCartItem;
