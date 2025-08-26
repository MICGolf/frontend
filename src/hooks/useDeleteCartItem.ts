import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/api/client';

export const deleteCartItem = async (productId: number, optionId: number | undefined, accessToken: string) => {
  try {
    const response = await client.delete(`/cart?product_id=${productId}&option_id=${optionId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const useDeleteCartItem = (productId: number, optionId: number | undefined, accessToken: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteCartItem(productId, optionId, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
  });

  return mutation;
};

export default useDeleteCartItem;
