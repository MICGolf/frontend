import { useState, useEffect } from 'react';
import { SectionBox } from '@/pages/admin/components/SectionBox';
import ListHeader from '@/pages/admin/components/ListHeader';
import { DeliveryListType } from '../type';

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

  useEffect(() => {
    console.log(checkedList);
  }, [checkedList]);
  return (
    <SectionBox title={`상품목록 총(${productListArray.length}개)`}>
      <div className='px-5'>
        <ListHeader
          HeaderListArray={ListHeaderArray}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          listArray={productListArray}
        />
        <div>
          {productListArray.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-stretch justify-items-center self-stretch border-b border-neutral-200 py-3 text-center'
            >
              <div className='flex w-1/12 items-center justify-center'>
                <input
                  type='checkbox'
                  checked={checkedList.some((checkedItem) => checkedItem.id === item.id)}
                  onChange={() => {
                    if (checkedList.some((checkedItem) => checkedItem.id === item.id)) {
                      setCheckedList(checkedList.filter((checkedItem) => checkedItem.id !== item.id));
                    } else {
                      setCheckedList([...checkedList, item]);
                    }
                  }}
                  disabled={false}
                />
              </div>

              <div className='basis-full'>{item.orderNumber}</div>
              <div className='basis-full'>{item.productOrderNumber}</div>
              <div className='basis-full'>{item.orderDate}</div>
              <div className='basis-full'>{item.orderStatus}</div>
              <div className='basis-full'>{item.claimStatus}</div>
              <div className='basis-full'>{item.deliveryCompany}</div>
              <div className='basis-full'>{item.invoiceNumber}</div>
            </div>
          ))}
        </div>
        <div className='mt-5 flex justify-center gap-5'>
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
