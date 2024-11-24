import { ProductData } from '@/api/type';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';

interface LocationState {
  queryKey?: any[];
}

interface UseCachedDataResult {
  cachedData: ProductData | null;
  id: string | undefined;
  hasCachedData: boolean;
}

export const useCachedData = (): UseCachedDataResult => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const queryClient = useQueryClient();

  const getQueryData = () => {
    const state = location.state as LocationState;

    if (!state?.queryKey || !id) {
      console.log('location.state에 queryKey가 없거나 상품 ID가 없습니다.');
      return null;
    }

    const queryKey = state.queryKey;
    const cachedProducts = queryClient.getQueryData<ProductData[]>(queryKey);

    if (!Array.isArray(cachedProducts)) {
      // console.log('캐싱된 데이터가 Array가 아니므로 find 메서드가 작동하지 않습니다.');
      return null;
    }

    const cachedData = cachedProducts.find((item) => item.product.id === Number(id));

    if (!cachedData) {
      console.log(`ID(${id})에 해당하는 캐싱된 데이터가 없습니다.`);
      return null;
    }

    return cachedData;
  };

  const cachedData = getQueryData();
  const hasCachedData = cachedData !== null;

  return { cachedData, id, hasCachedData };
};
