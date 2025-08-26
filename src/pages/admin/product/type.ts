interface Image {
  id: number;
  image_url: string;
}
export interface Sizes {
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
    discount_option: 'percent' | 'price';
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
  productListArray: { products: ProductListType[]; total_count: number };
  isPending: boolean;
  error: any;
  pageLimit: number;
  handleShowPopup: () => void;
  page: number;
  setPage: (page: number) => void;
  setPageLimit: (limit: number) => void;
  setQuantitPopupData: (data: any) => void;
  setSearchParams: (params: any) => void;
}
export interface ProductFilterProps {
  pageLimit: number;
  setSearchParams: (params: any) => void;
  onSubmit: () => void;
  searchParams?: URLSearchParams;
}

export interface ProductFilterFormData {
  productName?: string;
  productNumber?: string;
  sellerProductCode?: string;
  productStatus?: string;
  category_id?: string;
  startDate?: string;
  endDate?: string;
  pageLimit?: number;
}
