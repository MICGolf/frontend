import { CartItemData, ProductDetail } from '@/assets/dummys/types';

interface SalePriceProps {
  price: number;
  originPrice: number;
  originalSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  saleSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  flex?: 'row' | 'col';
  align?: 'start' | 'center' | 'between';
}

const SalePrice = ({
  price,
  originPrice,
  originalSize = 'lg',
  saleSize = 'xl',
  flex = 'col',
  align = 'start',
}: SalePriceProps) => {
  // Tailwind CSS의 텍스트 크기 클래스 매핑
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  // Flex 방향 및 정렬 클래스 매핑
  const flexClasses = {
    row: `flex flex-row items-center gap-2`,
    col: `flex flex-col`,
  };

  const alignClasses = {
    start: 'items-start', // 시작 정렬
    center: 'items-center', // 중앙 정렬
    between: 'justify-between items-center', // 양쪽 정렬
  };

  return (
    <div className={`${flexClasses[flex]} ${alignClasses[align]}`}>
      {/* 취소선 가격 */}
      <p className={`text-sm font-light text-gray700 line-through ${sizeClasses[originalSize]}`}>
        ₩{originPrice.toLocaleString()}
      </p>
      {/* 할인 가격 */}
      <p className={`font-bold ${sizeClasses[saleSize]}`}>₩{price.toLocaleString()}</p>
    </div>
  );
};

export default SalePrice;
