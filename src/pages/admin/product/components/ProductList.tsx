import ListHeader from '../../components/ListHeader';
import { SectionBox } from '../../components/SectionBox';
import { useState, useEffect } from 'react';
import { ProductListType } from '../type';

const ListHeaderArray = [
  { className: 'w-1/12', title: '체크박스' },
  { className: 'w-2/12', title: '수정' },
  { className: 'w-2/12', title: '삭제' },
  { className: 'w-4/12', title: '상품번호' },
  { className: 'w-4/12', title: '상품코드' },
  { className: 'w-4/12', title: '상품명' },
  { className: 'w-2/12', title: '판매상태' },
  { className: 'w-2/12', title: '재고수량' },
  { className: 'w-2/12', title: '상품가' },
  { className: 'w-2/12', title: '할인' },
  { className: 'w-2/12', title: '판매가' },
];
const productListArray: ProductListType[] = [
  {
    id: 1,
    productNumber: '수정불가능한상품코드',
    productCode: '상품번호',
    productName: '상품명',
    saleStatus: false,
    displayStatus: false,
    salePrice: 10000,
    discount: '100%',
    discountPrice: 0,
  },
];

const ProductList = ({ handleShowPopup }: { handleShowPopup: () => void }) => {
  const [checkedList, setCheckedList] = useState<ProductListType[]>([]);

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
                />
              </div>
              <div className='flex w-2/12 items-center justify-center'>
                <button
                  type='button'
                  onClick={() => {}}
                  className='block w-3/4 rounded-md bg-blue-500 px-4 py-2 text-base text-white duration-300 ease-in-out hover:scale-105'
                >
                  수정
                </button>
              </div>
              <div className='flex w-2/12 items-center justify-center'>
                <button
                  type='button'
                  onClick={() => {}}
                  className='block w-3/4 rounded-md bg-red-500 px-4 py-2 text-base text-white duration-300 ease-in-out hover:scale-105'
                >
                  삭제
                </button>
              </div>
              <div className='w-4/12'>{item.productNumber}</div>
              <div className='w-4/12'>{item.productCode}</div>
              <div className='w-4/12'>{item.productName}</div>

              <div className='w-2/12'>{item.saleStatus ? '판매중' : '판매중지'}</div>
              <div className='w-2/12'>
                <button
                  type='button'
                  onClick={() => {
                    handleShowPopup();
                  }}
                  className='block rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
                >
                  재고확인
                </button>
              </div>
              <div className='w-2/12'>{item.salePrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</div>
              <div className='w-2/12'>{item.discount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</div>
              <div className='w-2/12'>
                {item.discountPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
          ))}
        </div>
        <div className='mt-5 flex justify-start gap-2'>
          <button
            type='button'
            onClick={() => {}}
            className='block w-1/4 rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
          >
            판매중지
          </button>
          <button
            type='button'
            onClick={() => {}}
            className='block w-1/4 rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
          >
            판매중
          </button>
        </div>
      </div>
    </SectionBox>
  );
};

export default ProductList;
