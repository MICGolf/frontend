import { CartItemData } from '@/assets/dummys/types';
import useDefaultImage from '@/hooks/useDefaultImage';
import DefaultImage from '@/pages/shop/detailPage/components/DefaultImage';
import ImageOnLoadSkeleton from '@/pages/shop/detailPage/components/skeletons/ImageOnLoadSkeleton';

const PaymentItem = ({ data, isThumbnailExist }: { data: CartItemData; isThumbnailExist: boolean }) => {
  const { isImageError, handleOnError, isImageLoading, handleOnLoad } = useDefaultImage(isThumbnailExist);
  return (
    <div key={data.id} className='flex items-center py-5 border-b border-gray-100'>
      <div className='relative h-[100px] w-[100px] overflow-hidden bg-gray-200'>
        {isImageLoading && <ImageOnLoadSkeleton option='썸네일' />}
        {isThumbnailExist ? (
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
              onError={handleOnError}
              onLoad={handleOnLoad}
            />
            {isImageError && <p className='text-xs text-secondary'>이미지 로드 실패</p>}
          </div>
        ) : (
          <div className='absolute w-full h-full'>
            <DefaultImage option='썸네일' />
          </div>
        )}
      </div>

      <div className='flex-grow px-5 text-base lg:text-lg xl:text-xl'>
        <h3 className='mb-1 text-sm font-semibold md:text-lg'>{data.name}</h3>
        <p className='text-xs text-gray700'>
          [옵션: {data.color} / {data.size} / {data.amount}개]
        </p>
      </div>

      <div className='text-base font-bold text-center whitespace-nowrap lg:text-lg xl:text-xl'>
        ₩{data.price.toLocaleString()}
      </div>
    </div>
  );
};

export default PaymentItem;
