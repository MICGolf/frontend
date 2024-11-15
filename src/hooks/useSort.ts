import { useState, useEffect } from 'react';
import { ProductDetail } from '@/assets/dummys/types';

export type SortMode = '최신순' | '가격 낮은순' | '가격 높은순';

const useSort = (initialSort: SortMode, products: ProductDetail[]) => {
  const [currentSort, setCurrentSort] = useState<SortMode>(initialSort);
  const [sortedProducts, setSortedProducts] = useState<ProductDetail[]>([]);

  useEffect(() => {
    let sorted: ProductDetail[] = [...products];

    switch (currentSort) {
      case '최신순':
        sorted = sorted.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case '가격 낮은순':
        sorted = sorted.sort((a, b) => a.price - b.price);
        break;
      case '가격 높은순':
        sorted = sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted = products;
    }

    setSortedProducts(sorted);
  }, [currentSort, products]);

  return { currentSort, setCurrentSort, sortedProducts };
};

export default useSort;
