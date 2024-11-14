import ProductStatusDashboard from '../../ui/ProductStatusDashboard';
import DeliveryFilter from './ui/DeliveryFilter';
const productStatusArray = [
  { title: '배송 중', count: 0 },
  { title: '배송 완료', count: 0 },
];
const SaleDelivery = () => {
  return (
    <>
      <ProductStatusDashboard productStatusArray={productStatusArray} />
      <DeliveryFilter />
    </>
  );
};

export default SaleDelivery;
