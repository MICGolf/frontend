import { ProductData } from '@/api/type';
import { HistoryType } from '@/layouts/publicLayout/types';
import { useCallback, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useHistoryFab = (productDetailData: ProductData | null): void => {
  // localStorage에서 History 데이터 가져오기
  const [currentHistory, setStoredValue] = useLocalStorage<HistoryType[]>('history', []);

  // 중복 확인
  const isDuplicateEntry = useCallback((history: HistoryType[], today: string, productId: number): boolean => {
    return history.some((item: HistoryType) => {
      if (item.date === today) {
        return item.products.some((product) => product.id === productId);
      }
      return false;
    });
  }, []);

  // 새로운 기록 생성
  const createNewHistoryItem = useCallback((data: ProductData) => {
    const today = new Date().toISOString().slice(0, 10);
    return {
      date: today,
      product: {
        id: data.product.id,
        name: data.product.name,
        price: data.product.price,
        image: data.options?.[0]?.images?.[0]?.image_url || '',
      },
    };
  }, []);

  // 기록 업데이트
  const updateHistory = useCallback((currentHistory: HistoryType[], newItem: { date: string; product: any }) => {
    const todayHistoryIndex = currentHistory.findIndex((item) => item.date === newItem.date);
    let updatedHistory: HistoryType[];

    if (todayHistoryIndex !== -1) {
      const updatedTodayHistory = {
        ...currentHistory[todayHistoryIndex],
        products: [newItem.product, ...currentHistory[todayHistoryIndex].products],
      };
      updatedHistory = [
        ...currentHistory.slice(0, todayHistoryIndex),
        updatedTodayHistory,
        ...currentHistory.slice(todayHistoryIndex + 1),
      ];
    } else {
      updatedHistory = [{ date: newItem.date, products: [newItem.product] }, ...currentHistory];
    }

    return updatedHistory;
  }, []);

  // 오래된 기록 삭제 및 최대 100개 제한
  const filterAndLimitHistory = useCallback((history: HistoryType[]) => {
    const todayDate = new Date();
    const filteredHistory = history.filter((item) => {
      const itemDate = new Date(item.date);
      return (todayDate.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24) <= 30;
    });

    const flattenedProducts = filteredHistory.flatMap((item) =>
      item.products.map((product) => ({ ...product, date: item.date }))
    );
    const limitedProducts = flattenedProducts.slice(0, 100);

    const finalHistory: HistoryType[] = [];
    for (const product of limitedProducts) {
      const dateGroup = finalHistory.find((item) => item.date === product.date);
      if (dateGroup) {
        dateGroup.products.push(product);
      } else {
        finalHistory.push({ date: product.date, products: [product] });
      }
    }

    return finalHistory;
  }, []);

  useEffect(() => {
    if (!productDetailData) return;

    const today = new Date().toISOString().slice(0, 10);
    const isDuplicate = isDuplicateEntry(currentHistory, today, productDetailData.product.id);

    if (isDuplicate) return;

    const newItem = createNewHistoryItem(productDetailData);
    const updatedHistory = updateHistory(currentHistory, newItem);
    const finalHistory = filterAndLimitHistory(updatedHistory);
    setStoredValue(finalHistory);
  }, [productDetailData]);
};

export default useHistoryFab;
