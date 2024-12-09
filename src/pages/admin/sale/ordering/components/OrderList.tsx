import { SectionBox } from '@/pages/admin/components/SectionBox';
import ListHeader from '@/pages/admin/components/ListHeader';
import { OrderingListType } from '../type';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { orderApi } from '@/api';
// import Pagination from '@/pages/admin/components/Pagination';
// import { useSearchParams } from 'react-router-dom';

const ListHeaderArray = [
  { className: 'w-1/12', title: '체크박스' },
  { className: 'basis-full', title: '주문번호' },
  { className: 'basis-full', title: '상품주문번호' },
  { className: 'basis-full', title: '발주상태' },
  { className: 'basis-full', title: '택배사' },
  { className: 'basis-full', title: '송장번호' },
];
const OrderingList = ({
  handleShowPopup,
  checkedList,
  setCheckedList,
}: {
  handleShowPopup: () => void;
  checkedList: OrderingListType[];
  setCheckedList: React.Dispatch<React.SetStateAction<OrderingListType[]>>;
}) => {
  // const [page, setPage] = useState(1);
  const [pageLimit] = useState<number>(10);

  const { data: orderSearchData, refetch } = useQuery({
    queryKey: ['orderSearch'],
    queryFn: async () => {
      const response = await orderApi.getPageType('UNPAID');
      if (!response) return null;
      return response.data;
    },
  });
  useEffect(() => {
    refetch();
  }, [pageLimit, refetch]);
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`;
  };
  return (
    <SectionBox
      title={`주문목록 총(${orderSearchData?.length}개)`}
      // selectOptions={true}
      // pageLimit={pageLimit}
      // setPageLimit={setPageLimit}
    >
      <div className='px-5'>
        <ListHeader
          HeaderListArray={ListHeaderArray}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          listArray={orderSearchData}
        />

        <div>
          {orderSearchData && orderSearchData.length === 0 ? (
            <p>주문이 없습니다.</p>
          ) : (
            orderSearchData &&
            orderSearchData.map((order: any) => {
              if (orderSearchData.length === 0) return <p>주문이 없습니다.</p>;
              if (order.products.length === 0) return console.log('주문상태에 상품이 포함되어있지 않음');
              order.products.map((order: any) => {
                return (
                  <div
                    key={order.id}
                    className='flex items-center self-stretch py-3 text-center border-b justify-stretch justify-items-center border-neutral-200'
                  >
                    <div className='flex items-center justify-center w-1/12'>
                      <input
                        type='checkbox'
                        checked={checkedList.some((checkedItem) => checkedItem.id === order.id)}
                        onChange={() => {
                          if (checkedList.some((checkedItem) => checkedItem.id === order.id)) {
                            setCheckedList(checkedList.filter((checkedItem) => checkedItem.id !== order.id));
                          } else {
                            setCheckedList([...checkedList, order]);
                          }
                        }}
                        disabled={false}
                      />
                    </div>

                    <div className='basis-full'>{order.order_number}</div>
                    <div className='basis-full'>{order.products.id}</div>
                    <div className='basis-full'>{formatDate(order.created_at)}</div>
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
            type='button'
            onClick={() => {}}
            className='block w-2/4 rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
          >
            발주확인
          </button>
          <button
            type='button'
            onClick={() => {}}
            className='block w-2/4 rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
          >
            발송처리
          </button>
          <button
            type='button'
            onClick={() => {}}
            className='block w-2/4 rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
          >
            발송지연처리
          </button>
          <button
            type='button'
            onClick={() => {}}
            className='block w-2/4 rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
          >
            판매자 취소 처리
          </button>

          <button
            type='button'
            onClick={handleShowPopup}
            className={`${checkedList.length === 0 ? 'cursor-not-allowed opacity-50' : ''} block w-2/4 rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white`}
            disabled={checkedList.length === 0}
            title={checkedList.length === 0 ? '상품을 선택해주세요' : ''}
          >
            송장입력
          </button>
          <button
            type='button'
            onClick={handleShowPopup}
            className={`${checkedList.length === 0 ? 'cursor-not-allowed opacity-50' : ''} block w-2/4 rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white`}
            disabled={checkedList.length === 0}
            title={checkedList.length === 0 ? '상품을 선택해주세요' : ''}
          >
            송장수정
          </button>
        </div>
        {/* <Pagination total={orderSearchData && orderSearchData.total} page={page} setPage={setPage} /> */}
      </div>
    </SectionBox>
  );
};

export default OrderingList;
