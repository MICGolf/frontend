import ProductFilter from './ui/ProductFilter';
import ProductStatusDashboard from '../ui/ProductStatusDashboard';
import ProductList from './ui/ProductList';

const productStatusArray = [
  { title: '전체', count: 0 },
  { title: '판매중', count: 0 },
  { title: '품절', count: 0 },
  { title: '판매중지', count: 0 },
];

const ProductSearch = () => {
  return (
    <>
      <ProductStatusDashboard productStatusArray={productStatusArray} />
      <ProductFilter />
      <ProductList />
    </>
  );
};

export default ProductSearch;
