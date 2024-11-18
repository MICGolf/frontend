import ProductStatusDashboard from '../../components/ProductStatusDashboard';
import OrderingList from './components/OrderList';

const productStatusArray = [
  { title: '발주 전', count: 0 },
  { title: '발주 후', count: 0 },
];
const SaleOrdering = () => {
  return (
    <>
      <ProductStatusDashboard productStatusArray={productStatusArray} />
      <OrderingList />
    </>
  );
};

export default SaleOrdering;
