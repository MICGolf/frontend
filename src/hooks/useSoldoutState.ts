import { ProductDetail } from '@/assets/dummys/types';
import { useMemo } from 'react';

const useSoldOutState = (product: ProductDetail) => {
  const isSoldOut = useMemo(() => {
    return product.colors.every((color) => color.sizes.every((size) => size.stock === 0));
  }, [product]);

  return { isSoldOut };
};

export default useSoldOutState;
