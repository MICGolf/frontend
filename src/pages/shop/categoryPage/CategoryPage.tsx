import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
import { majorProductData, middleProductData, shopProductData } from '@/assets/dummys/productListDatas';
import useSort from '@/hooks/useSort';

const CategoryPage = () => {
  const { majorCategory, middleCategory } = useParams();

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

  const products = filteredProducts();

  const { currentSort, setCurrentSort, sortedProducts } = useSort('최신순', products);

  // 상품 카드 렌더링 함수
  const renderProductCard = () => {
    return sortedProducts.map((product) => (
      <li key={product.id}>
        <ProductCard product={product} />
      </li>
    ));
  };

  return (
    <article className='container mx-auto px-4 py-[160px] transition-all duration-300 ease-in-out'>
      <div className='flex w-full flex-col gap-[24px]'>
        <SortDropdown currentSort={currentSort} setCurrentSort={setCurrentSort} />
        <ul className='grid grid-cols-1 gap-6 transition-all duration-300 ease-in-out sm:grid-cols-2 lg:grid-cols-4'>
          {renderProductCard()}
        </ul>
      </div>
    </article>
  );
};

export default CategoryPage;
