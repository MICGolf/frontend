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

interface OptionSelectBoxProps {
  data: ProductDetail;
  count: number;
  maxCount: number;
  isSale: boolean;
  isSoldOut: boolean;
  labelClassNames: string;
  saleLabelText: string;
  selectedColor: Color | null;
  selectedSize: Size | null;
  detailImage: string[];
  handleModalOpen: (type: SignUpModalType) => void;
  setCount: (count: number) => void;
  setMaxCount: (maxCount: number) => void;
  setSelectedColor: (color: Color | null) => void;
  setSelectedSize: (size: Size | null) => void;
  setDetailImage: (image: string[]) => void;
}

const OptionSelectBox = ({
  data,
  count,
  maxCount,
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
  setSelectedSize,
  handleModalOpen,
}: OptionSelectBoxProps) => {
  return (
    <div className='sticky top-0 flex h-[100vh] w-1/2 flex-col overflow-hidden border-l border-primary bg-white px-[50px] pb-[50px] pt-[150px] transition-all duration-300 ease-in-out md:border-l'>
      <div className='flex flex-col h-full gap-12'>
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

        <div className='flex flex-col gap-6 mt-auto'>
          {/* 옵션 선택 영역 */}
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
    </div>
  );
};

export default OptionSelectBox;
