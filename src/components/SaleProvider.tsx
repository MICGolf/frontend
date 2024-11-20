import { createContext, useContext, ReactNode } from 'react';
import { CartItemData2, ProductDetail } from '@/assets/dummys/types';
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
  data: ProductDetail | CartItemData2;
  children: ReactNode;
}

export const SaleProvider = ({ data, children }: SaleProviderProps) => {
  const saleState = useSaleState(data);

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
