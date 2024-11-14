import { Color, ProductDetail, Size } from '@/assets/dummys/types';

export interface ProductDetailViewProps {
  data: ProductDetail;
}

export interface ProductDetailsProps extends ProductDetailViewProps {}

export interface ColorBtnsProps {
  data: Color[];
  onSelect: (color: Color | null) => void;
  onChange: (image: string[]) => void;
}

export interface SizeBtnsProps {
  data: Color | null;
  onSelect: (size: Size | null) => void;
}

export interface CounterBtnProps {
  count: number;
  setCount: (newCount: number) => void;
  maxCount: number;
  setMaxCount: (newMaxCount: number) => void;
  selectedSize: Size | null;
  selectedColor: Color | null;
}
