import ProductFilter from './ui/ProductFilter';
import ProductStatusDashboard from '../ui/ProductStatusDashboard';

const productStatusArray = [
  { title: '전체', count: 0 },
  { title: '판매대기', count: 0 },
  { title: '판매중', count: 0 },
  { title: '품절', count: 0 },
  { title: '판매중지', count: 0 },
  { title: '판매종료', count: 0 },
];

const ProductEdit = () => {
  return (
    <>
      <ProductStatusDashboard productStatusArray={productStatusArray} />
      <ProductFilter />
    </>
  );
};

export default ProductEdit;
