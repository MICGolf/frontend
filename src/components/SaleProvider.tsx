import { createContext, useContext, ReactNode } from 'react';
import useSaleState from '@/hooks/useSaleState';

// Sale Context 정의
interface SaleContextType {
  isSale: boolean;
  saleLabelText: string;
  labelClassNames: string;
}

// 기본값 설정 (null로 설정 후 타입가드 활용)
const SaleContext = createContext<SaleContextType | null>(null);

// SaleProvider Props 타입 정의
interface SaleProviderProps {
  discount: number;
  discountOption: 'percent' | 'amount';
  children?: ReactNode;
}

export const SaleProvider = ({ discount, discountOption, children }: SaleProviderProps) => {
  const saleState = useSaleState({ discount, discountOption });

  return <SaleContext.Provider value={saleState}>{children}</SaleContext.Provider>;
};

// SaleContext Hook 정의
export const useSaleContext = () => {
  const context = useContext(SaleContext);
  if (!context) {
    throw new Error('useSaleContext must be used within a SaleProvider');
  }
  return context;
};
