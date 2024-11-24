import { ProductColor, ProductData, ProductOption, ProductSize } from '@/api/type';

export interface ProductDetailViewProps {
  data: ProductData;
}

export interface ProductDetailsProps extends ProductDetailViewProps {}

export interface OptionState {
  optionData: ProductOption | null;
  selectedColor?: ProductColor | null;
  selectedSize?: ProductSize | null;
  amount: number;
  stock: number;
}
