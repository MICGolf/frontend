import { ProductColor, ProductData, ProductDetail2, ProductOption, ProductSize } from '@/api/type';

export interface ProductDetailViewProps {
  data: ProductData;
}

export interface ProductDetailsProps extends ProductDetailViewProps {}

export interface OptionState {
  productCode: string;
  productData: ProductDetail2;
  optionData: ProductOption | null;
  selectedColor?: ProductColor | null;
  selectedSize?: ProductSize | null;
  amount: number;
  stock: number;
}
