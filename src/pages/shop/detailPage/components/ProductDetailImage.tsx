import useDefaultImage from '@/hooks/useDefaultImage';
import DefaultImage from './DefaultImage';
import { useEffect } from 'react';
import { ProductData, ProductImage } from '@/api/type';
import { OptionState } from '../types';
import ImageOnLoadSkeleton from './skeletons/ImageOnLoadSkeleton';

interface ProductDetailImageProps {
  data: ProductData;
  selectedOption: OptionState;
  detailImage: ProductImage[] | [];
  setDetailImage: (images: ProductImage[] | []) => void;
}

const ProductDetailImage = ({ data, selectedOption, detailImage, setDetailImage }: ProductDetailImageProps) => {
  const isDetailImagesExist = detailImage.length > 0 && detailImage[1] !== undefined;
  const { isImageError, handleOnError, isImageLoading, handleOnLoad } = useDefaultImage(isDetailImagesExist);

  // 컬러 옵션이 바뀔때마다 이미지 배열을 동적으로 안전하게 셋팅
  useEffect(() => {
    if (selectedOption.optionData) {
      setDetailImage(selectedOption.optionData.images);
    } else {
      setDetailImage([]);
    }
  }, [selectedOption.selectedColor]);

  return (
    <div className='flex w-full flex-col gap-[2px] transition-all duration-300 ease-in-out md:w-1/2'>
      {/* 이미지 로드 중 스켈레톤UI */}
      {isImageLoading && <ImageOnLoadSkeleton option='디테일' />}
      {/* 디테일 이미지 영역 (이미지 로드 중 에러 발생 시 디폴트 이미지 포함) */}
      {isDetailImagesExist ? (
        detailImage?.map(
          (img, idx) =>
            idx !== 0 /* 첫번째 사진은 썸네일용이므로 렌더링하지 않음 */ && (
              <div
                key={img.id}
                className={`${isImageError && 'flex flex-col items-center justify-center gap-2 bg-gray-200'} h-screen w-full transition-transform duration-500 ease-in-out`}
              >
                <img
                  src={img.image_url}
                  alt={isImageError ? '이미지 로드 실패시 디폴트 이미지' : `${data.product.name}이미지${img.id++}`}
                  className={isImageError ? 'object-contain' : 'h-full w-full object-cover'}
                  onError={handleOnError}
                  onLoad={handleOnLoad}
                />
                {isImageError && <p className='text-secondary'>이미지 로드 실패</p>}
              </div>
            )
        )
      ) : (
        <div className='h-screen w-full'>
          <DefaultImage option='디테일' />
        </div>
      )}
    </div>
  );
};

export default ProductDetailImage;
