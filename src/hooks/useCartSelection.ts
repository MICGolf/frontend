import { CartItemData } from '@/assets/dummys/types';
import { useEffect, useMemo, useState } from 'react';
import useLocalStorage from './useLocalStorage';

export const useCartSelection = (cartItems: CartItemData[]) => {
  const [_, setValue] = useLocalStorage('cartItems', []);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [cartItemArr, setCartItemArr] = useState<CartItemData[]>(cartItems); // 상태로 cartItems 배열을 관리
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태 추적

  // 바로구매 기능
  const handleBuyNow = (itemId: string) => {
    setSelectedItems([itemId]);
  };

  // 장바구니 아이템 리스트 선택(체크박스) 토글
  const handleCartSelectToggle = (itemId: string) => {
    setSelectedItems(
      (prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId) // 이미 선택된 아이템이면 제거
          : [...prev, itemId] // 선택되지 않은 아이템이면 추가
    );
  };

  // 수량 변경 함수
  const handleUpdateCount = (itemId: string, newCount: number) => {
    setCartItemArr((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, amount: newCount } : item)));
  };

  // 선택된 제품 필터링
  const selectedProducts = useMemo(
    () => cartItemArr.filter((item) => selectedItems.includes(item.id)),
    [cartItemArr, selectedItems]
  );

  // 전체 선택/해제 처리
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]); // 선택된 아이템이 있으면 전체 해제
    } else {
      setSelectedItems(cartItemArr.map((item) => item.id)); // 모든 아이템을 선택
    }
    setSelectAll(!selectAll); // selectAll 상태 반전
  };

  // 선택된 아이템 삭제
  const handleRemoveSelectedItems = () => {
    // 로컬 스토리지에서 삭제된 아이템을 반영
    const updatedCart = cartItemArr.filter((item) => !selectedItems.includes(item.id)); // 선택된 아이템 삭제
    setCartItemArr(updatedCart); // 상태에서 장바구니 업데이트
    setSelectedItems([]); // 선택된 아이템 상태 초기화

    // 삭제된 아이템을 로컬 스토리지에도 반영
    setValue(updatedCart); // 로컬 스토리지에 새로운 장바구니 배열 저장
  };

  const handleRemoveSingleItem = (itemId: string) => {
    const updatedCart = cartItemArr.filter((item) => item.id !== itemId);
    setCartItemArr(updatedCart);
    setSelectedItems([]);
    setValue(updatedCart);
  };

  useEffect(() => {
    // 전체 선택 상태 업데이트 (장바구니의 아이템 모두가 선택되면 전체 선택 상태 true)
    setSelectAll(selectedItems.length === cartItemArr.length);
  }, [selectedItems, cartItemArr.length]);

  return {
    cartItemArr,
    selectedItems,
    selectedProducts,
    selectAll, // 전체 선택 상태
    handleBuyNow,
    handleCartSelectToggle,
    handleUpdateCount,
    handleSelectAll, // 전체 선택/해제 함수
    handleRemoveSelectedItems, // 선택된 아이템 삭제 함수
    handleRemoveSingleItem, // X버튼을 눌렀을때 아이템 하나만 삭제하는 함수
  };
};
