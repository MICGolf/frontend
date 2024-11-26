import { Input } from '@/components/Input';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type BannerFormData = {
  title: string;
  subTitle: string;
  eventUrl: string;
  image: File[];
};

type locationType = 'banner' | 'promotion';

const AddBannerOrPromotion = ({ location }: { location: locationType }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  console.log(location);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<BannerFormData>();

  const handlerSubmit = (data: BannerFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('subTitle', data.subTitle);
    formData.append('eventUrl', data.eventUrl);

    if (data.image && data.image.length > 0) {
      Array.from(data.image).forEach((file) => {
        formData.append('images', file);
      });
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    switch (location) {
      case 'banner': {
        // 배너 데이터 추가 API 호출
        break;
      }
      case 'promotion': {
        // 프로모션 데이터 추가 API 호출
        break;
      }
    }
  };

  const image = watch('image');

  useEffect(() => {
    if (image && image[0]) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  return (
    <div className='rounded-lg bg-white py-6 text-base'>
      <p className='mb-4 border-black px-5 pb-4 text-xl font-bold'>배너</p>
      <form onSubmit={handleSubmit(handlerSubmit)} className='px-5'>
        <div className='flex'>
          <div className='flex w-1/2 flex-col items-center justify-center overflow-hidden rounded-md'>
            <label className='flex w-full flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 text-neutral-500 hover:bg-neutral-100'>
              {imagePreview ? (
                <img src={imagePreview} alt='믹골프 배너 이미지 미리보기' />
              ) : (
                <>
                  <Plus className='h-6 w-6' />
                  <span className='text-sm'>이미지 추가</span>
                </>
              )}

              <input
                type='file'
                accept='image/*'
                {...register('image', { required: '이미지가 등록되지 않았습니다' })}
                hidden
              />
            </label>
            <p className='mt-1 text-sm text-red-500'>{errors.image?.message}</p>
          </div>

          <div className='ml-4 flex w-1/2 flex-col gap-4'>
            <Input
              type='text'
              label='배너 제목'
              name='title'
              maxLength={20}
              register={register}
              registerOptions={{ required: '최대 20자, 메인 노출 텍스트를 작성하세요' }}
              error={errors.title?.message}
            />
            <Input
              type='text'
              label='배너 소제목'
              name='subTitle'
              maxLength={20}
              register={register}
              registerOptions={{ required: '최대 20자, 메인 노출 텍스트를 작성하세요' }}
              error={errors.subTitle?.message}
            />
            <Input
              type='text'
              label='클릭 시 이동할 이벤트 페이지 링크'
              name='eventUrl'
              maxLength={20}
              register={register}
              registerOptions={{ required: '이벤트 프로모션 게시글이 작성된 URL을 작성하세요' }}
              error={errors.eventUrl?.message}
            />
            <p className='text-right text-sm text-neutral-500'>권장 해상도 : 1920 x 1080px / JPG 권장</p>

            <div className='mt-4 flex w-full justify-center'>
              <button
                type='submit'
                className='block w-1/2 border border-primary bg-primary px-4 py-2 text-base text-secondary duration-700 ease-in-out hover:bg-secondary hover:text-primary'
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBannerOrPromotion;
