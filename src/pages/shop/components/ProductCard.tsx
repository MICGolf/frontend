import { ProductDetail } from '@/assets/dummys/types';
import useSaleState from '@/hooks/useSaleState';
import useSoldOutState from '@/hooks/useSoldoutState';
import { Link } from 'react-router-dom';
import { SaleProvider } from '@/components/SaleProvider';
import SaleLabel from '@/components/SaleLabel';

interface ProductCardProps {
  product: ProductDetail;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, colors, sale } = product;
  const productImage = colors[0].images[0]; // 첫 번째 색상과 첫 번째 이미지를 가져옴.
  const { isSoldOut } = useSoldOutState(product);
  const { isSale, saleLabelText, labelClassNames } = useSaleState(product);

  return (
    <>
      <Link to={`/shop/detail/${id}`} className='block h-full'>
        <div className='flex h-full flex-col'>
          <div className='relative w-full overflow-hidden pt-[133%]'>
            {isSoldOut ? (
              <>
                <div className='absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.45)] text-3xl font-bold text-white'>
                  <span className='absolute animate-pulse'>Sold Out</span>
                </div>
                <img
                  src={productImage}
                  alt={name}
                  className='z-10left-0 absolute top-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                />
              </>
            ) : (
              <img
                src={productImage}
                alt={name}
                className='absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105'
              />
            )}
          </div>
          <div className='flex flex-grow flex-col justify-between py-4'>
            <div className='mb-3 flex flex-col gap-2'>
              <h3 className='text-lg font-semibold'>{name}</h3>
              <SaleProvider data={product}>
                <SaleLabel classString={labelClassNames} text={saleLabelText} />
              </SaleProvider>
            </div>

            {isSale ? (
              <div className='flex flex-col'>
                <div className='flex gap-2'>
                  <span className='text-sm text-gray700 line-through'>₩{price.toLocaleString()}</span>
                </div>

                <p className='text-primary'>₩{sale.result.toLocaleString()}</p>
              </div>
            ) : (
              <p className='text-primary'>₩{price.toLocaleString()}</p>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
