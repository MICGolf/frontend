import { client } from '@/api/client';
import { CartItemData } from '@/assets/dummys/types';
import { useUserStore } from '@/config/store';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useCart = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const getGuestCartItems = () => {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  };

  const { data: cartItems = [] } = useQuery<CartItemData[]>({
    queryKey: ['cartItems', user?.id],
    queryFn: async () => {
      const response = await client.get(`/api/v1/cart/${user?.id}`);
      return response.data.cartItems || [];
    },
    enabled: Boolean(user),
    initialData: getGuestCartItems(),
  });

  const syncGuestCartToUser = async () => {
    if (!user) return;

    const guestItems = getGuestCartItems();
    if (guestItems.length > 0) {
      try {
        const response = await client.post(`/api/v1/cart/${user.id}`, { cartItems: guestItems });
        if (response.status === 200) {
          localStorage.removeItem('cartItems');
          queryClient.invalidateQueries({ queryKey: ['cartItems', user.id] });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return { cartItems, syncGuestCartToUser };
};
