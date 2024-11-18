import { useState, useEffect } from 'react';
import { SectionBox } from '@/pages/admin/components/SectionBox';
import ListHeader from '@/pages/admin/components/ListHeader';
import { PaymentListType } from '../type';

const ListHeaderArray = [
  { className: 'w-1/12', title: '체크박스' },
  { className: 'basis-full', title: '주문번호' },
  { className: 'basis-full', title: '상품주문번호' },
  { className: 'basis-full', title: '주문일자' },
  { className: 'basis-full', title: '주문상태' },
  { className: 'basis-full', title: '입금기한' },
  { className: 'basis-full', title: '상품번호' },
  { className: 'basis-full', title: '상품명' },
  { className: 'basis-full', title: '옵션정보' },
];
const productListArray: PaymentListType[] = [
  {
    id: 1,
    orderNumber: '주문번호',
    productOrderNumber: '상품주문번호',
    orderDate: '주문일자',
    orderStatus: '주문상태',
    depositDueDate: '입금기한',
    productNumber: '상품번호',
    productName: '상품명',
    optionInfo: '옵션정보',
  },
  {
    id: 2,
    orderNumber: '주문번호',
    productOrderNumber: '상품주문번호',
    orderDate: '주문일자',
    orderStatus: '주문상태',
    depositDueDate: '입금기한',
    productNumber: '상품번호',
    productName: '상품명',
    optionInfo: '옵션정보',
  },
];
const ProductList = () => {
  const [checkedList, setCheckedList] = useState<PaymentListType[]>([]);

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
              <div className='basis-full'>{item.depositDueDate}</div>
              <div className='basis-full'>{item.productNumber}</div>
              <div className='basis-full'>{item.productName}</div>
              <div className='basis-full'>{item.optionInfo}</div>
            </div>
          ))}
        </div>
        <div className='mt-5 flex justify-center gap-5'>
          <button
            type='button'
            onClick={() => {}}
            className='block w-2/4 rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
          >
            판매자 주문취소
          </button>
        </div>
      </div>
    </SectionBox>
  );
};

export default ProductList;
