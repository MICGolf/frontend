import SaleLabel from '@/components/SaleLabel';
import SalePrice from '@/components/SalePrice';
import { SaleProvider } from '@/components/SaleProvider';
import ColorBtns from './ColorBtns';
import SizeBtns from './SizeBtns';
import CounterBtn from './CounterBtn';
import AddCartBtn from './AddCartBtn';
import { SignUpModalType } from '@/hooks/useModalState/useModalState';
import { ProductData, ProductImage } from '@/api/type';
import { OptionState } from '../types';
import useSaleState from '@/hooks/useSaleState';
import useSoldOutState from '@/hooks/useSoldoutState';
import BuyNowButton from './BuyNowButton';
import { CartItemData } from '@/assets/dummys/types';

interface OptionSelectBoxProps {
  data: ProductData;
  selectedOption: OptionState;
  isOpen: boolean;
  detailImage: ProductImage[] | null;
  instanceCartData: CartItemData[];
  handleBuyNow: (itemId: string) => void;
  setInstanceCartData: React.Dispatch<React.SetStateAction<CartItemData[]>>;
  setSelectedOption: (prevOption: OptionState) => void;
  setIsOpen: (isOpen: boolean) => void;
  handleModalOpen: (type: SignUpModalType) => void;
}

const OptionSelectBox = ({
  data,
  selectedOption,
  detailImage,
  instanceCartData,
  handleBuyNow,
  setInstanceCartData,
  setSelectedOption,
  handleModalOpen,
}: OptionSelectBoxProps) => {
  const { isSale } = useSaleState({
    discount: data.product.discount,
    discountOption: data.product.discount_option,
  });
  const { isSoldOut } = useSoldOutState(selectedOption?.optionData);

  return (
    <div className='sticky top-0 flex h-[100vh] w-1/2 flex-col overflow-auto border-l border-primary bg-white px-[50px] pb-[50px] pt-[150px] transition-all duration-300 ease-in-out md:border-l'>
      <div className='flex h-full flex-col gap-12'>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-2'>
            <div className='flex w-full flex-col gap-3'>
              <h2 className='text-2xl font-bold transition-transform duration-300 ease-in-out md:text-4xl'>
                {data.product.name}
              </h2>
              <SaleProvider discount={data.product.discount} discountOption={data.product.discount_option}>
                <SaleLabel />
              </SaleProvider>
            </div>
          </div>
          {isSale ? (
            <SalePrice price={data.product.price} originPrice={data.product.origin_price} />
          ) : (
            <div>
              <p className='text-2xl font-bold text-primary'>₩{data.product.origin_price.toLocaleString()}</p>
            </div>
          )}
        </div>

        <div className='mt-auto flex flex-col gap-6'>
          {/* 옵션 선택 영역 */}
          <div className='flex w-full flex-col gap-6 md:justify-start'>
            <ColorBtns data={data} selectedOption={selectedOption} onSelect={setSelectedOption} />
            <SizeBtns data={data} selectedOption={selectedOption} onSelect={setSelectedOption} />
            <CounterBtn selectedOption={selectedOption} onSelect={setSelectedOption} isSoldOut={isSoldOut} />
          </div>

          {/* 장바구니 & 네이버페이 버튼 영역 */}
          <div className='relative flex flex-col gap-4 transition-all duration-300 ease-in-out xl:flex-row'>
            {isSoldOut && (
              <div className='absolute z-50 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.45)] text-2xl text-white'>
                <span className='absolute animate-pulse'>Sold Out</span>
              </div>
            )}
            <AddCartBtn
              productData={data.product}
              selectedOption={selectedOption}
              detailImage={detailImage}
              handleModalOpen={handleModalOpen}
            />
            <BuyNowButton
              productData={data.product}
              selectedOption={selectedOption}
              detailImage={detailImage}
              handleModalOpen={handleModalOpen}
              instanceCartData={instanceCartData}
              setInstanceCartData={setInstanceCartData}
              handleBuyNow={handleBuyNow}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionSelectBox;
