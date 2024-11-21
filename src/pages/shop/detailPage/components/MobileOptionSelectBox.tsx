import SaleLabel from '@/components/SaleLabel';
import SalePrice from '@/components/SalePrice';
import { SaleProvider } from '@/components/SaleProvider';
import ColorBtns from './ColorBtns';
import SizeBtns from './SizeBtns';
import CounterBtn from './CounterBtn';
import AddCartBtn from './AddCartBtn';
import NaverPayBtn from './NaverPayBtn';
import { Color, ProductDetail, Size } from '@/assets/dummys/types';
import { SignUpModalType } from '@/hooks/useModalState/useModalState';
import MobileModalToggler from './MobileModalToggler';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileOptionSelectBoxProps {
  data: ProductDetail;
  count: number;
  maxCount: number;
  isOpen: boolean;
  isSale: boolean;
  isSoldOut: boolean;
  labelClassNames: string;
  saleLabelText: string;
  selectedColor: Color | null;
  selectedSize: Size | null;
  detailImage: string[];
  setIsOpen: (isOpen: boolean) => void;
  handleModalOpen: (type: SignUpModalType) => void;
  setCount: (count: number) => void;
  setMaxCount: (maxCount: number) => void;
  setSelectedColor: (color: Color | null) => void;
  setSelectedSize: (size: Size | null) => void;
  setDetailImage: (image: string[]) => void;
}

const MobileOptionSelectBox = ({
  data,
  count,
  maxCount,
  isOpen,
  isSale,
  isSoldOut,
  labelClassNames,
  saleLabelText,
  selectedColor,
  selectedSize,
  detailImage,
  setCount,
  setSelectedColor,
  setDetailImage,
  setMaxCount,
  setIsOpen,
  setSelectedSize,
  handleModalOpen,
}: MobileOptionSelectBoxProps) => {
  const handleOnClose = () => {
    setIsOpen(false);
  };
  return (
    <AnimatePresence>
      <motion.div
        key='optionSelectBoxContainer'
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? 0 : '94%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className='fixed bottom-0 left-0 z-50 w-full bg-secondary'
      >
        {/* 토글 버튼 */}
        <MobileModalToggler isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* 메인 컨텐츠 시작 */}
        <div className='flex flex-col h-full gap-12 p-6'>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-2'>
              <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold transition-transform duration-300 ease-in-out md:text-4xl'>
                  {data.name}
                </h2>
                <SaleProvider data={data}>
                  <SaleLabel classString={labelClassNames} text={saleLabelText} />
                </SaleProvider>
              </div>
            </div>
            {isSale ? (
              <SalePrice data={data} />
            ) : (
              <div>
                <p className='text-2xl font-light'>₩{data.price.toLocaleString()}</p>
                <p className='text-2xl font-bold'>₩{data.sale.result.toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* 옵션 선택 영역 */}
          <div className='flex flex-col gap-6 mt-auto'>
            <div className='flex flex-col w-full gap-6 md:justify-start'>
              <ColorBtns data={data.colors} onSelect={setSelectedColor} onChange={setDetailImage} />
              <SizeBtns data={selectedColor} onSelect={setSelectedSize} />
              <CounterBtn
                count={count}
                setCount={setCount}
                maxCount={maxCount}
                setMaxCount={setMaxCount}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                isSoldOut={isSoldOut}
              />
            </div>

            {/* 장바구니 & 네이버페이 버튼 영역 */}
            <div className='relative flex flex-col gap-4 transition-all duration-300 ease-in-out xl:flex-row'>
              {isSoldOut && (
                <div className='absolute z-50 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.45)] text-2xl text-white'>
                  <span className='absolute animate-pulse'>Sold Out</span>
                </div>
              )}
              <AddCartBtn
                data={data}
                count={count}
                maxCount={maxCount}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                detailImage={detailImage}
                handleModalOpen={handleModalOpen}
              />
              <NaverPayBtn />
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
          className='fixed inset-0 z-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'
          onClick={handleOnClose}
        />
      )}
    </AnimatePresence>
  );
};

export default MobileOptionSelectBox;
