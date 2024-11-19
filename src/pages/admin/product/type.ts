export interface ProductListType {
  id: number;
  productNumber: string;
  productCode: string;
  productName: string;
  saleStatus: boolean;
  displayStatus: boolean;
  salePrice: number;
  discountPrice: number;
  discount: string;
  info?: string;
}
