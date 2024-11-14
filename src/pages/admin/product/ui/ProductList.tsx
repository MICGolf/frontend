import Checkbox from '@/components/checkbox/Checkbox';
import ListHeader from '../../ui/ListHeader';
import { SectionBox } from '../../ui/SectionBox';
import Button from '@/components/Button';
import { useState, useEffect } from 'react';

const ListHeaderArray = [
  { className: 'w-1/12', title: '체크박스' },
  { className: 'w-2/12', title: '수정' },
  { className: 'w-2/12', title: '삭제' },
  { className: 'w-4/12', title: '상품번호' },
  { className: 'w-4/12', title: '상품코드' },
  { className: 'w-4/12', title: '상품명' },
  { className: 'w-2/12', title: '판매상태' },
  { className: 'w-2/12', title: '전시상태' },
  { className: 'w-2/12', title: '재고수량' },
  { className: 'w-2/12', title: '상품가' },
  { className: 'w-2/12', title: '할인' },
  { className: 'w-2/12', title: '판매가' },
];
const productListArray = [
  {
    id: 1,
    productNumber: '수정불가능한상품코드',
    productCode: '상품번호',
    productName: '상품명',
    saleStatus: false,
    displayStatus: false,
    stockQuantity: 10,
    salePrice: 10000,
    discountPrice: 10000,
    discount: '100%',
  },
  {
    id: 2,
    productNumber: '수정불가능한상품코드',
    productCode: '상품번호',
    productName: '상품명',
    saleStatus: false,
    displayStatus: false,
    stockQuantity: 10,
    salePrice: 10000,
    discountPrice: 10000,
    discount: '100%',
  },
];
const ProductList = () => {
  const [checkedList, setCheckedList] = useState<{ id: number; productNumber: string }[]>([]);

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
                <Checkbox
                  checked={checkedList.some((checkedItem) => checkedItem.id === item.id)}
                  onChange={() => {
                    if (checkedList.some((checkedItem) => checkedItem.id === item.id)) {
                      setCheckedList(checkedList.filter((checkedItem) => checkedItem.id !== item.id));
                    } else {
                      setCheckedList([...checkedList, { id: item.id, productNumber: item.productNumber }]);
                    }
                  }}
                  disabled={false}
                />
              </div>
              <div className='flex w-2/12 items-center justify-center'>
                <Button title='수정' onClick={() => {}} className='w-3/4' color='bg-blue-500 text-white' />
              </div>
              <div className='flex w-2/12 items-center justify-center'>
                <Button title='삭제' onClick={() => {}} className='w-3/4' color='bg-red-500 text-white' />
              </div>
              <div className='w-4/12'>{item.productNumber}</div>
              <div className='w-4/12'>{item.productCode}</div>
              <div className='w-4/12'>{item.productName}</div>

              <div className='w-2/12'>{item.saleStatus ? '판매중' : '판매중지'}</div>
              <div className='w-2/12'>{item.displayStatus ? '전시중' : '전시중지'}</div>
              <div className='w-2/12'>
                {item.stockQuantity.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              </div>
              <div className='w-2/12'>{item.salePrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</div>
              <div className='w-2/12'>{item.discount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</div>
              <div className='w-2/12'>
                {item.discountPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
          ))}
        </div>
        <div className='mt-5 flex w-1/2 justify-end gap-2'>
          <Button
            title='판매중지'
            onClick={() => {}}
            className='w-1/4 border-[1px] border-neutral-200 hover:bg-black hover:text-white'
            color='bg-white text-black'
          />
          <Button
            title='판매중'
            onClick={() => {}}
            className='w-1/4 border-[1px] border-neutral-200 hover:bg-black hover:text-white'
            color='bg-white text-black'
          />
          <Button
            title='전시중지'
            onClick={() => {}}
            className='w-1/4 border-[1px] border-neutral-200 hover:bg-black hover:text-white'
            color='bg-white text-black'
          />
          <Button
            title='전시중'
            onClick={() => {}}
            className='w-1/4 border-[1px] border-neutral-200 hover:bg-black hover:text-white'
            color='bg-white text-black'
          />
        </div>
      </div>
    </SectionBox>
  );
};

export default ProductList;
