interface Image {
  id: number;
  image_url: string;
}
interface Sizes {
  size: string;
  stock: number;
}
interface Options {
  id: number;
  color: string;
  color_code: string;
  images: Image[];
  sizes: Sizes[];
}

export interface ProductListType {
  product: {
    id: number;
    name: string;
    price: number;
    discount: number;
    discount_option: 'string';
    origin_price: number;
    description: string;
    detail: string;
    brand: string;
    status: string;
    product_code: string;
  };
  options: Options[];
}

export interface ProductListProps {
  productListArray: ProductListType[];
  isPending: boolean;
  error: any;
  handleShowPopup: () => void;
  page: number;
  setPage: (page: number) => void;
  setPageLimit: (limit: string) => void;
}
export interface ProductFilterProps {
  setSearchParams: (params: any) => void;
  onSubmit: () => void;
}

export interface ProductFilterFormData {
  productName: string;
  productNumber: string;
  sellerProductCode: string;
  productStatus: string;
  category_id: string;
  startDate: string;
  endDate: string;
}
