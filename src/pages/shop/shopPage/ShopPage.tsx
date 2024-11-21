import { shopProductData } from '@/assets/dummys/productListDatas';
import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
import useSort from '@/hooks/useSort';
import { useEffect, useState } from 'react';
import ProductCartSkeleton from '../components/skeletons/ProductCartSkeleton';

const ShopPage = () => {
  const { currentSort, setCurrentSort, sortedProducts } = useSort('최신순', shopProductData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 15000));
      setIsLoading(false);
    })();
  }, []);

  return (
    <article className='container mx-auto px-4 py-[160px] transition-all duration-300 ease-in-out'>
      <div className='flex w-full flex-col gap-[24px]'>
        <SortDropdown currentSort={currentSort} setCurrentSort={setCurrentSort} />
        <ul className='grid grid-cols-1 gap-6 transition-all duration-300 ease-in-out sm:grid-cols-2 lg:grid-cols-4'>
          {isLoading ? (
            <ProductCartSkeleton />
          ) : (
            sortedProducts.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))
          )}
        </ul>
      </div>
    </article>
  );
};

export default ShopPage;
