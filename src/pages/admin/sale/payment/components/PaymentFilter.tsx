import { useForm, FormProvider } from 'react-hook-form';
import DatePickInputs from '@/pages/admin/components/DatePickInputs';

const SaleFilter = () => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const handlerSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form className='mt-6 grid grid-cols-6 rounded-lg bg-white px-8 py-5' onSubmit={handleSubmit(handlerSubmit)}>
        <p className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>조회기간</p>
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
