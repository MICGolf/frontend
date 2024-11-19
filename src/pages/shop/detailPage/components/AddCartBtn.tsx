import { CartItemData2, Color, ProductDetail, Size } from '@/assets/dummys/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { SignUpModalType } from '@/hooks/useModalState/useModalState';
import { nanoid } from 'nanoid';
import { useState } from 'react';

interface AddCartBtnProps {
  data: ProductDetail;
  count: number;
  maxCount: number;
  selectedColor: Color | null;
  selectedSize: Size | null;
  detailImage: string[];
  handleModalOpen: (type: SignUpModalType) => void;
}

const AddCartBtn = ({
  data,
  count,
  maxCount,
  selectedColor,
  selectedSize,
  detailImage,
  handleModalOpen,
}: AddCartBtnProps) => {
  const [storedValue, setValue] = useLocalStorage<CartItemData2[] | []>('cartItems', []);
  const [cartItems, setCartItems] = useState<CartItemData2[]>(storedValue);

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
        id: nanoid(), // FIX: 상품 아이디가 아니라 주문 아이디 생성
        productId: data.id,
        name: data.name,
        image: detailImage[0],
        stock: maxCount,
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
    setValue(updatedCartItems);
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
