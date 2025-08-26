import { CartItemData } from '@/assets/dummys/types';
import { useMemo } from 'react';

const useCartCalculations = (selectedProducts: CartItemData[]) => {
  const totalPrice = useMemo(() => {
    return selectedProducts.reduce((sum, item) => {
      const finalPrice = item.discount > 0 ? item.price : item.originPrice;
      return sum + finalPrice * item.amount;
    }, 0);
  }, [selectedProducts]);

  const totalDeliveryFee = useMemo(() => {
    return selectedProducts.length === 0 ? 0 : totalPrice >= 50000 ? 0 : 2500;
  }, [selectedProducts, totalPrice]);

  return { totalPrice, totalDeliveryFee };
};
export default useCartCalculations;
