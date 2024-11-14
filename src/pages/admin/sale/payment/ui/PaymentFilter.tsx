import Button from '@/components/Button';
import { useForm, FormProvider } from 'react-hook-form';
import DatePickInputs from '@/components/DatePickInputs';

const SaleFilter = () => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const handlerSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form className='grid grid-cols-6 px-8 py-5 mt-6 bg-white rounded-lg' onSubmit={handleSubmit(handlerSubmit)}>
        <p className='col-span-1 mt-4 text-base font-semibold text-neutral-500'>조회기간</p>
        <div className='col-span-5'>
          <DatePickInputs />
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
