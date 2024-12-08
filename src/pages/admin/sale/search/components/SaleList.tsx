import ListHeader from '@/pages/admin/components/ListHeader';
import Pagination from '@/pages/admin/components/Pagination';
import { SectionBox } from '@/pages/admin/components/SectionBox';

const ListHeaderArray = [
  { className: 'basis-full', title: '주문번호' },
  { className: 'basis-full', title: '상품주문번호' },
  { className: 'basis-full', title: '주문일시' },
  { className: 'basis-full', title: '주문상태' },
  { className: 'basis-full', title: '배송속성' },
  { className: 'basis-full', title: '클레임상태' },
  { className: 'basis-full', title: '상품번호' },
  { className: 'basis-full', title: '상품명' },
  { className: 'basis-full', title: '옵션정보' },
];

const SaleList = ({
  orderSearchData,
  page,
  setPage,
  pageLimit,
  setPageLimit,
  isPending,
  error,
  setSearchParams,
}: any) => {
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
  const orderSearchOrders = orderSearchData?.orders ? orderSearchData?.orders : undefined;
  return (
    <SectionBox
      title={`상품목록 총(${orderSearchOrders?.length}개)`}
      selectOptions={true}
      pageLimit={pageLimit}
      setPageLimit={setPageLimit}
      setSearchParams={setSearchParams}
    >
      <div className='px-5'>
        <ListHeader HeaderListArray={ListHeaderArray} />
        <div>
          {orderSearchOrders &&
            orderSearchOrders.map((order: any) => {
              if (orderSearchOrders.length === 0 || orderSearchOrders == undefined) return <p>주문이 없습니다.</p>;
              return (
                <div
                  key={order.id}
                  className='flex items-center justify-stretch justify-items-center self-stretch border-b border-neutral-200 py-3 text-center'
                >
                  <div className='basis-full'>{order.order_number}</div>
                  <div className='basis-full'>{order.productOrderNumber}</div>
                  <div className='basis-full'>{formatDate(order.created_at)}</div>
                  <div className='basis-full'>{order.order_status}</div>
                  <div className='basis-full'>{order.deliveryAttributes}</div>
                  <div className='basis-full'>{order.claimStatus ? order.claimStatus : '-'}</div>
                  <div className='basis-full'>{order.productNumber}</div>
                  <div className='basis-full'>{order.productName}</div>
                  <div className='basis-full'>{order.optionInfo}</div>
                </div>
              );
            })}
        </div>
        <Pagination total={orderSearchData && orderSearchData.total} page={page} setPage={setPage} />
      </div>
    </SectionBox>
  );
};

export default SaleList;
