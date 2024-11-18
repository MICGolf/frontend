import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';

const DatePickInputs = () => {
  const { watch, setValue, register } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);
  const dateWatch = watch('date');
  const startDateWatch = watch('startDate');
  useEffect(() => {
    if (dateWatch) {
      const startDate = new Date(startDateWatch);
      switch (dateWatch) {
        case 'year':
          const endDateYear = new Date(startDate.getFullYear() - 1, startDate.getMonth(), startDate.getDate());
          setValue('endDate', endDateYear.toISOString().split('T')[0]);
          break;
        case 'month':
          const endDateMonth = new Date(startDate.getFullYear(), startDate.getMonth() - 1, startDate.getDate());
          setValue('endDate', endDateMonth.toISOString().split('T')[0]);
          break;
        case 'week':
          const endDateWeek = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7);
          setValue('endDate', endDateWeek.toISOString().split('T')[0]);
          break;
      }
    }
  }, [dateWatch, startDateWatch]);
  return (
    <div className='flex items-center w-full gap-4'>
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
        className='w-full px-3 py-2 mt-4 border rounded-md border-neutral-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
        onChange={(e) => {
          const newStartDate = new Date(e.target.value);
          setValue('startDate', newStartDate.toISOString().split('T')[0]);
        }}
      />
      <input
        type='date'
        defaultValue={today}
        {...register('endDate')}
        className='w-full px-3 py-2 mt-4 border rounded-md border-neutral-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
        onChange={(e) => {
          const newEndDate = new Date(e.target.value);
          setValue('endDate', newEndDate.toISOString().split('T')[0]);
        }}
      />
    </div>
  );
};

export default DatePickInputs;
