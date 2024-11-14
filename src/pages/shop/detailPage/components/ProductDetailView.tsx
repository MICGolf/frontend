import NaverPayBtn from './NaverPayBtn';
import AddCartBtn from './AddCartBtn';
import ColorBtns from './ColorBtns';
import { useState } from 'react';
import SizeBtns from './SizeBtns';
import Counter from './CounterBtn';
import { ProductDetailViewProps } from '../types';
import { Color, Size } from '@/assets/dummys/types';

const ProductDetailView = ({ data }: ProductDetailViewProps) => {
  const [detailImage, setDetailImage] = useState(data.colors[0]?.images);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [count, setCount] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(1);
  // const [selectedOption, setSelectedOption] = useState(null);

  return (
    <section className='flex flex-col min-h-screen xl:flex-row'>
      <div className='flex w-full flex-col gap-[2px] xl:w-1/2'>
        {detailImage.map((img, idx) => (
          <div key={idx} className='w-full h-screen xl:h-full'>
            <img src={img} alt={`상품 이미지 ${idx + 1}`} className='object-cover w-full h-full' />
          </div>
        ))}
      </div>

      <div className='flex w-full flex-col overflow-auto px-[50px] pb-[50px] pt-[150px] xl:sticky xl:top-0 xl:h-[calc(100vh)] xl:w-1/2 xl:border-l xl:border-primary'>
        <div className='flex flex-col h-full gap-8'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-4xl font-bold'>{data.name}</h2>
            <p className='text-2xl font-light'>₩{data.price.toLocaleString()}</p>
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
            />
            <div className='flex flex-col gap-4 xl:flex'>
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
