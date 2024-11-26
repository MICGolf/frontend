import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';
import DatePickInputs from '@/pages/admin/components/DatePickInputs';
import CategorySelcet from '@/pages/admin/components/CategorySelcet';
import { ProductFilterFormData, ProductFilterProps } from '../type';

const ProductFilter = ({ setSearchParams, onSubmit, pageLimit }: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm<ProductFilterFormData>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  const handlerSubmit = (data: ProductFilterFormData) => {
    const searchParamsData = new URLSearchParams();
    if (data.productName) searchParamsData.append('product_name', data.productName);
    if (data.productNumber) searchParamsData.append('product_id', data.productNumber);
    if (data.sellerProductCode) searchParamsData.append('product_code', data.sellerProductCode);
    if (data.productStatus === 'Y' || data.productStatus === 'N') {
      searchParamsData.append('sale_status', data.productStatus);
    } else {
      searchParamsData.delete('sale_status');
    }
    if (data.category_id) searchParamsData.append('category_id', data.category_id);
    if (data.startDate) searchParamsData.append('start_date', data.startDate);
    if (data.endDate) searchParamsData.append('end_date', data.endDate);

    searchParamsData.append('page', '1');
    searchParamsData.append('page_size', String(pageLimit));
    searchParamsData.append('sort', 'created_at');
    setSearchParams(searchParamsData);
    onSubmit();
  };

  return (
    <FormProvider {...methods}>
      <form className='mt-6 grid grid-cols-6 rounded-lg bg-white px-8 py-5' onSubmit={handleSubmit(handlerSubmit)}>
        <div className='col-span-6'>
          <label htmlFor='productNumber' className='col-span-6 grid grid-cols-6 items-center gap-4'>
            <p className='col-span-1 mt-4 text-base font-semibold text-neutral-500'>상품번호</p>
            <input
              type='number'
              placeholder='상품번호'
              {...(register('productNumber'),
              {
                valueAsNumber: true,
              })}
              className='col-span-5 mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
            />
          </label>
          <label htmlFor='productName' className='col-span-6 grid grid-cols-6 items-center gap-4'>
            <p className='col-span-1 mt-4 text-base font-semibold text-neutral-500'>상품명</p>
            <input
              type='text'
              placeholder='상품명'
              {...register('productName')}
              className='col-span-5 mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
            />
          </label>

          <label htmlFor='sellerProductCode' className='col-span-6 grid grid-cols-6 items-center gap-4'>
            <p className='col-span-1 mt-4 text-base font-semibold text-neutral-500'>판매자 상품코드</p>
            <input
              type='text'
              placeholder='판매자 상품코드'
              {...register('sellerProductCode')}
              className='col-span-5 mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
            />
          </label>

          <p className='flex items-center text-sm text-red-500'>{errors.productName?.message as string}</p>
        </div>
        <p className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>판매상태</p>
        <div className='col-span-5 flex items-center gap-4'>
          <select
            {...register('productStatus')}
            className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
            style={{
              backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
            }}
            onClick={(prev) => setIsOpen(!prev)}
          >
            <option value='ALL'>전체</option>
            <option value='Y'>판매중</option>
            <option value='N'>판매중지</option>
          </select>
        </div>
        <p className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>카테고리</p>
        <CategorySelcet />
        <p className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>
          기간 <span className='ml-1 text-xs text-neutral-400'>등록일 기준</span>
        </p>
        <div className='col-span-5'>
          <DatePickInputs />
        </div>
        <div className='col-span-6 mt-4 flex w-full justify-center gap-4'>
          <button
            type='submit'
            className='mt-4 block w-1/3 rounded-md bg-primary px-4 py-2 text-base text-white duration-300 ease-in-out hover:scale-105'
          >
            검색
          </button>
          <button
            onClick={() => {
              reset();
            }}
            type='submit'
            className='mt-4 block w-1/3 rounded-md border border-neutral-300 px-4 py-2 text-base text-neutral-900 duration-300 ease-in-out hover:scale-105'
          >
            초기화
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductFilter;
