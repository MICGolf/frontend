import { ProductOption } from '@/api/type';
import { useMemo } from 'react';

const useSoldOutState = (optionData: ProductOption | null) => {
  const isSoldOut = useMemo(() => {
    if (!optionData) return false;
    return optionData.sizes.every((size) => size.stock === 0);
  }, [optionData]);

  return { isSoldOut };
};

export default useSoldOutState;
