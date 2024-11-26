import DefaultImg from '@/assets/imgs/logoText.svg';
import { Banner } from './type';
import { BestItemDataList } from './components/BestItemDataList';
import { Input } from '@/components/Input';
import { useForm } from 'react-hook-form';

const bannerListArray: Banner[] = [
  {
    id: 1,
    title: 'BestItemPage',
    subTitle: '놓치면 후회할 특별한 제안',
    eventUrl: 'http://localhost:5173/event/1',
    image: DefaultImg,
    isActive: true,
  },
  {
    id: 2,
    title: 'BestItemPage',
    subTitle: '놓치면 후회할 특별한 제안',
    eventUrl: 'http://localhost:5173/event/2',
    image: DefaultImg,
    isActive: true,
  },
  {
    id: 3,
    title: 'BestItemPage',
    subTitle: '놓치면 후회할 특별한 제안',
    eventUrl: 'http://localhost:5173/event/3',
    image: DefaultImg,
    isActive: true,
  },
];

const BestItemPage = () => {
  const methods = useForm();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const handlerSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className='rounded-lg bg-white py-6 text-base'>
        <p className='mb-4 border-black px-5 pb-4 text-xl font-bold'>배너</p>
        <form onSubmit={handleSubmit(handlerSubmit)} className='px-5'>
          <div className='flex'>
            <Input
              type='text'
              label='상품 번호'
              name='productCode'
              maxLength={20}
              register={register}
              registerOptions={{ required: '최대 20자, 메인 노출 텍스트를 작성하세요' }}
              error={errors.productCode?.message}
            />
          </div>
        </form>
      </div>
      <BestItemDataList data={bannerListArray} />
    </>
  );
};

export default BestItemPage;
