import ProductDetailView from './components/ProductDetailView';
import ProductDetails from './components/ProductDetails';
import { productsApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { ProductData } from '@/api/type';
import { useCachedData } from '@/hooks/useCachedData';
import DetailPageSkeleton from './components/skeletons/DetailPageSkeleton';
import { handleApiError } from '@/utils/handleApiError';
import { useCallback, useEffect } from 'react';

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

  console.log(productDetailData);

  const getHistoryFromLocalStorage = useCallback(() => {
    const history = localStorage.getItem('history');
    return history ? JSON.parse(history) : [];
  }, []);

  const saveHistoryToLocalStorage = useCallback(
    (data: ProductData) => {
      const currentHistory = getHistoryFromLocalStorage();

      // 중복 확인
      const isDuplicate = currentHistory.some((item: ProductData) => item.product.id === data.product.id);
      if (isDuplicate) return;

      // 아이템 가공
      const newItem = {
        product: {
          id: data.product.id,
          name: data.product.name,
          origin_price: data.product.origin_price,
          img: data.options[0].images[0].image_url || '', // default image 필요
        },
      };

      const updatedHistory = [newItem, ...currentHistory];
      localStorage.setItem('history', JSON.stringify(updatedHistory));
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
