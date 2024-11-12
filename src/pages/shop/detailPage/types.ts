import { Color, ProductDetailInfo } from '@/assets/dummys/types';

export interface ProductDetailInfoProps {
  data: ProductDetailInfo;
}

export interface ColorBtnsProps {
  data: Color[];
  optionList: Color[];
  onSelect: (obj: Color) => void;
  setOptionList: React.Dispatch<React.SetStateAction<Color[]>>;
}

export interface ProductDetailViewProps extends ProductDetailInfoProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
