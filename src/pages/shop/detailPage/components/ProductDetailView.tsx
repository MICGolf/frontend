import NaverPayBtn from './NaverPayBtn';
import AddCartBtn from './AddCartBtn';
import ColorBtns from './ColorBtns';
import { useState } from 'react';
import SizeBtns from './SizeBtns';
import Counter from './CounterBtn';
import { ProductDetailViewProps } from '../types';
import { Color, Size } from '@/assets/dummys/types';
import useSoldOutState from '@/hooks/useSoldoutState';
import useSaleState from '@/hooks/useSaleState';
import SaleLabel from '../../components/SaleLabel';
import { useMediaQuery } from 'react-responsive';
import MobileDropdownBtn from './MobileDropdownBtn';
import useModalState from '@/hooks/useModalState/useModalState';

const ProductDetailView = ({ data }: ProductDetailViewProps) => {
  const [detailImage, setDetailImage] = useState<string[]>(data.colors[0]?.images);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [count, setCount] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<string>();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { isSoldOut } = useSoldOutState(data);
  const { isSale, saleLabelText, labelClassNames } = useSaleState(data);
  const { handleModalOpen, renderModalContent } = useModalState();

  const pcStyle =
    'shadow-top fixed bottom-0 z-[1] flex w-full flex-col overflow-hidden border-l-0 bg-white p-[40px] transition-all duration-300 ease-in-out md:sticky md:top-0 md:h-[100vh] md:w-1/2 md:border-l md:border-primary md:px-[50px] md:pb-[50px] md:pt-[150px] md:shadow-none';

  const mobileStyle =
    'shadow-top overflow-hidden fixed bottom-[-630px] z-[1] flex w-full flex-col border-l-0 bg-white p-[40px] transition-all duration-300 ease-in-out md:sticky md:top-0 md:h-[100vh] md:w-1/2 md:border-l md:border-primary md:px-[50px] md:pb-[50px] md:pt-[150px] md:shadow-none';

  return (
    <section className='flex min-h-screen flex-col transition-all duration-300 ease-in-out md:flex-row'>
      <div className='flex w-full flex-col gap-[2px] transition-all duration-300 ease-in-out md:w-1/2'>
        {detailImage.map((img, idx) => (
          <div key={idx} className='h-screen w-full transition-transform duration-500 ease-in-out md:h-full'>
            <img src={img} alt={`상품 이미지 ${idx + 1}`} className='h-full w-full object-cover' />
          </div>
        ))}
      </div>

      <div className={isOpen ? mobileStyle : pcStyle}>
        {isMobile && <MobileDropdownBtn setIsOpen={setIsOpen} />}
        <div className='flex h-full flex-col gap-12'>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-2'>
              <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold transition-transform duration-300 ease-in-out md:text-4xl'>
                  {data.name}
                </h2>
                <SaleLabel classString={labelClassNames} text={saleLabelText} />
              </div>
            </div>
            {isSale ? (
              <div className='flex flex-col'>
                <p className='text-lg font-light text-gray700 line-through md:text-xl'>
                  ₩{data.price.toLocaleString()}
                </p>
                <p className='text-xl font-bold md:text-2xl'>₩{data.sale.result.toLocaleString()}</p>
              </div>
            ) : (
              <div>
                <p className='text-2xl font-light'>₩{data.price.toLocaleString()}</p>
                <p className='text-2xl font-bold'>₩{data.sale.result.toLocaleString()}</p>
              </div>
            )}
          </div>

          <div className='mt-auto flex flex-col gap-6'>
            <div className='flex w-full flex-col gap-6 md:justify-start'>
              <ColorBtns data={data.colors} onSelect={setSelectedColor} onChange={setDetailImage} />
              <SizeBtns data={selectedColor} onSelect={setSelectedSize} />
              <Counter
                count={count}
                setCount={setCount}
                maxCount={maxCount}
                setMaxCount={setMaxCount}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                isSoldOut={isSoldOut}
              />
            </div>

            <div className='relative flex flex-col gap-4 transition-all duration-300 ease-in-out xl:flex-row'>
              {isSoldOut && (
                <div className='absolute z-50 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.45)] text-2xl text-white'>
                  <span className='absolute animate-pulse'>Sold Out</span>
                </div>
              )}
              <AddCartBtn
                data={data}
                count={count}
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
      {renderModalContent()}
    </section>
  );
};

export default ProductDetailView;

{
  /* <OptionDropdown options={data.options} placeholder='옵션 선택' onSelect={setSelectedOption} /> */
}

{
  /* <div className='flex flex-col gap-2'>
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <OptionListItem
                key={idx}
                stock={item.stock}
                colorName={listItem.color.name}
                colorId={listItem.color.id}
                price={data.price.original}
              />
            ))
          ) : (
            <p className='flex items-center justify-between px-2 py-4 bg-gray-100'>옵션을 선택해주세요!</p>
          )}
          <TotalPrice count={count} price={data.price} />
        </div> */
}
