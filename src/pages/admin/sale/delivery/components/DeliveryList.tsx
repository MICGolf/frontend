import { useEffect, useState } from 'react';
import { SectionBox } from '@/pages/admin/components/SectionBox';
import ListHeader from '@/pages/admin/components/ListHeader';
import { DeliveryListType } from '../type';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '@/api';

const ListHeaderArray = [
  { className: 'w-1/12', title: '체크박스' },
  { className: 'basis-full', title: '주문번호' },
  { className: 'basis-full', title: '상품주문번호' },
  { className: 'basis-full', title: '발송처리일' },
  { className: 'basis-full', title: '배송속성' },
  { className: 'basis-full', title: '클레임상태' },
  { className: 'basis-full', title: '택배사' },
  { className: 'basis-full', title: '송장번호' },
];
const productListArray: DeliveryListType[] = [
  {
    id: 0,
    orderNumber: '주문번호',
    productOrderNumber: '상품주문번호',
    orderDate: '발송처리일',
    orderStatus: '배송속성',
    claimStatus: '클레임상태',
    deliveryCompany: 'cj대한통운',
    invoiceNumber: '1234567890',
  },
];
const DeliveryList = () => {
  const [checkedList, setCheckedList] = useState<DeliveryListType[]>([]);
  const { data: orderSearchData, refetch } = useQuery({
    queryKey: ['orderSearch'],
    queryFn: async () => {
      const response = await orderApi.getPageType('SHIPPING');
      if (!response) return null;
      return response.data;
    },
  });
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <SectionBox title={`주문목록 총(${orderSearchData?.length}개)`}>
      <div className='px-5'>
        <ListHeader
          HeaderListArray={ListHeaderArray}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          listArray={productListArray}
        />
        <div>
          {orderSearchData && orderSearchData.length === 0 ? (
            <p>주문이 없습니다.</p>
          ) : (
            orderSearchData &&
            orderSearchData.map((order: any) => {
              if (orderSearchData.length === 0) return <p>주문이 없습니다.</p>;
              if (order.products.length === 0) return console.log('주문상태에 상품이 포함되어있지 않음');
              order.products.map((products: any) => {
                return (
                  <div
                    key={products.id}
                    className='flex items-center self-stretch py-3 text-center border-b justify-stretch justify-items-center border-neutral-200'
                  >
                    <div className='flex items-center justify-center w-1/12'>
                      <input
                        type='checkbox'
                        checked={checkedList.some((checkedItem) => checkedItem.id === products.id)}
                        onChange={() => {
                          if (checkedList.some((checkedItem) => checkedItem.id === products.id)) {
                            setCheckedList(checkedList.filter((checkedItem) => checkedItem.id !== products.id));
                          } else {
                            setCheckedList([...checkedList, products]);
                          }
                        }}
                        disabled={false}
                      />
                    </div>

                    <div className='basis-full'>{order.order_number}</div>
                    <div className='basis-full'>{products.id}</div>
                    <div className='basis-full'>{order.created_at}</div>
                    <div className='basis-full'>{products.shipping.status}</div>
                    <div className='basis-full'>{order.claimStatus}</div>
                    <div className='basis-full'>{order.shipping.courier}</div>
                    <div className='basis-full'>{order.shipping.tracking_number}</div>
                  </div>
                );
              });
            })
          )}
        </div>
        <div className='flex justify-center gap-5 mt-5'>
          <button
            onClick={() => {}}
            className='block w-2/4 rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
          >
            배송속성변경
          </button>
        </div>
      </div>
    </SectionBox>
  );
};

export default DeliveryList;
