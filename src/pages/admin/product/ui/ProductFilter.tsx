import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { useForm } from 'react-hook-form';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';
import { useEffect, useState } from 'react';

const ProductFilter = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);
  const [isOpen, setIsOpen] = useState(false);
  const dateWatch = watch('date');
  const startDateWatch = watch('startDate');
  const handlerSubmit = (data: any) => console.log(data);

  useEffect(() => {
    if (dateWatch) {
      const startDate = new Date(startDateWatch);
      switch (dateWatch) {
        case 'year':
          const endDateYear = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
          setValue('endDate', endDateYear.toISOString().split('T')[0]);
          break;
        case 'month':
          const endDateMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
          setValue('endDate', endDateMonth.toISOString().split('T')[0]);
          break;
        case 'week':
          const endDateWeek = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);
          setValue('endDate', endDateWeek.toISOString().split('T')[0]);
          break;
      }
    }
  }, [dateWatch, startDateWatch]);
  return (
    <form className='mt-6 grid grid-cols-6 rounded-lg bg-white px-8 py-5' onSubmit={handleSubmit(handlerSubmit)}>
      <p className='col-span-1 mt-4 text-base font-semibold text-neutral-500'>상품명</p>
      <div className='col-span-5'>
        <div className='flex items-center gap-4'>
          <Input
            type='text'
            placeholder='상품번호'
            register={register('productNumber', {
              required: '상품번호를 입력해주세요.',
            })}
          />
          <Input
            type='text'
            placeholder='상품명'
            register={register('productName', {
              required: '상품명을 입력해주세요.',
            })}
          />
          <Input type='text' placeholder='판매자 상품코드' register={register('sellerProductCode')} />
        </div>
        <p className='text-sm text-red-500'>{errors.productName?.message as string}</p>
      </div>

      <p className='col-span-1 mt-4 text-base font-semibold text-neutral-500'>판매상태</p>
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
      <p className='col-span-1 mt-4 text-base font-semibold text-neutral-500'>카테고리</p>
      <div className='col-span-5 flex items-center gap-4'>
        <select
          {...register('categoryLarge')}
          className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
          style={{
            backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
          }}
          onClick={(prev) => setIsOpen(!prev)}
          defaultValue=''
        >
          <option value='' disabled>
            대분류
          </option>
        </select>
        <select
          {...register('categoryMiddle')}
          className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
          style={{
            backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
          }}
          onClick={(prev) => setIsOpen(!prev)}
          defaultValue=''
        >
          <option value='' disabled>
            중분류
          </option>
        </select>
        <select
          {...register('categorySmall')}
          className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
          style={{
            backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
          }}
          onClick={(prev) => setIsOpen(!prev)}
          defaultValue=''
        >
          <option value='' disabled>
            소분류
          </option>
        </select>
      </div>
      <p className='col-span-1 mt-4 text-base font-semibold text-neutral-500'>
        기간 <span className='text-xs text-neutral-400'>등록일 기준</span>
      </p>
      <div className='col-span-5 flex items-center gap-4'>
        <select
          {...register('date')}
          className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
          style={{
            backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
          }}
          onClick={(prev) => setIsOpen(!prev)}
          defaultValue='custom'
        >
          <option value='custom'>직접선택</option>
          <option value='year'>1년</option>
          <option value='month'>1달</option>
          <option value='week'>1주</option>
        </select>
        <input
          type='date'
          defaultValue={today}
          {...register('startDate')}
          className='mt-4 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
          onChange={(e) => {
            const newStartDate = new Date(e.target.value);
            setValue('startDate', newStartDate.toISOString().split('T')[0]);
          }}
        />
        <input
          type='date'
          defaultValue={today}
          {...register('endDate')}
          className='mt-4 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
          onChange={(e) => {
            const newEndDate = new Date(e.target.value);
            setValue('endDate', newEndDate.toISOString().split('T')[0]);
          }}
        />
      </div>
      <div className='col-span-6 mt-4 flex w-full justify-center gap-4'>
        <Button type='submit' title='검색' className='mt-4 w-1/3' />
        <Button
          type='button'
          title='초기화'
          onClick={() => {
            reset();
          }}
          color='white'
          className='mt-4 w-1/3 border border-neutral-300 text-neutral-900'
        />
      </div>
    </form>
  );
};

export default ProductFilter;
