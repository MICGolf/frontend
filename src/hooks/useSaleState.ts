import { useEffect, useState } from 'react';

interface useSaleStateParams {
  discount: number;
  discountOption: 'percent' | 'amount'; // 할인 방식
}

const useSaleState = ({ discount, discountOption }: useSaleStateParams) => {
  const [isSale, setIsSale] = useState<boolean>(true);

  // 할인 상태의 조건 : discount가 0보다 클때(초과)
  useEffect(() => {
    if (discount > 0) setIsSale(true);
  }, [discount]);

  const renderPriceTextByOption = (discountOption: 'percent' | 'amount', discount: number) => {
    switch (discountOption) {
      case 'percent':
        return `${discount}% 할인`;
      case 'amount':
        return `${discount}원 할인`;
      default:
        return '';
    }
  };

  const saleLabelText = renderPriceTextByOption(discountOption, discount);

  // 할인 라벨 조건부 스타일
  const labelClassNames =
    discountOption === 'percent'
      ? 'bg-primary text-white' // 'percent'일 경우 배경색
      : 'border border-primary text-primary'; // 'amount'일 경우 테두리 색과 글자색

  return { isSale, saleLabelText, labelClassNames };
};

export default useSaleState;
