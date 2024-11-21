import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
import { majorProductData, middleProductData, shopProductData } from '@/assets/dummys/productListDatas';
import useSort from '@/hooks/useSort';
import { useEffect, useState } from 'react';
import ProductCartSkeleton from '../components/skeletons/ProductCartSkeleton';

const CategoryPage = () => {
  const { majorCategory, middleCategory } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // 필터링된 제품을 반환하는 함수
  const filteredProducts = () => {
    if (majorCategory && middleCategory) {
      return middleProductData;
    } else if (majorCategory) {
      return majorProductData;
    } else {
      return shopProductData;
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 15000));
      setIsLoading(false);
    })();
  }, []);

  const products = filteredProducts();

  const { currentSort, setCurrentSort, sortedProducts } = useSort('최신순', products);

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

export default CategoryPage;
