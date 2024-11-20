import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getAdminProduct } from '@/api/adminAxois';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';
import DatePickInputs from '@/pages/admin/components/DatePickInputs';
import CategorySelcet from '@/pages/admin/components/CategorySelcet';

const category = {
  categoryLargeArray: ['대분류1', '대분류2', '대분류3'],
  categoryMiddleArray: ['중분류1', '중분류2', '중분류3'],
  categorySmallArray: ['소분류1', '소분류2', '소분류3'],
};

const ProductFilter = () => {
  const methods = useForm();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  const handlerSubmit = (data: any) => console.log(data);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending, error } = useQuery({ queryKey: ['adminProductFilter'], queryFn: getAdminProduct });
  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  return (
    <FormProvider {...methods}>
      <form className='mt-6 grid grid-cols-6 rounded-lg bg-white px-8 py-5' onSubmit={handleSubmit(handlerSubmit)}>
        <p className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>검색어</p>
        <div className='col-span-5'>
          <div className='flex items-center gap-4'>
            <input
              type='text'
              placeholder='상품번호'
              {...register('productNumber')}
              className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
            />
            <input
              type='text'
              placeholder='상품명'
              {...register('productName')}
              className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
            />
            <input
              type='text'
              placeholder='판매자 상품코드'
              {...register('sellerProductCode')}
              className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
            />
          </div>
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
            <option value='all'>전체</option>
            <option value='sale'>판매중</option>
            <option value='stop'>판매중지</option>
          </select>
        </div>
        <p className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>카테고리</p>
        <CategorySelcet
          categoryLargeArray={category.categoryLargeArray}
          categoryMiddleArray={category.categoryMiddleArray}
          categorySmallArray={category.categorySmallArray}
        />
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
            type='button'
            onClick={() => {
              reset();
            }}
            color='white'
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
