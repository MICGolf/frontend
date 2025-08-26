import SaleLabel from '@/components/SaleLabel';
import SalePrice from '@/components/SalePrice';
import { SaleProvider } from '@/components/SaleProvider';
import ColorBtns from './ColorBtns';
import SizeBtns from './SizeBtns';
import CounterBtn from './CounterBtn';
import AddCartBtn from './AddCartBtn';
import { SignUpModalType } from '@/hooks/useModalState/useModalState';
import MobileModalToggler from './MobileModalToggler';
import { motion, AnimatePresence } from 'framer-motion';
import useSaleState from '@/hooks/useSaleState';
import useSoldOutState from '@/hooks/useSoldoutState';
import { ProductData, ProductImage } from '@/api/type';
import { OptionState } from '../types';
import { CartItemData } from '@/assets/dummys/types';
import BuyNowButton from './BuyNowButton';

interface MobileOptionSelectBoxProps {
  data: ProductData;
  selectedOption: OptionState;
  isOpen: boolean;
  detailImage: ProductImage[] | null;
  mutation: any;
  setInstanceCartData: React.Dispatch<React.SetStateAction<CartItemData[]>>;
  setSelectedOption: (prevOption: OptionState) => void;
  setIsOpen: (isOpen: boolean) => void;
  handleModalOpen: (type: SignUpModalType) => void;
}

const MobileOptionSelectBox = ({
  data,
  selectedOption,
  isOpen,
  detailImage,
  mutation,
  setInstanceCartData,
  setSelectedOption,
  setIsOpen,
  handleModalOpen,
}: MobileOptionSelectBoxProps) => {
  const { isSale } = useSaleState({
    discount: data.product.discount,
    discountOption: data.product.discount_option,
  });
  const { isSoldOut } = useSoldOutState(selectedOption?.optionData);
  const handleOnClose = () => {
    setIsOpen(false);
  };
  return (
    <AnimatePresence>
      <motion.div
        key='optionSelectBoxContainer'
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? 0 : '92%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className='fixed bottom-0 left-0 z-50 w-full bg-secondary'
      >
        {/* 토글 버튼 */}
        <MobileModalToggler isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* 메인 컨텐츠 시작 */}
        <div className='flex flex-col h-full gap-4 p-6'>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-2'>
              <div className='flex flex-col gap-3'>
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

          {/* 옵션 선택 영역 */}
          <div className='flex flex-col gap-4 mt-auto'>
            <div className='flex flex-col w-full gap-4 md:justify-start'>
              <ColorBtns data={data} selectedOption={selectedOption} onSelect={setSelectedOption} />
              <SizeBtns data={data} selectedOption={selectedOption} onSelect={setSelectedOption} />
              <CounterBtn selectedOption={selectedOption} onSelect={setSelectedOption} isSoldOut={isSoldOut} />
            </div>

            {/* 장바구니 & 네이버페이 버튼 영역 */}
            <div className='relative flex flex-col gap-2 transition-all duration-300 ease-in-out xl:flex-row'>
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
                mutation={mutation}
              />
              <BuyNowButton
                productData={data.product}
                selectedOption={selectedOption}
                detailImage={detailImage}
                handleModalOpen={handleModalOpen}
                setInstanceCartData={setInstanceCartData}
              />
            </div>
          </div>
        </div>
      </motion.div>
      {isOpen && (
        <motion.div
          key='backdrop'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-10 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'
          onClick={handleOnClose}
        />
      )}
    </AnimatePresence>
  );
};

export default MobileOptionSelectBox;
