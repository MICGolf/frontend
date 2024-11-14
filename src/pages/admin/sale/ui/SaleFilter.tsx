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
      <form className='mt-6 grid grid-cols-6 rounded-lg bg-white px-8 py-5' onSubmit={handleSubmit(handlerSubmit)}>
        <p className='col-span-1 mt-4 text-base font-semibold text-neutral-500'>조회기간</p>
        <div className='col-span-5'>
          <DatePickInputs />
        </div>
        <p className='col-span-1 mt-4 text-base font-semibold text-neutral-500'>상세검색</p>
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
            <option value='sale'>판매중</option>
            <option value='stop'>판매중지</option>
          </select>
          <Input type='text' placeholder='검색어' register={register('searchKeyword')} />
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
    </FormProvider>
  );
};

export default SaleFilter;
