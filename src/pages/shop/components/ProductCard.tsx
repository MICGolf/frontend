import { ProductDetail } from '@/assets/dummys/types';
import useSoldOutState from '@/hooks/useSoldoutState';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: ProductDetail;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isSale, setIsSale] = useState<boolean>(true);
  const { id, name, price, colors, sale } = product;
  const productImage = colors[0].images[0]; // 첫 번째 색상과 첫 번째 이미지를 가져옴.
  const { isSoldOut } = useSoldOutState(product);
  useEffect(() => {
    setIsSale(sale.is_active);
  }, [sale.is_active]);

  const renderPriceTextByUnit = (unit: string, value: number) => {
    switch (unit) {
      case '%':
        return `${value}${unit} 할인`;
      case '-':
        return `${value}원 할인`;
      default:
        return '';
    }
  };

  // 할인 라벨 스타일 결정 함수
  const labelClassNames =
    sale.unit === '%'
      ? 'bg-primary text-white' // %일 경우 배경색
      : 'border border-primary text-primary'; // -일 경우 테두리 색과 글자색

  return (
    <>
      <Link to={`/shop/detail/${id}`} className='block h-full'>
        <div className='flex flex-col h-full'>
          <div className='relative w-full overflow-hidden pt-[133%]'>
            {isSoldOut ? (
              <>
                <div className='absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.45)] text-3xl font-bold text-white'>
                  Sold Out
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
              <span className={`flex h-6 items-center justify-center px-2 text-center text-[10px] ${labelClassNames}`}>
                {renderPriceTextByUnit(sale.unit, sale.value)}
              </span>
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
