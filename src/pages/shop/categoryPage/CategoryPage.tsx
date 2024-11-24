import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
import useSort from '@/hooks/useSort';
import ProductCardSkeleton from '../components/skeletons/ProductCardSkeleton';
import { productsApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { ProductData } from '@/api/type';

const CategoryPage = () => {
  const { majorCategory, middleCategory } = useParams();
  console.log('카테고리페이지 렌더링');

  // majorCategory와 middleCategory를 숫자로 변환하되 NaN이 될 경우 null을 기본값으로 사용
  const majorCategoryId = majorCategory ? Number(majorCategory) : null;
  const middleCategoryId = middleCategory ? Number(middleCategory) : null;

  // middleCategoryId가 있을 경우 middleCategoryId를 사용하고, 그렇지 않으면 majorCategoryId 사용
  const currentCategory = middleCategoryId !== null ? middleCategoryId : majorCategoryId;

  const { currentSort, currentOrder, sortResult, setCurrentSort } = useSort();

  const {
    data: categoryProductData,
    isPending,
    isError,
    error,
  } = useQuery<ProductData[]>({
    queryKey: ['categoryProducts', sortResult, currentOrder, currentCategory],
    queryFn: async () => {
      // 유효한 currentCategory 값이 아닌 경우 오류 처리
      if (currentCategory === null) {
        throw new Error('해당 카테고리는 없어요.');
      }

      const response = await productsApi.getProductsData({
        page: 1,
        pageSize: 20,
        sort: sortResult,
        order: currentOrder,
        categoryId: currentCategory,
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5분 동안 최신으로 간주
  });

  return (
    <article className='container mx-auto px-4 py-[160px] transition-all duration-300 ease-in-out'>
      {isError && (
        <div className='flex items-center justify-center w-full h-screen text-2xl text-primary'>
          <p>{error.message}</p>
        </div>
      )}
      <div className='flex w-full flex-col gap-[24px]'>
        {<SortDropdown currentSort={currentSort} setCurrentSort={setCurrentSort} sortResult={sortResult} />}
        <ul className='grid w-full h-full grid-cols-1 gap-6 transition-all duration-300 ease-in-out sm:grid-cols-2 lg:grid-cols-4'>
          {isPending && <ProductCardSkeleton />}
          {categoryProductData &&
            categoryProductData?.map((item) => (
              <li key={item.product.id}>
                <ProductCard
                  productData={item.product}
                  optionData={item.options[0]}
                  queryKey={['categoryProducts', sortResult, currentOrder, currentCategory]}
                />
              </li>
            ))}
        </ul>
      </div>
    </article>
  );
};

export default CategoryPage;
