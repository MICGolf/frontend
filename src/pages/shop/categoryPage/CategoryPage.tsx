import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
import { majorProductData, middleProductData, shopProductData } from '@/assets/dummys/productListDatas';

const CategoryPage = () => {
  const { majorCategory, middleCategory } = useParams();

  const filteredProducts = () => {
    if (majorCategory && middleCategory) {
      // Filter by both major and middle categories
      return middleProductData;
    } else if (majorCategory) {
      // If only major category exists, return major category products
      return majorProductData;
    } else {
      // If no category exists, return all products
      return shopProductData;
    }
  };

  const renderProductCard = () => {
    return filteredProducts().map((product) => (
      <li key={product.id}>
        <ProductCard product={product} />
      </li>
    ));
  };

  return (
    <article className='container mx-auto px-4 py-[160px]'>
      <div className='flex w-full flex-col gap-[24px]'>
        <SortDropdown />
        <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>{renderProductCard()}</ul>
      </div>
    </article>
  );
};

export default CategoryPage;
