import ListHeader from '../../components/ListHeader';
import { SectionBox } from '../../components/SectionBox';
import { useState } from 'react';
import { ProductListProps, ProductListType } from '../type';
import Pagination from '../../components/Pagination';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/api';
import { useNavigate } from 'react-router-dom';

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

const ProductList = ({
  productListArray,
  handleShowPopup,
  page,
  setPage,
  pageLimit,
  setPageLimit,
  isPending,
  error,
  setQuantitPopupData,
  setSearchParams,
}: ProductListProps) => {
  const productList = productListArray?.products;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [checkedList, setCheckedList] = useState<ProductListType[]>([]);
  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productFilterData'] });
      alert('상품이 삭제되었습니다.');
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      alert('상품 삭제에 실패했습니다.');
    },
  });
  const patchStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number[]; status: string }) => adminApi.patchProductsStatus(id, status),
    onSuccess: () => {
      alert('상품상태가 변경되었습니다.');
      navigate(0);
    },
    onError: (error) => {
      console.error('상태변경 실패:', error);
      alert('상태변경에 실패했습니다.');
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };
  const handlePatchStatus = (id: number[], status: string) => {
    patchStatusMutation.mutate({ id, status });
  };

  const handleChangeClick = (product: ProductListType) => {
    navigate('/admin/product/add', { state: { editingData: product } });
  };

  return (
    <SectionBox
      title={`주문목록 총(${productList?.length}개)`}
      selectOptions={true}
      pageLimit={pageLimit}
      setPageLimit={setPageLimit}
      setSearchParams={setSearchParams}
    >
      <div className='px-5'>
        <ListHeader
          HeaderListArray={ListHeaderArray}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          listArray={productList}
        />
        <div>
          {!productList && <div className='mt-5 text-base text-center text-neutral-500'>상품이 없습니다.</div>}
          {isPending && <div>Loading...</div>}
          {error && <div>An error has occurred: {error.message}</div>}
          {productList &&
            productList.map((item, index) => (
              <div
                key={index}
                className='flex items-center self-stretch py-3 text-center border-b justify-stretch justify-items-center border-neutral-200'
              >
                <div className='flex items-center justify-center w-1/12'>
                  <input
                    type='checkbox'
                    checked={checkedList.some((checkedItem) => checkedItem.product.id === item.product.id)}
                    onChange={() => {
                      if (checkedList.some((checkedItem) => checkedItem.product.id === item.product.id)) {
                        setCheckedList(checkedList.filter((checkedItem) => checkedItem.product.id !== item.product.id));
                      } else {
                        setCheckedList([...checkedList, item]);
                      }
                    }}
                  />
                </div>
                <div className='flex items-center justify-center w-2/12'>
                  <button
                    type='button'
                    onClick={() => handleChangeClick(item)}
                    className='block w-3/4 px-4 py-2 text-base text-white duration-300 ease-in-out bg-blue-500 rounded-md hover:scale-105'
                  >
                    수정
                  </button>
                </div>
                <div className='flex items-center justify-center w-2/12'>
                  <button
                    type='button'
                    onClick={() => handleDelete(item.product.id)}
                    className='block w-3/4 px-4 py-2 text-base text-white duration-300 ease-in-out bg-red-500 rounded-md hover:scale-105'
                  >
                    삭제
                  </button>
                </div>
                <div className='w-4/12'>{item.product.id}</div>
                <div className='w-4/12'>{item.product.product_code}</div>
                <div className='w-4/12'>{item.product.name}</div>

                <div className='w-2/12'>{item.product.status === 'Y' ? '판매중' : '판매중지'}</div>
                <div className='w-2/12'>
                  <button
                    type='button'
                    onClick={() => {
                      setQuantitPopupData(item);
                      handleShowPopup();
                    }}
                    className='block rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
                  >
                    재고확인
                  </button>
                </div>
                <div className='w-2/12'>
                  {item.product.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <div className='w-2/12'>
                  {item.product.discount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  {item.product.discount_option === 'percent' ? '%' : '원'}
                </div>
                <div className='w-2/12'>
                  {(item.product.price - item.product.discount)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                </div>
              </div>
            ))}
        </div>
        <div className='flex justify-start gap-2 mt-5'>
          <button
            type='button'
            onClick={() => {
              if (checkedList.length === 0) {
                alert('상품을 선택해주세요.');
                return;
              }
              handlePatchStatus(
                checkedList.map((item) => item.product.id),
                'N'
              );
            }}
            className='block w-1/4 rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
          >
            판매중지
          </button>
          <button
            type='button'
            onClick={() => {
              if (checkedList.length === 0) {
                alert('상품을 선택해주세요.');
                return;
              }
              handlePatchStatus(
                checkedList.map((item) => item.product.id),
                'Y'
              );
            }}
            className='block w-1/4 rounded-md border-[1px] border-neutral-200 bg-white px-4 py-2 text-base text-black duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
          >
            판매중
          </button>
        </div>
        <Pagination total={productListArray && productListArray.total_count} page={page} setPage={setPage} />
      </div>
    </SectionBox>
  );
};

export default ProductList;
