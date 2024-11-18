export interface ProductListType {
  id: number;
  productNumber: string;
  productCode: string;
  productName: string;
  saleStatus: boolean;
  displayStatus: boolean;
  stockQuantity: number;
  salePrice: number;
  discountPrice: number;
  discount: string;
  info?: string;
}
