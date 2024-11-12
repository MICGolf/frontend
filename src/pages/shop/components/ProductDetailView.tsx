import { ProductDetailViewProps } from '../detailPage/types';
import NaverPayBtn from './NaverPayBtn';
import AddCartBtn from './AddCartBtn';
import OptionListItem from './OptionListItem';
import ColorBtns from './ColorBtns';
import TotalPrice from './TotalPrice';
import { useEffect, useState } from 'react';
import { Color } from '@/assets/dummys/types';

const ProductDetailView = ({ data, onSubmit }: ProductDetailViewProps) => {
  const [optionList, setOptionList] = useState<Color[]>([]);
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(data.colors[0]);

  // 선택된 컬러의 이미지 배열 필터링
  const filteredThumbNailImgs = data.colors.find((color) => color.id === selectedColor.id)?.images;

  useEffect(() => {
    console.log(optionList);
  }, [optionList]);

  return (
    <section className='flex flex-col xl:flex-row' role='region' aria-labelledby='product-detail-header'>
      {/* 썸네일 영역 */}
      <figure className='scrollbar-hide xl: aspect-h-1 aspect-w-1 flex max-h-[900px] flex-col overflow-y-scroll border-r-primary xl:aspect-none xl:flex-1'>
        {filteredThumbNailImgs?.map((img, idx) => (
          <img key={idx} src={img} className='object-cover w-full h-full' role='img' />
        ))}
        <figcaption className='sr-only'>상품의 썸네일 이미지</figcaption>
      </figure>

      {/* 상품 정보 및 옵션 선택 영역 */}
      <form
        onSubmit={onSubmit}
        className='flex w-full flex-1 flex-col gap-20 px-[50px] pt-[50px]'
        aria-labelledby='product-form'
      >
        {/* 상품 타이틀 및 색상 선택 영역 */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-5xl font-bold'>{data.name}</h2>
          <p className='text-4xl font-light' aria-live='polite'>
            ₩{data.price.original.toLocaleString()}
          </p>
          <ColorBtns
            data={data.colors}
            onSelect={setSelectedColor}
            optionList={optionList}
            setOptionList={setOptionList}
          />
        </div>

        {/* 옵션 박스 및 총 금액 영역 */}
        <div className='flex flex-col gap-2'>
          {optionList.length > 0 ? (
            optionList.map((listItem, idx) => (
              <OptionListItem
                key={idx}
                stock={data.stock}
                colorName={listItem.name}
                colorId={listItem.id}
                price={data.price.original}
              />
            ))
          ) : (
            <p className='flex items-center justify-between px-2 py-4 bg-gray-100'>옵션을 선택해주세요!</p>
          )}
          <TotalPrice count={count} price={data.price.original} />
        </div>

        <div className='flex flex-col gap-2'>
          <AddCartBtn />
          <NaverPayBtn />
        </div>
      </form>
    </section>
  );
};

export default ProductDetailView;
