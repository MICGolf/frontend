import useSaleState from '@/hooks/useSaleState';
import useSoldOutState from '@/hooks/useSoldoutState';
import { Link } from 'react-router-dom';
import SaleLabel from '@/components/SaleLabel';
import { ProductDetail2, ProductOption } from '@/api/type';
import { SaleProvider } from '@/components/SaleProvider';
import SalePrice from '@/components/SalePrice';
import useDefaultImage from '@/hooks/useDefaultImage';
import ImageOnLoadSkeleton from '../detailPage/components/skeletons/ImageOnLoadSkeleton';
import DefaultImage from '../detailPage/components/DefaultImage';

interface ProductCardProps {
  productData: ProductDetail2;
  optionData: ProductOption;
  queryKey: any[];
}

const ProductCard = ({ productData, optionData, queryKey }: ProductCardProps) => {
  const { id, name, price, discount, discount_option: discountOption, origin_price: originPrice } = productData;
  const images = optionData?.images || [];
  const thumbnail = images.length > 0 ? images[0].image_url : '';
  const isThumbnailExist = images.length > 0;
  const { isImageError, handleOnError, isImageLoading, handleOnLoad } = useDefaultImage(isThumbnailExist);
  const { isSoldOut } = useSoldOutState(optionData);
  const { isSale } = useSaleState({ discount, discountOption });

  return (
    <Link
      to={`/product/detail/${id}`}
      state={{ queryKey }}
      className='block h-full'
      aria-label={isSoldOut ? `${name} 품절` : `${name} 디테일 보러가기`}
    >
      <div className='flex h-full flex-col'>
        <div
          className={`relative w-full overflow-hidden pt-[133%] ${isImageError && 'flex flex-col items-center justify-center gap-2 bg-gray-200'}`}
        >
          {isSoldOut && (
            <>
              <div
                className='absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.45)] text-3xl font-bold text-white'
                aria-hidden='true'
              >
                <span className='absolute animate-pulse'>Sold Out</span>
              </div>
            </>
          )}
          {isImageLoading && <ImageOnLoadSkeleton option='썸네일' />}
          {isThumbnailExist ? (
            <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2'>
              <img
                src={thumbnail}
                alt={`${name} 썸네일 이미지`}
                className={
                  isImageError
                    ? 'w-[60px] object-contain'
                    : 'absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                }
                onError={handleOnError}
                onLoad={handleOnLoad}
              />
              {isImageError && <p className='text-xs text-secondary'>이미지 로드 실패</p>}
            </div>
          ) : (
            <div className='absolute left-0 top-0 h-full w-full'>
              <DefaultImage option='썸네일' />
            </div>
          )}
        </div>
        <div className='flex flex-grow flex-col justify-between py-4'>
          <div className='mb-3 flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>{name}</h3>
            <SaleProvider discount={discount} discountOption={discountOption}>
              <SaleLabel />
            </SaleProvider>
          </div>
          {isSale ? (
            <SalePrice originPrice={originPrice} price={price} />
          ) : (
            <p className='text-primary'>₩{originPrice.toLocaleString()}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
