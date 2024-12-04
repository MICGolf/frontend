import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
import useSort from '@/hooks/useSort';
import ProductCardSkeleton from '../components/skeletons/ProductCardSkeleton';
import { productsApi } from '@/api';
import { ProductDatas } from '@/api/type';
import { handleApiError } from '@/utils/handleApiError';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

const CategoryPage = () => {
  const { majorCategory, middleCategory, subCategory } = useParams();
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const parseCategoryId = (param: string | undefined): number | null => {
    if (!param) return null;
    const id = Number(param);
    return isNaN(id) ? null : id;
  };

  const majorCategoryId = parseCategoryId(majorCategory as string);
  const middleCategoryId = parseCategoryId(middleCategory as string);
  const subCategoryId = parseCategoryId(subCategory as string);

  if (majorCategoryId === null) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <span className='text-lg'>유효하지 않은 카테고리입니다. 다시 시도해주세요.</span>
      </div>
    );
  }

  if (middleCategory && middleCategoryId === null) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <span className='text-lg'>유효하지 않은 중간 카테고리입니다. 다시 시도해주세요.</span>
      </div>
    );
  }

  if (subCategory && subCategoryId === null) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <span className='text-lg'>유효하지 않은 소분류입니다. 다시 시도해주세요.</span>
      </div>
    );
  }

  const currentCategory =
    subCategoryId !== null ? subCategoryId : middleCategoryId !== null ? middleCategoryId : majorCategoryId;

  const { currentSort, currentOrder, sortResult, setCurrentSort } = useSort();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, error } = useInfiniteQuery<
    ProductDatas[]
  >({
    queryKey: ['categoryProducts', sortResult, currentOrder, currentCategory],
    queryFn: async ({ pageParam }) => {
      try {
        const response = await productsApi.getProductsData({
          page: pageParam as number,
          pageSize: 8,
          sort: sortResult,
          order: currentOrder,
          categoryId: currentCategory,
        });
        return response.data;
      } catch (err) {
        handleApiError(err);
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 8 ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 5 * 60,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const categoryProductData = data?.pages.flat()[0].products;

  if (isError) {
    return (
      <div className='flex items-center justify-center w-full h-screen text-2xl text-primary'>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  if (categoryProductData?.length === 0) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <span className='text-lg'>상품이 없어요.</span>
      </div>
    );
  }

  return (
    <article className={`container mx-auto h-full px-4 pt-[160px] transition-all duration-300 ease-in-out`}>
      <div className='flex w-full flex-col gap-[24px]'>
        <SortDropdown currentSort={currentSort} setCurrentSort={setCurrentSort} sortResult={sortResult} />
        <ul className='grid w-full h-full grid-cols-1 gap-6 transition-all duration-300 ease-in-out sm:grid-cols-2 lg:grid-cols-4'>
          {isPending && <ProductCardSkeleton />}
          {categoryProductData &&
            categoryProductData.map((item) => (
              <li key={item.product.id}>
                <ProductCard
                  productData={item.product}
                  optionData={item.options[0]}
                  queryKey={['categoryProducts', sortResult, currentOrder, currentCategory]}
                />
              </li>
            ))}
        </ul>
        {isFetchingNextPage && (
          <div className='grid w-full h-full grid-cols-1 gap-6 transition-all duration-300 ease-in-out sm:grid-cols-2 lg:grid-cols-4'>
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

export default CategoryPage;
