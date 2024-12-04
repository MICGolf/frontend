import { useEffect, useState } from 'react';
import { OptionState, ProductDetailViewProps } from '../types';
import { useMediaQuery } from 'react-responsive';
import useModalState from '@/hooks/useModalState/useModalState';
import OptionSelectBox from './OptionSelectBox';
import MobileOptionSelectBox from './MobileOptionSelectBox';
import { ProductImage } from '@/api/type';
import ProductDetailImage from './ProductDetailImage';
import { CartItemData } from '@/assets/dummys/types';
import useCartCalculations from '@/hooks/useCartCalculations';
import LoadingSpinner from '@/components/LoadingSpinner';
import usePostCartItem from '@/hooks/usePostCartItem';

const ProductDetailView = ({ data }: ProductDetailViewProps) => {
  const mutation = usePostCartItem();
  const shouldResponsive = useMediaQuery({ maxWidth: 767 });
  const [userCart, setUserCart] = useState({});
  const [detailImage, setDetailImage] = useState<ProductImage[] | []>([]);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [instanceCartData, setInstanceCartData] = useState<CartItemData[]>([]);
  const { totalPrice, totalDeliveryFee } = useCartCalculations(instanceCartData);
  const paymentData = {
    items: instanceCartData,
    totalPrice,
    totalDeliveryFee,
  };
  console.log(mutation);
  const { handleModalOpen, renderModalContent } = useModalState({ paymentData, mutation });
  const [selectedOption, setSelectedOption] = useState<OptionState>({
    productCode: data.product.product_code,
    productData: data.product,
    optionData: data.options[0],
    selectedColor: null,
    selectedSize: null,
    amount: 1,
    stock: 0,
  });

  const optionSelectBoxProps = {
    data,
    selectedOption,
    isOpen,
    detailImage,
    mutation,
    userCart,
    setInstanceCartData,
    setSelectedOption,
    setIsOpen,
    handleModalOpen,
    setUserCart,
  };

  // 첫 렌더링시 스크롤 최상단으로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section className='flex flex-col min-h-screen transition-all duration-300 ease-in-out md:flex-row'>
      {mutation.isPending && (
        <div className='absolute left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-transparentBlack backdrop-blur-lg'>
          <LoadingSpinner />
        </div>
      )}
      {/* 디테일 이미지 영역 */}
      <ProductDetailImage
        data={data}
        selectedOption={selectedOption}
        detailImage={detailImage}
        setDetailImage={setDetailImage}
      />
      {/* 옵션 선택 박스 영역 */}
      {shouldResponsive ? (
        <MobileOptionSelectBox {...optionSelectBoxProps} />
      ) : (
        <OptionSelectBox {...optionSelectBoxProps} />
      )}
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
