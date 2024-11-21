import { useState, useEffect } from 'react';
import ProductStatusDashboard from '../../components/ProductStatusDashboard';
import OrderingList from './components/OrderList';
import OrderStatePopup from './components/OrderStatePopup';
import { OrderingListType } from './type';

const productStatusArray = [
  { title: '발주 전', count: 0 },
  { title: '발주 후', count: 0 },
];

const SaleOrdering = () => {
  const [checkedList, setCheckedList] = useState<OrderingListType[]>([]);
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
      <OrderingList handleShowPopup={() => setIsOpen(true)} checkedList={checkedList} setCheckedList={setCheckedList} />
      {isOpen && <OrderStatePopup onClose={() => setIsOpen(false)} checkedList={checkedList} />}
    </>
  );
};

export default SaleOrdering;
