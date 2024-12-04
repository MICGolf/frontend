import ProductDetailView from './components/ProductDetailView';
import ProductDetails from './components/ProductDetails';
import { productsApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { ProductData } from '@/api/type';
import { useCachedData } from '@/hooks/useCachedData';
import DetailPageSkeleton from './components/skeletons/DetailPageSkeleton';
import { handleApiError } from '@/utils/handleApiError';
import { useCallback, useEffect } from 'react';
import { HistoryType } from '@/layouts/publicLayout/types';

const DetailPage = () => {
  const { cachedData, id, hasCachedData } = useCachedData();
  const {
    data: productDetailData,
    isFetching,
    isError,
    error,
  } = useQuery<ProductData | null>({
    queryKey: ['productData', id],
    queryFn: async () => {
      try {
        const response = await productsApi.getSingleProduct(Number(id));
        return response.data;
      } catch (err: unknown) {
        handleApiError(err);
      }
    },
    initialData: cachedData,
    enabled: !hasCachedData,
  });

  const getHistoryFromLocalStorage = useCallback(() => {
    const history = localStorage.getItem('history');
    return history ? JSON.parse(history) : [];
  }, []);

  const saveHistoryToLocalStorage = useCallback(
    (data: ProductData) => {
      const currentHistory = getHistoryFromLocalStorage();
      const today = new Date().toISOString().slice(0, 10);

      // 중복 확인
      // 1. 날짜 확인, 2. 상품 id 확인
      const isDuplicate = currentHistory.some((item: HistoryType) => {
        // 1. 날짜 확인, 같으면 상품 id를 map 돌면서 확인
        if (item.date === today) {
          return item.products.some((product) => product.id === data.product.id);
        }
      });
      if (isDuplicate) return;

      // 아이템 가공
      const newItem = {
        date: today,
        product: {
          id: data.product.id,
          name: data.product.name,
          price: data.product.price,
          image: data.options[0].images[0].image_url || '', // default image 필요
        },
      };

      let updatedHistory: HistoryType[] = [];
      const todayHistoryIndex = currentHistory.findIndex((item: HistoryType) => item.date === today);

      // 오늘 날짜에 기록이 있는경우
      if (todayHistoryIndex !== -1) {
        const updatedTodayHistory = {
          ...currentHistory[todayHistoryIndex],
          products: [newItem.product, ...currentHistory[todayHistoryIndex].products],
        };
        console.log('updatedTodayHistory', updatedTodayHistory);

        updatedHistory = [
          ...currentHistory.slice(0, todayHistoryIndex),
          updatedTodayHistory,
          ...currentHistory.slice(todayHistoryIndex + 1),
        ];
      } else {
        // 오늘 날짜에 기록이 없으면 새로 추가
        const newHistoryItem = {
          date: today,
          products: [newItem.product],
        };

        updatedHistory = [newHistoryItem, ...currentHistory];
      }

      // 1. 한 달 기준으로 날짜 필터링
      const todayDate = new Date(today);
      updatedHistory = updatedHistory.filter((item: HistoryType) => {
        const itemDate = new Date(item.date);
        const daysDifference = (todayDate.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysDifference <= 30;
      });

      // 2. 최대 100개 상품 제한
      const flattenedProducts = updatedHistory.flatMap((item) =>
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

      localStorage.setItem('history', JSON.stringify(finalHistory));
    },
    [getHistoryFromLocalStorage]
  );

  useEffect(() => {
    if (productDetailData) {
      saveHistoryToLocalStorage(productDetailData);
    }
  }, [productDetailData, saveHistoryToLocalStorage]);

  return (
    <article className='w-full'>
      {isError && (
        <div className='flex h-screen w-full items-center justify-center text-2xl text-primary'>
          <p>{error.message}</p>
        </div>
      )}
      {isFetching && <DetailPageSkeleton />}
      {productDetailData && (
        <>
          <ProductDetailView data={productDetailData} />
          <ProductDetails data={productDetailData} isFetching={isFetching} />
        </>
      )}
    </article>
  );
};

export default DetailPage;
