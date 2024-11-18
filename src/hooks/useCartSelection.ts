import { CartItemData2 } from '@/assets/dummys/types';
import { useMemo, useState } from 'react';

export const useCartSelection = (cartItems: CartItemData2[]) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleToggle = (itemId: string) => {
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
