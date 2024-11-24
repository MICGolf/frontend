import ProductDetailView from './components/ProductDetailView';
import ProductDetails from './components/ProductDetails';
import { productsApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { ProductData } from '@/api/type';
import { useCachedData } from '@/hooks/useCachedData';
import DetailPageSkeleton from './components/skeletons/DetailPageSkeleton';
import { handleApiError } from '@/utils/handleApiError';

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

  return (
    <article className='w-full'>
      {isError && (
        <div className='flex items-center justify-center w-full h-screen text-2xl text-primary'>
          <p>{error.message}</p>
        </div>
      )}
      {isFetching && <DetailPageSkeleton />}
      {productDetailData && (
        <>
          <ProductDetailView data={productDetailData} />
          <ProductDetails data={productDetailData} />
        </>
      )}
    </article>
  );
};

export default DetailPage;
