import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';
import DatePickInputs from '@/pages/admin/components/DatePickInputs';
import { ProductFilterProps } from '@/pages/admin/product/type';

const SaleFilter = ({ setSearchParams, onSubmit, pageLimit, searchParams }: ProductFilterProps) => {
  const searchParamsData = new URLSearchParams();
  const methods = useForm();
  const { handleSubmit, register, reset } = methods;
  const handlerSubmit = (data: any) => {
    console.log(searchParamsData);
    switch (data.searchType) {
      case 'orderNumber':
        searchParamsData.append('order_number', data.searchKeyword);
        break;
    }
    if (data.startDate) searchParamsData.append('start_date', data.startDate);
    if (data.endDate) searchParamsData.append('end_date', data.endDate);

    searchParamsData.append('page', '1');
    searchParamsData.append('page_size', String(pageLimit));
    searchParamsData.append('sort', 'created_at');
    setSearchParams(searchParamsData);
    onSubmit();
    console.log(data);
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormProvider {...methods}>
      <form className='mt-6 grid grid-cols-6 rounded-lg bg-white px-8 py-5' onSubmit={handleSubmit(handlerSubmit)}>
        <p className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>조회기간</p>
        <div className='col-span-5'>
          <DatePickInputs />
        </div>
        <p className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>상세검색</p>
        <div className='col-span-5 flex items-center gap-4'>
          <select
            {...register('searchType')}
            className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
            style={{
              backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
            }}
            onClick={(prev) => setIsOpen(!prev)}
            defaultValue='all'
          >
            <option value='all'>전체</option>
            <option value='orderNumber'>주문번호</option>
            <option value='productOrderNumber'>상품주문번호</option>
            <option value='productNumber'>상품 번호</option>
          </select>
          <input
            type='text'
            placeholder='검색어'
            {...register('searchKeyword')}
            className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
          />
        </div>

        <div className='col-span-6 mt-4 flex w-full justify-center gap-4'>
          <button
            type='submit'
            className='mt-4 block w-1/3 rounded-md bg-primary px-4 py-2 text-base text-white duration-300 ease-in-out hover:scale-105'
          >
            검색
          </button>
          <button
            type='button'
            onClick={() => {
              reset();
            }}
            className='mt-4 block w-1/3 rounded-md border border-neutral-300 px-4 py-2 text-base text-neutral-900 duration-300 ease-in-out hover:scale-105'
          >
            초기화
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SaleFilter;
