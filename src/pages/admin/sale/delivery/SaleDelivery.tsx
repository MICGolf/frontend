import ProductStatusDashboard from '../../components/ProductStatusDashboard';
import DeliveryFilter from './components/DeliveryFilter';
import DeliveryList from './components/DeliveryList';
const productStatusArray = [
  { title: '배송 중', count: 0 },
  { title: '배송 완료', count: 0 },
];
const SaleDelivery = () => {
  return (
    <>
      <ProductStatusDashboard productStatusArray={productStatusArray} />
      <DeliveryFilter />
      <DeliveryList />
    </>
  );
};

export default SaleDelivery;
