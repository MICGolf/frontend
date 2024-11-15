import { CartItemData } from '@/assets/dummys/types';
import { useMemo, useState } from 'react';

export const useCartSelection = (cartItems: CartItemData[]) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleToggle = (itemId: number) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  const selectedProducts = useMemo(
    () => cartItems.filter((item) => selectedItems.includes(item.id)),
    [cartItems, selectedItems]
  );

  return {
    selectedItems,
    handleToggle,
    selectedProducts,
  };
};
