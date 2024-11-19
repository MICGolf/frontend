import { CartItemData2 } from '@/assets/dummys/types';
import { useMemo, useState } from 'react';

export const useCartSelection = (cartItems: CartItemData2[]) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItemData2[]>(cartItems); // 상태로 cartItems 배열을 관리

  // 장바구니 아이템 리스트에 추가 및 삭제하는 함수
  const handleCartSelectToggle = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  // 수량 변경 함수
  const handleUpdateCount = (itemId: string, newCount: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, amount: newCount } : item)));
  };

  const selectedProducts = useMemo(() => cart.filter((item) => selectedItems.includes(item.id)), [cart, selectedItems]);

  return {
    selectedItems,
    handleCartSelectToggle,
    handleUpdateCount,
    selectedProducts,
  };
};
