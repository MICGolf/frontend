import ListHeader from '@/pages/admin/components/ListHeader';
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
const saleListArray = [
  {
    orderNumber: '주문번호',
    productOrderNumber: '상품주문번호',
    orderDate: '주문일시',
    orderStatus: '주문상태',
    deliveryAttributes: '배송속성',
    claimStatus: '클레임상태',
    productNumber: '상품번호',
    productName: '상품명',
    optionInfo: '옵션정보',
  },
];
const SaleList = () => {
  return (
    <SectionBox title={`상품목록 총(${saleListArray.length}개)`}>
      <div className='px-5'>
        <ListHeader HeaderListArray={ListHeaderArray} />
        <div>
          {saleListArray.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-stretch justify-items-center self-stretch border-b border-neutral-200 py-3 text-center'
            >
              <div className='basis-full'>{item.orderNumber}</div>
              <div className='basis-full'>{item.productOrderNumber}</div>
              <div className='basis-full'>{item.orderDate}</div>
              <div className='basis-full'>{item.orderStatus}</div>
              <div className='basis-full'>{item.deliveryAttributes}</div>
              <div className='basis-full'>{item.claimStatus}</div>
              <div className='basis-full'>{item.productNumber}</div>
              <div className='basis-full'>{item.productName}</div>
              <div className='basis-full'>{item.optionInfo}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionBox>
  );
};

export default SaleList;
