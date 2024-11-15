import { ProductDetail } from '@/assets/dummys/types';
import useSaleState from '@/hooks/useSaleState';
import useSoldOutState from '@/hooks/useSoldoutState';
import { Link } from 'react-router-dom';
import SaleLabel from './SaleLabel';

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
        <div className='flex flex-col h-full'>
          <div className='relative w-full overflow-hidden pt-[133%]'>
            {isSoldOut ? (
              <>
                <div className='absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.45)] text-3xl font-bold text-white'>
                  <span className='absolute animate-pulse'>Sold Out</span>
                </div>
                <img
                  src={productImage}
                  alt={name}
                  className='absolute top-0 object-cover w-full h-full transition-transform duration-300 z-10left-0 hover:scale-105'
                />
              </>
            ) : (
              <img
                src={productImage}
                alt={name}
                className='absolute top-0 left-0 object-cover w-full h-full transition-transform duration-300 hover:scale-105'
              />
            )}
          </div>
          <div className='flex flex-col justify-between flex-grow py-4'>
            <div className='flex items-center gap-2 mb-3'>
              <h3 className='text-lg font-semibold'>{name}</h3>
              <SaleLabel classString={labelClassNames} text={saleLabelText} />
            </div>

            {isSale ? (
              <div className='flex flex-col'>
                <div className='flex gap-2'>
                  <span className='text-sm line-through text-gray700'>₩{price.toLocaleString()}</span>
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
