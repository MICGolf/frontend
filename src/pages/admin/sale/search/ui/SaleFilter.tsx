import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';
import DatePickInputs from '@/components/DatePickInputs';

const SaleFilter = () => {
  const methods = useForm();
  const { handleSubmit, register, reset } = methods;

  const handlerSubmit = (data: any) => console.log(data);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormProvider {...methods}>
      <form className='grid grid-cols-6 px-8 py-5 mt-6 bg-white rounded-lg' onSubmit={handleSubmit(handlerSubmit)}>
        <p className='col-span-1 mt-4 text-base font-semibold text-neutral-500'>조회기간</p>
        <div className='col-span-5'>
          <DatePickInputs />
        </div>
        <p className='col-span-1 mt-4 text-base font-semibold text-neutral-500'>상세검색</p>
        <div className='flex items-center col-span-5 gap-4'>
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
            <option value='recipientName'>수취인명</option>
            <option value='buyerName'>구매자명</option>
            <option value='buyerContact'>구매자연락처</option>
            <option value='buyerId'>구매자ID</option>
            <option value='orderNumber'>주문번호</option>
            <option value='productOrderNumber'>상품주문번호</option>
            <option value='productNumber'>상품 번호</option>
            <option value='invoiceNumber'>송장번호</option>
          </select>
          <Input type='text' placeholder='검색어' register={register('searchKeyword')} />
        </div>

        <div className='flex justify-center w-full col-span-6 gap-4 mt-4'>
          <Button type='submit' title='검색' className='w-1/3 mt-4' />
          <Button
            type='button'
            title='초기화'
            onClick={() => {
              reset();
            }}
            color='white'
            className='w-1/3 mt-4 border border-neutral-300 text-neutral-900'
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default SaleFilter;
