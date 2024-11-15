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

const ProductDetailView = ({ data }: ProductDetailViewProps) => {
  const [detailImage, setDetailImage] = useState<string[]>(data.colors[0]?.images);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [count, setCount] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(1);
  const { isSoldOut } = useSoldOutState(data);
  const { isSale, saleLabelText, labelClassNames } = useSaleState(data);

  return (
    <section className='flex flex-col min-h-screen transition-all duration-300 ease-in-out xl:flex-row'>
      <div className='flex w-full flex-col gap-[2px] transition-all duration-300 ease-in-out xl:w-1/2'>
        {detailImage.map((img, idx) => (
          <div key={idx} className='w-full h-screen transition-transform duration-500 ease-in-out xl:h-full'>
            <img src={img} alt={`상품 이미지 ${idx + 1}`} className='object-cover w-full h-full' />
          </div>
        ))}
      </div>

      <div className='z-[1] flex w-full flex-col overflow-auto px-[50px] pb-[50px] pt-[150px] transition-all duration-300 ease-in-out xl:sticky xl:top-0 xl:h-[calc(100vh)] xl:w-1/2 xl:border-l xl:border-primary'>
        <div className='flex flex-col h-full gap-8'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <h2 className='text-4xl font-bold transition-transform duration-300 ease-in-out'>{data.name}</h2>
              <SaleLabel classString={labelClassNames} text={saleLabelText} />
            </div>
            {isSale ? (
              <div>
                <p className='text-xl font-light line-through text-gray700'>₩{data.price.toLocaleString()}</p>
                <p className='text-2xl font-light'>₩{data.sale.result.toLocaleString()}</p>
              </div>
            ) : (
              <div>
                <p className='text-2xl font-light'>₩{data.price.toLocaleString()}</p>
                <p className='text-2xl font-light'>₩{data.sale.result.toLocaleString()}</p>
              </div>
            )}
          </div>

          <div className='flex flex-col gap-6 mt-auto'>
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
            <div className='relative flex flex-col gap-4 transition-all duration-300 ease-in-out xl:flex'>
              {isSoldOut && (
                <div className='absolute z-50 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.45)] text-2xl text-white'>
                  <span className='absolute animate-pulse'>Sold Out</span>
                </div>
              )}
              <AddCartBtn />
              <NaverPayBtn />
            </div>
          </div>
        </div>
      </div>
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
