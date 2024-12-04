import { ProductDetail2, ProductImage } from '@/api/type';
import useLocalStorage from '@/hooks/useLocalStorage';
import { SignUpModalType } from '@/hooks/useModalState/useModalState';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { OptionState } from '../types';
import { CartItemData } from '@/assets/dummys/types';
import { useAuthStore } from '@/config/store';

interface AddCartBtnProps {
  mutation: any;
  productData: ProductDetail2;
  selectedOption: OptionState;
  detailImage: ProductImage[] | null;
  handleModalOpen: (type: SignUpModalType) => void;
}

export interface UserCartItemParam {
  productId: number;
  optionId: number | undefined;
  amount: number;
}

const AddCartBtn = ({ productData, selectedOption, detailImage, mutation, handleModalOpen }: AddCartBtnProps) => {
  const { user } = useAuthStore();
  const [storedValue, setValue] = useLocalStorage<CartItemData[] | []>('cartItems', []);
  const [cartItems, setCartItems] = useState<CartItemData[]>(storedValue);

  const isCartButtonEnabled =
    !!selectedOption.selectedColor && !!selectedOption.selectedSize && selectedOption.amount > 0;

  const handleAddCart = () => {
    const existingCartItemIndex = cartItems.findIndex((item: CartItemData) => {
      const isProductIdMatch = item.productId === selectedOption.productData?.id;
      const isColorMatch =
        item.color.name?.trim().toLowerCase() === selectedOption.selectedColor?.color.trim().toLowerCase();
      const isProductCodeMatch =
        item.productCode.trim().toLowerCase() === selectedOption.productCode.trim().toLowerCase();
      const isSizeMatch = item.size?.trim().toLowerCase() === selectedOption.selectedSize?.size.trim().toLowerCase();

      return isProductIdMatch && isColorMatch && isProductCodeMatch && isSizeMatch;
    });

    let updatedCartItems;

    // 비회원 장바구니 항목
    const newCartItem: CartItemData = {
      id: nanoid(),
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

    // 회원 장바구니 항목
    const newUserCartItem: UserCartItemParam = {
      productId: productData.id,
      optionId: selectedOption.optionData?.id,
      amount: selectedOption.amount,
    };

    if (existingCartItemIndex > -1) {
      updatedCartItems = cartItems.map((item: CartItemData, index: number) =>
        index === existingCartItemIndex ? { ...item, amount: item.amount + selectedOption.amount } : item
      );
    } else {
      updatedCartItems = [...cartItems, newCartItem];
    }

    setCartItems(updatedCartItems);
    setValue(updatedCartItems);

    // 로그인 체크
    if (!user) {
      handleModalOpen('장바구니');
      return;
    }

    // 회원일 경우 회원 장바구니로 추가
    console.log('회원 장바구니 항목:', newUserCartItem);
    mutation.mutate(newUserCartItem, {
      onSuccess: () => {
        handleModalOpen('장바구니');
      },
      onError: () => {
        handleModalOpen('장바구니추가실패');
      },
    });
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
