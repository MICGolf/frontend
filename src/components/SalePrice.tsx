import { CartItemData2, ProductDetail } from '@/assets/dummys/types';

interface SalePriceProps {
  data: ProductDetail | CartItemData2;
  originalSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  saleSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  flex?: 'row' | 'col';
}

const SalePrice = ({ data, originalSize = 'lg', saleSize = 'xl', flex = 'col' }: SalePriceProps) => {
  // Tailwind CSS의 텍스트 크기 클래스 매핑
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  // Flex 방향 클래스 매핑
  const flexClasses = {
    row: 'flex flex-row items-center gap-2', // 가로 정렬
    col: 'flex flex-col', // 세로 정렬
  };

  return (
    <div className={flexClasses[flex]}>
      {/* 취소선 가격 */}
      <p className={`font-light text-gray700 line-through ${sizeClasses[originalSize]}`}>
        ₩{data.price.toLocaleString()}
      </p>
      {/* 할인 가격 */}
      <p className={`font-bold ${sizeClasses[saleSize]}`}>₩{data.sale.result.toLocaleString()}</p>
    </div>
  );
};

export default SalePrice;
