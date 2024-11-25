import { CartItemData } from '@/assets/dummys/types';
import useDefaultImage from '@/hooks/useDefaultImage';
import DefaultImage from '@/pages/shop/detailPage/components/DefaultImage';
import ImageOnLoadSkeleton from '@/pages/shop/detailPage/components/skeletons/ImageOnLoadSkeleton';

const PaymentItemMobile = ({ data, isThumbnailExist }: { data: CartItemData; isThumbnailExist: boolean }) => {
  const { isImageError, setDefaultImage, isImageLoading, setIsImageLoading } = useDefaultImage();
  return (
    <div className='flex items-center border-b border-gray-100 py-5'>
      <div className='relative h-[100px] w-[100px] overflow-hidden bg-gray-200'>
        {isImageLoading && <ImageOnLoadSkeleton option='썸네일' />}
        {!isImageLoading && !isThumbnailExist && (
          <div className='absolute h-full w-full'>
            <DefaultImage option='썸네일' />
          </div>
        )}
        {isThumbnailExist && (
          <div
            className={
              isImageError
                ? 'relative flex h-full w-full flex-col items-center justify-center gap-2'
                : 'absolute h-full w-full'
            }
          >
            <img
              src={data.image}
              className={`${isImageError ? 'w-12 object-contain' : 'h-full w-full object-cover'} border border-gray-200`}
              alt={data.name}
              onError={setDefaultImage}
              onLoad={() => setIsImageLoading(false)}
            />
            {isImageError && <p className='text-xs text-secondary'>이미지 로드 실패</p>}
          </div>
        )}
      </div>

      <div className='flex-grow px-5 text-base lg:text-lg xl:text-xl'>
        <h3 className='mb-1 text-sm font-semibold md:text-lg'>{data.name}</h3>
        <p className='text-xs text-gray700'>
          [옵션: {data.color.name} / {data.size} / {data.amount}개]
        </p>
      </div>

      <div className='whitespace-nowrap text-center text-base font-bold lg:text-lg xl:text-xl'>
        ₩{data.price.toLocaleString()}
      </div>
    </div>
  );
};

export default PaymentItemMobile;
