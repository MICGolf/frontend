import { useState, useEffect } from 'react';
import ProductStatusDashboard from '../../components/ProductStatusDashboard';
import OrderingList from './components/OrderList';
import OrderStatePopup from './components/OrderStatePopup';
import { OrderingListType } from './type';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '@/api';

const productStatusArray = [
  { title: '발주 전', count: 0 },
  { title: '발주 후', count: 0 },
];

const SaleOrdering = () => {
  const [checkedList, setCheckedList] = useState<OrderingListType[]>([]);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState<number>(10);
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

  const {
    data: orderSearchData,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['orderSearch', pageLimit],
    queryFn: async () => {
      const response = await orderApi.getOrderSearch();
      if (!response) return null;
      console.log(response.data);
      return response.data;
    },
  });
  console.log('orderSearchData', orderSearchData);

  useEffect(() => {
    refetch();
  }, [pageLimit, refetch]);
  return (
    <>
      <ProductStatusDashboard productStatusArray={productStatusArray} />
      <OrderingList handleShowPopup={() => setIsOpen(true)} checkedList={checkedList} setCheckedList={setCheckedList} />
      {isOpen && <OrderStatePopup onClose={() => setIsOpen(false)} checkedList={checkedList} />}
    </>
  );
};

export default SaleOrdering;
