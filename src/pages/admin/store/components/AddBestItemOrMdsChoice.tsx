import { Input } from '@/components/Input';
import { useForm } from 'react-hook-form';

type FormValues = {
  productCode: string;
};

const AddBestItemOrMdsChoice = () => {
  const methods = useForm<FormValues>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const handlerSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handlerSubmit)} className='mb-4 flex flex-col gap-4 text-base'>
      <div className='rounded-lg bg-white px-5 py-6'>
        <p className='mb-4 border-black px-5 pb-4 text-xl font-bold'>배너</p>
        <div className='flex'>
          <Input
            type='text'
            label='상품 번호'
            name='productCode'
            maxLength={20}
            register={register}
            registerOptions={{ required: '상품 코드를 작성하세요.' }}
            error={errors.productCode?.message}
          />
        </div>
      </div>
      <button type='submit' className='bg-primary px-4 py-3 text-secondary'>
        등록하기
      </button>
    </form>
  );
};

export default AddBestItemOrMdsChoice;
