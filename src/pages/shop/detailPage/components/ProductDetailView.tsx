import { useState } from 'react';
import { ProductDetailViewProps } from '../types';
import { Color, Size } from '@/assets/dummys/types';
import useSoldOutState from '@/hooks/useSoldoutState';
import useSaleState from '@/hooks/useSaleState';
import { useMediaQuery } from 'react-responsive';
import useModalState from '@/hooks/useModalState/useModalState';
import OptionSelectBox from './OptionSelectBox';
import MobileOptionSelectBox from './MobileOptionSelectBox';

const ProductDetailView = ({ data }: ProductDetailViewProps) => {
  const [detailImage, setDetailImage] = useState<string[]>(data.colors[0]?.images);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [count, setCount] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { isSoldOut } = useSoldOutState(data);
  const { isSale, saleLabelText, labelClassNames } = useSaleState(data);
  const { handleModalOpen, renderModalContent } = useModalState();
  const optionSelectBoxProps = {
    data,
    count,
    maxCount,
    isSale,
    isSoldOut,
    isOpen,
    labelClassNames,
    saleLabelText,
    selectedSize,
    selectedColor,
    detailImage,
    setMaxCount,
    setCount,
    setIsOpen,
    setSelectedColor,
    setDetailImage,
    setSelectedSize,
    handleModalOpen,
  };

  return (
    <section className='flex min-h-screen flex-col transition-all duration-300 ease-in-out md:flex-row'>
      <div className='flex w-full flex-col gap-[2px] transition-all duration-300 ease-in-out md:w-1/2'>
        {detailImage.map((img, idx) => (
          <div key={idx} className='h-screen w-full transition-transform duration-500 ease-in-out md:h-full'>
            <img src={img} alt={`상품 이미지 ${idx + 1}`} className='h-full w-full object-cover' />
          </div>
        ))}
      </div>
      {/* 옵션 선택 박스 영역 */}
      {isMobile ? <MobileOptionSelectBox {...optionSelectBoxProps} /> : <OptionSelectBox {...optionSelectBoxProps} />}
      {/* 모달 영역 */}
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
