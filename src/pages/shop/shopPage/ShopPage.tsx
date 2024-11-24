import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
import useSort from '@/hooks/useSort';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/api';
import ProductCardSkeleton from '../components/skeletons/ProductCardSkeleton';
import { ProductData } from '@/api/type';

const ShopPage = () => {
  console.log('샵페이지 렌더링');
  const { currentSort, currentOrder, sortResult, setCurrentSort } = useSort();
  const { data: shopProductData, isPending } = useQuery<ProductData[]>({
    queryKey: ['allProducts', sortResult, currentOrder],
    queryFn: async () => {
      const response = await productsApi.getProductsData({
        page: 1,
        pageSize: 20,
        sort: sortResult,
        order: currentOrder,
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5분 동안 최신으로 간주
  });

  return (
    <article className='container mx-auto px-4 py-[160px] transition-all duration-300 ease-in-out'>
      <div className='flex w-full flex-col gap-[24px]'>
        <SortDropdown currentSort={currentSort} setCurrentSort={setCurrentSort} sortResult={sortResult} />
        <ul className='grid grid-cols-1 gap-6 transition-all duration-300 ease-in-out sm:grid-cols-2 lg:grid-cols-4'>
          {isPending && <ProductCardSkeleton />}
          {shopProductData &&
            shopProductData?.map((item) => (
              <li key={item.product.id}>
                <ProductCard
                  productData={item.product}
                  optionData={item.options[0]}
                  queryKey={['allProducts', sortResult, currentOrder]}
                />
              </li>
            ))}
        </ul>
      </div>
    </article>
  );
};

export default ShopPage;
