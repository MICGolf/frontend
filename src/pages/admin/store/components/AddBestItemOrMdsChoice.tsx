import { client } from '@/api/client';
import { Input } from '@/components/Input';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

type FormValues = {
  productCode: string;
};

type Props = {
  location: 'best' | 'md_pick';
};

const AddBestItemOrMdsChoice = ({ location }: Props) => {
  const methods = useForm<FormValues>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await client.post('/promotion-products', {
        promotion_type: location,
        product_code: data.productCode,
      });

      return response;
    },
    onSuccess: () => {
      alert('등록되었습니다.');
    },
    onError: (error) => {
      console.error(error);
      alert('등록에 실패했습니다.');
    },
  });

  const handlerSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handlerSubmit)} className='mb-4 flex flex-col gap-4 text-base'>
      <div className='rounded-lg bg-white px-5 py-6'>
        <p className='mb-4 border-black px-5 pb-4 text-xl font-bold'>
          {location === 'best' ? 'Best Product' : 'Md`s Choice'}
        </p>
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
