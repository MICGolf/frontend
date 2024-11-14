import { shopProductData } from '@/assets/dummys/productListDatas';
import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';

const ShopPage = () => {
  return (
    <article className='container mx-auto px-4 py-[160px]'>
      <div className='flex w-full flex-col gap-[24px]'>
        <SortDropdown />
        <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {shopProductData.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ShopPage;
