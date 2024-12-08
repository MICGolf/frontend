import { useState, useEffect } from 'react';
import ProductStatusDashboard from '../../components/ProductStatusDashboard';
import OrderingList from './components/OrderList';
import OrderStatePopup from './components/OrderStatePopup';
import { OrderingListType } from './type';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '@/api';

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
  const { data: orderStatisticsData } = useQuery({
    queryKey: ['orderStatisiecs'],
    queryFn: async () => {
      const response = await orderApi.getOrderStatistics();
      if (!response) return null;
      return response.data;
    },
    staleTime: 1000 * 60,
  });
  const productStatusArray = [
    { title: '신규주문(발주확인 처리 전)', count: orderStatisticsData?.pending_orders },
    { title: '신규주문(발주확인 처리 후)', count: orderStatisticsData?.shipping_orders },
  ];
  return (
    <>
      <ProductStatusDashboard productStatusArray={productStatusArray} />
      <OrderingList handleShowPopup={() => setIsOpen(true)} checkedList={checkedList} setCheckedList={setCheckedList} />
      {isOpen && <OrderStatePopup onClose={() => setIsOpen(false)} checkedList={checkedList} />}
    </>
  );
};

export default SaleOrdering;
