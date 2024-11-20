import ProductFilter from './components/ProductFilter';
import ProductStatusDashboard from '../components/ProductStatusDashboard';
import ProductList from './components/ProductList';

const productStatusArray = [
  { title: '전체', count: 0 },
  { title: '판매중', count: 0 },
  { title: '품절', count: 0 },
  { title: '판매중지', count: 0 },
];

const ProductEdit = () => {
  return (
    <>
      <ProductStatusDashboard productStatusArray={productStatusArray} />
      <ProductFilter />
      <ProductList />
    </>
  );
};

export default ProductEdit;
