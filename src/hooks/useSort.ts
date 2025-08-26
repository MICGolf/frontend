import { useState, useCallback, useEffect } from 'react';

export type SortMode = '최신순' | '오래된 순' | '가격 낮은순' | '가격 높은순';
export type OrderMode = 'desc' | 'asc';
export type SortModeSync = 'created_at' | 'price';

const useSort = () => {
  const [currentSort, setCurrentSort] = useState<SortMode>('최신순');
  const [sortResult, setSortResult] = useState<SortModeSync>('created_at');
  const [currentOrder, setCurrentOrder] = useState<OrderMode>('desc');

  // currentSort 값에 따라 sortResult와 currentOrder를 자동으로 설정하는 함수
  const updateSortSettings = useCallback((sort: SortMode) => {
    switch (sort) {
      case '최신순':
        setSortResult('created_at');
        setCurrentOrder('desc');
        break;
      case '오래된 순':
        setSortResult('created_at');
        setCurrentOrder('asc');
        break;
      case '가격 낮은순':
        setSortResult('price');
        setCurrentOrder('asc');
        break;
      case '가격 높은순':
        setSortResult('price');
        setCurrentOrder('desc');
        break;
      default:
        setSortResult('created_at');
        setCurrentOrder('desc');
    }
  }, []);

  // currentSort 값이 변경될 때마다 updateSortSettings 함수 호출
  useEffect(() => {
    updateSortSettings(currentSort);
  }, [currentSort, updateSortSettings]);

  return { currentSort, currentOrder, setCurrentSort, sortResult };
};

export default useSort;
