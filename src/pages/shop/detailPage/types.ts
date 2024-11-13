import { ColorOption, ProductDetailInfo } from '@/assets/dummys/types';

export interface ProductDetailInfoProps {
  data: ProductDetailInfo;
}

export interface ColorBtnsProps {
  data: ColorOption[];
  onSelect: (obj: ColorOption) => void;
}

export interface ProductDetailViewProps extends ProductDetailInfoProps {}
