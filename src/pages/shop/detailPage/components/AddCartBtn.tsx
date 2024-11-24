import { ProductDetail2, ProductImage } from '@/api/type';
import { CartItemData2 } from '@/assets/dummys/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { SignUpModalType } from '@/hooks/useModalState/useModalState';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { OptionState } from '../types';

interface AddCartBtnProps {
  productData: ProductDetail2;
  selectedOption: OptionState;
  detailImage: ProductImage[] | null;
  handleModalOpen: (type: SignUpModalType) => void;
}

const AddCartBtn = ({ productData, selectedOption, detailImage, handleModalOpen }: AddCartBtnProps) => {
  const [storedValue, setValue] = useLocalStorage<CartItemData2[] | []>('cartItems', []);
  const [cartItems, setCartItems] = useState<CartItemData2[]>(storedValue);
  const isCartButtonEnabled =
    !!selectedOption.selectedColor && !!selectedOption.selectedSize && selectedOption.amount > 0;

  const handleAddCart = () => {
    const existingCartItemIndex = cartItems.findIndex(
      (item: CartItemData2) =>
        item.color.name === selectedOption.selectedColor?.color && item.size === selectedOption.selectedSize?.size
    );

    let updatedCartItems;

    if (existingCartItemIndex > -1) {
      // 이미 같은 상품이 있을 경우 갯수만 업데이트
      updatedCartItems = cartItems.map((item: CartItemData2, index: number) =>
        index === existingCartItemIndex ? { ...item, amount: item.amount + selectedOption.amount } : item
      );
    } else {
      // 새로운 상품 추가
      const newCartItem: CartItemData2 = {
        id: nanoid(), // FIX: 상품 아이디가 아니라 주문 아이디 생성
        productId: productData.id,
        productCode: productData.product_code,
        name: productData.name,
        image: detailImage?.[0].image_url,
        stock: selectedOption.stock,
        color: {
          name: selectedOption.selectedColor?.color,
          code: selectedOption.selectedColor?.color_code,
        },
        size: selectedOption.selectedSize?.size,
        amount: selectedOption.amount,
        originPrice: productData.origin_price,
        price: productData.price,
        discount: productData.discount,
        discountOption: productData.discount_option,
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
        isCartButtonEnabled
          ? 'border-primary bg-primary text-secondary hover:bg-white hover:text-primary'
          : 'cursor-not-allowed border border-gray300 bg-gray100 text-gray300'
      } px-[10px] py-[4px] font-light transition-colors duration-700 md:px-[30px] md:py-[10px]`}
      aria-label='장바구니에 상품 추가'
      onClick={handleAddCart}
      disabled={!isCartButtonEnabled}
    >
      <span className='text-lg md:text-2xl'>장바구니 추가하기</span>
    </button>
  );
};

export default AddCartBtn;
