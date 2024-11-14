import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
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

  return (
    <FormProvider {...methods}>
      <form className='grid grid-cols-6 px-8 py-5 mt-6 bg-white rounded-lg' onSubmit={handleSubmit(handlerSubmit)}>
        <p className='flex items-center col-span-1 mt-4 text-base font-semibold text-neutral-500'>검색어</p>
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
        <p className='flex items-center col-span-1 mt-4 text-base font-semibold text-neutral-500'>판매상태</p>
        <div className='flex items-center col-span-5 gap-4'>
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
        <p className='flex items-center col-span-1 mt-4 text-base font-semibold text-neutral-500'>카테고리</p>
        <CategorySelcet
          categoryLargeArray={category.categoryLargeArray}
          categoryMiddleArray={category.categoryMiddleArray}
          categorySmallArray={category.categorySmallArray}
        />
        <p className='flex items-center col-span-1 mt-4 text-base font-semibold text-neutral-500'>
          기간 <span className='ml-1 text-xs text-neutral-400'>등록일 기준</span>
        </p>
        <div className='col-span-5'>
          <DatePickInputs />
        </div>
        <div className='flex justify-center w-full col-span-6 gap-4 mt-4'>
          <button
            type='submit'
            className='block w-1/3 px-4 py-2 mt-4 text-base text-white duration-300 ease-in-out rounded-md bg-primary hover:scale-105'
          >
            검색
          </button>
          <button
            type='button'
            onClick={() => {
              reset();
            }}
            color='white'
            className='block w-1/3 px-4 py-2 mt-4 text-base duration-300 ease-in-out border rounded-md border-neutral-300 text-neutral-900 hover:scale-105'
          >
            초기화
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductFilter;
