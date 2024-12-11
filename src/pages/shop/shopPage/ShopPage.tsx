import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
import useSort from '@/hooks/useSort';
import { useInfiniteQuery } from '@tanstack/react-query';
import { productsApi } from '@/api';
import ProductCardSkeleton from '../components/skeletons/ProductCardSkeleton';
import { ProductDatas } from '@/api/type';
import { useInView } from 'react-intersection-observer';
import { handleApiError } from '@/utils/handleApiError';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

const ShopPage = () => {
  const { currentSort, currentOrder, sortResult, setCurrentSort } = useSort();
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const pageSize = 8;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, error } =
    useInfiniteQuery<ProductDatas>({
      queryKey: ['allProducts', sortResult, currentOrder],
      queryFn: async ({ pageParam }) => {
        try {
          const response = await productsApi.getProductsData({
            page: pageParam as number,
            pageSize,
            sort: sortResult,
            order: currentOrder,
          });
          return response.data;
        } catch (err) {
          handleApiError(err);
        }
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const currentPage = allPages.length;
        const totalPages = Math.ceil(lastPage.total_count / pageSize);
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
      staleTime: 1000 * 5 * 60,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const shopProductData = data?.pages.flatMap((page) => page.products);

  if (isError) {
    return (
      <div className='flex h-screen w-full items-center justify-center text-2xl text-primary'>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  if (shopProductData?.length === 0) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <span className='text-lg'>상품이 없어요.</span>
      </div>
    );
  }

  return (
    <article className='container mx-auto px-4 py-[160px] transition-all duration-300 ease-in-out'>
      <div className='flex w-full flex-col gap-[24px]'>
        <SortDropdown currentSort={currentSort} setCurrentSort={setCurrentSort} sortResult={sortResult} />
        <ul className='grid grid-cols-1 gap-6 transition-all duration-300 ease-in-out sm:grid-cols-2 lg:grid-cols-4'>
          {isPending && <ProductCardSkeleton />}
          {shopProductData &&
            shopProductData?.map((item, idx) => {
              return (
                <li key={idx}>
                  <ProductCard
                    productData={item?.product}
                    optionData={item?.options?.[0]}
                    queryKey={['allProducts', sortResult, currentOrder]}
                  />
                </li>
              );
            })}
        </ul>
        {isFetchingNextPage && (
          <div className='grid h-full w-full grid-cols-1 gap-6 transition-all duration-300 ease-in-out sm:grid-cols-2 lg:grid-cols-4'>
            <ProductCardSkeleton />
          </div>
        )}
      </div>
      <div ref={ref} className='mt-[160px] flex h-[20px] w-full items-center justify-center'>
        {(isFetchingNextPage || hasNextPage) && <LoadingSpinner size='s' />}
      </div>
    </article>
  );
};

export default ShopPage;
