import { CartItemData2, Color, ProductDetail, Size } from '@/assets/dummys/types';
import { SignUpModalType } from '@/hooks/useModalState/useModalState';
import { useState } from 'react';

interface AddCartBtnProps {
  data: ProductDetail;
  count: number;
  selectedColor: Color | null;
  selectedSize: Size | null;
  detailImage: string[];
  handleModalOpen: (type: SignUpModalType) => void;
}

const AddCartBtn = ({ data, count, selectedColor, selectedSize, detailImage, handleModalOpen }: AddCartBtnProps) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  console.log(cartItems);

  const isValid = !!(selectedColor && selectedSize);

  const handleAddCart = () => {
    const existingCartItemIndex = cartItems.findIndex(
      (item: CartItemData2) => item.color?.id === selectedColor?.id && item.size === selectedSize?.name
    );

    let updatedCartItems;

    if (existingCartItemIndex > -1) {
      // 이미 같은 상품이 있을 경우 갯수만 업데이트
      updatedCartItems = cartItems.map((item: CartItemData2, index: number) =>
        index === existingCartItemIndex ? { ...item, amount: item.amount + count } : item
      );
    } else {
      // 새로운 상품 추가
      const newCartItem: CartItemData2 = {
        id: data.id,
        name: data.name,
        image: detailImage[0],
        color: {
          id: selectedColor?.id,
          name: selectedColor?.name,
          hex: selectedColor?.hex,
        },
        size: selectedSize?.name,
        amount: count,
        price: data.price,
        sale: data.sale,
      };

      updatedCartItems = [...cartItems, newCartItem];
    }

    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    handleModalOpen('장바구니');
  };

  return (
    <button
      type='button'
      className={`flex w-full flex-1 items-center justify-center border ${
        isValid
          ? 'border-primary bg-primary text-secondary hover:bg-white hover:text-primary'
          : 'cursor-not-allowed border border-gray300 bg-gray100 text-gray300'
      } px-[15px] py-[8px] font-light transition-colors duration-700 md:px-[30px] md:py-[10px]`}
      aria-label='장바구니에 상품 추가'
      onClick={handleAddCart}
      disabled={!isValid}
    >
      <span className='text-lg md:text-2xl'>장바구니 추가하기</span>
    </button>
  );
};

export default AddCartBtn;
