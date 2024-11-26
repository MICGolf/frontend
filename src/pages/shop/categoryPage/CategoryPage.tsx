import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
import useSort from '@/hooks/useSort';
import ProductCardSkeleton from '../components/skeletons/ProductCardSkeleton';
import { productsApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { ProductData } from '@/api/type';
import { handleApiError } from '@/utils/handleApiError';

const CategoryPage = () => {
  const { majorCategory, middleCategory, subCategory } = useParams();
  console.log('카테고리페이지 렌더링');

  const parseCategoryId = (param: string | undefined): number | null => {
    if (!param) return null;
    const id = Number(param);
    return isNaN(id) ? null : id;
  };

  const majorCategoryId = parseCategoryId(majorCategory);
  const middleCategoryId = parseCategoryId(middleCategory);
  const subCategoryId = parseCategoryId(subCategory);

  console.log(majorCategoryId, middleCategoryId, subCategoryId);

  if (majorCategoryId === null) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <span className='text-lg'>유효하지 않은 카테고리입니다. 다시 시도해주세요.</span>
      </div>
    );
  }

  if (middleCategory && middleCategoryId === null) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <span className='text-lg'>유효하지 않은 중간 카테고리입니다. 다시 시도해주세요.</span>
      </div>
    );
  }

  if (subCategory && subCategoryId === null) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <span className='text-lg'>유효하지 않은 소분류입니다. 다시 시도해주세요.</span>
      </div>
    );
  }

  const currentCategory =
    subCategoryId !== null ? subCategoryId : middleCategoryId !== null ? middleCategoryId : majorCategoryId;

  const { currentSort, currentOrder, sortResult, setCurrentSort } = useSort();

  const {
    data: categoryProductData,
    isPending,
    isError,
    error,
  } = useQuery<ProductData[]>({
    queryKey: ['categoryProducts', sortResult, currentOrder, currentCategory],
    queryFn: async () => {
      try {
        const response = await productsApi.getProductsData({
          page: 1,
          pageSize: 20,
          sort: sortResult,
          order: currentOrder,
          categoryId: currentCategory,
        });
        return response.data;
      } catch (err) {
        handleApiError(err);
      }
    },
    staleTime: 5 * 60 * 1000, // 5분 동안 최신으로 간주
  });

  if (categoryProductData?.length === 0) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <span className='text-lg'>존재하지 않는 카테고리이거나 상품이 없어요.</span>
      </div>
    );
  }

  return (
    <article className='container mx-auto px-4 py-[160px] transition-all duration-300 ease-in-out'>
      {isError && (
        <div className='flex h-screen w-full items-center justify-center text-2xl text-primary'>
          <p>{error.message}</p>
        </div>
      )}
      <div className='flex w-full flex-col gap-[24px]'>
        {<SortDropdown currentSort={currentSort} setCurrentSort={setCurrentSort} sortResult={sortResult} />}
        <ul className='grid h-full w-full grid-cols-1 gap-6 transition-all duration-300 ease-in-out sm:grid-cols-2 lg:grid-cols-4'>
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
