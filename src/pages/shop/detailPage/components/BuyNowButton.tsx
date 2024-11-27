import { ProductDetail2, ProductImage } from '@/api/type';
import { OptionState } from '../types';
import { SignUpModalType } from '@/hooks/useModalState/useModalState';
import { CartItemData } from '@/assets/dummys/types';
import { nanoid } from 'nanoid';

interface BuyNowButtonProps {
  productData: ProductDetail2;
  selectedOption: OptionState;
  detailImage: ProductImage[] | null;
  instanceCartData: CartItemData[];
  handleModalOpen: (type: SignUpModalType) => void;
  handleBuyNow: (itemId: string) => void;
  setInstanceCartData: React.Dispatch<React.SetStateAction<CartItemData[]>>;
}

const BuyNowButton = ({
  productData,
  selectedOption,
  detailImage,
  instanceCartData,
  handleModalOpen,
  handleBuyNow,
  setInstanceCartData,
}: BuyNowButtonProps) => {
  console.log(instanceCartData);

  const handleOnClick = () => {
    const instanceCart: CartItemData = {
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
    setInstanceCartData([instanceCart]);
    handleBuyNow(instanceCartData[0].id);
    handleModalOpen('결제모달');
  };

  const isBuyNowButtonEnabled =
    !!selectedOption.selectedColor && !!selectedOption.selectedSize && selectedOption.amount > 0;

  return (
    <button
      type='button'
      className={`flex w-full flex-1 items-center justify-center gap-10 border ${isBuyNowButtonEnabled ? 'border-primary bg-secondary hover:border-secondary hover:bg-[#F77830] hover:text-secondary' : 'cursor-not-allowed border border-gray300 bg-gray100 text-gray300'} px-[10px] py-[4px] transition-all duration-700 ease-in-out md:gap-2 md:px-[30px] md:py-[10px]`}
      aria-label='바로구매'
      onClick={handleOnClick}
      disabled={!isBuyNowButtonEnabled}
    >
      <span className='flex items-center justify-center text-lg font-light md:text-2xl'>바로구매</span>
    </button>
  );
};

export default BuyNowButton;
