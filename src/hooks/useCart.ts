import { client } from '@/api/client';
import { CartItemData } from '@/assets/dummys/types';
import { useAuthStore } from '@/config/store';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useCart = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const getGuestCartItems = () => {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  };

  const { data: cartItems = [] } = useQuery<CartItemData[]>({
    queryKey: ['cartItems'],
    queryFn: async () => {
      const response = await client.get(`cart`);
      return response.data.cartItems || getGuestCartItems();
    },
    enabled: Boolean(user),
    initialData: getGuestCartItems(),
  });

  const syncGuestCartToUser = async () => {
    if (!user) return;

    const guestItems = getGuestCartItems();
    if (guestItems.length > 0) {
      try {
        const response = await client.post(`cart/${user.user_id}`, { cartItems: guestItems });
        if (response.status === 200) {
          localStorage.removeItem('cartItems');
          queryClient.invalidateQueries({ queryKey: ['cartItems', user.user_id] });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return { cartItems, syncGuestCartToUser };
};
