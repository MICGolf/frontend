import { CartItemData2 } from '@/assets/dummys/types';
import { useMemo } from 'react';

const useCartCalculations = (selectedProducts: CartItemData2[]) => {
  const totalPrice = useMemo(() => {
    return selectedProducts.reduce((sum, item) => {
      const finalPrice = item.sale.is_active ? item.sale.result : item.price;
      return sum + finalPrice * item.amount;
    }, 0);
  }, [selectedProducts]);

  const totalDeliveryFee = useMemo(() => {
    return selectedProducts.length === 0 ? 0 : totalPrice >= 50000 ? 0 : 2500;
  }, [selectedProducts, totalPrice]);

  return { totalPrice, totalDeliveryFee };
};
export default useCartCalculations;
