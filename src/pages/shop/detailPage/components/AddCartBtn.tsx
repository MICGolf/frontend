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

  const isValid = !!(selectedColor && selectedSize);

  const handleAddCart = () => {
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

    const updatedCartItems: CartItemData2[] = [...cartItems, newCartItem];
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
