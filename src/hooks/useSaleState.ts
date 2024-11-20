import { CartItemData2, ProductDetail } from '@/assets/dummys/types';
import { useEffect, useState } from 'react';

const useSaleState = (product: ProductDetail | CartItemData2) => {
  const [isSale, setIsSale] = useState<boolean>(true);
  const { sale } = product;
  const { unit, value } = sale;

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

  const saleLabelText = renderPriceTextByUnit(unit, value);

  // 할인 라벨 조건부 스타일
  const labelClassNames =
    unit === '%'
      ? 'bg-primary text-white' // %일 경우 배경색
      : 'border border-primary text-primary'; // -일 경우 테두리 색과 글자색

  return { isSale, saleLabelText, labelClassNames };
};

export default useSaleState;
