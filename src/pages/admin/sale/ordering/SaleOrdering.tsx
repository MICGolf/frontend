import { useState, useEffect } from 'react';
import ProductStatusDashboard from '../../components/ProductStatusDashboard';
import OrderingList from './components/OrderList';
import OrderStatePopup from './components/OrderStatePopup';

const productStatusArray = [
  { title: '발주 전', count: 0 },
  { title: '발주 후', count: 0 },
];

const SaleOrdering = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  return (
    <>
      <ProductStatusDashboard productStatusArray={productStatusArray} />
      <OrderingList handleShowPopup={() => setIsOpen(true)} />
      {isOpen && <OrderStatePopup onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default SaleOrdering;
