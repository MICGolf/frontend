import { client } from '@/api/client';
import { Input } from '@/components/Input';
import { useMutation } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Banner } from '../type';

type BannerFormData = {
  title: string;
  sub_title: string;
  event_url: string;
  image: File[];
};

type locationType = 'banner' | 'promotion';

type Props = {
  location: locationType;
  isEditing: boolean;
  editingData: Banner | null;
  onEditSubmit: () => void;
};

const AddBannerOrPromotion = ({ location, isEditing, editingData, onEditSubmit }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BannerFormData>();
  const image = watch('image');

  const mutation = useMutation<FormData, unknown, FormData>({
    mutationFn: async (formData) => {
      const url = isEditing ? `banners/${editingData?.id}` : 'banners';
      const method = isEditing ? 'patch' : 'post';
      const { data } = await client({
        url,
        method,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: (data) => {
      console.log('성공', data);
      alert(isEditing ? '수정되었습니다.' : '등록되었습니다.');
      onEditSubmit();
    },
    onError: (error) => {
      console.log('에러', error);
      alert(isEditing ? '수정에 실패했습니다.' : '등록에 실패했습니다.');
    },
  });

  const handlerSubmit = (data: BannerFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('sub_title', data.sub_title);
    formData.append('event_url', data.event_url);
    formData.append('category_type', location);

    if (data.image && data.image.length > 0) {
      Array.from(data.image).forEach((file) => {
        formData.append('image', file);
      });
    }

    console.log(formData instanceof FormData); // true여야 정상
    console.log(formData.get('image')); // 이미지 데이터가 제대로 추가되었는지 확인

    mutation.mutate(formData);
  };

  useEffect(() => {
    if (isEditing && editingData) {
      const { title, sub_title, event_url, image_url } = editingData;
      setValue('title', title);
      setValue('sub_title', sub_title);
      setValue('event_url', event_url);
      setImagePreview(image_url);
    }
  }, [isEditing, editingData, setValue]);

  useEffect(() => {
    if (image && image[0]) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  return (
    <div className='rounded-lg bg-white py-6 text-base'>
      <p className='mb-4 border-black px-5 pb-4 text-xl font-bold'>{location === 'banner' ? '배너' : '프로모션'}</p>
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
                {...register('image', {
                  required: !isEditing ? '이미지가 등록되지 않았습니다' : false, // 수정 상태일 때 필수값 제외
                })}
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
              register={register}
              registerOptions={{ required: '최대 20자, 메인 노출 텍스트를 작성하세요', maxLength: 20 }}
              error={errors.title?.message}
            />
            <Input
              type='text'
              label='배너 소제목'
              name='subTitle'
              register={register}
              registerOptions={{ required: '최대 20자, 메인 노출 텍스트를 작성하세요', maxLength: 20 }}
              error={errors.sub_title?.message}
            />
            <Input
              type='text'
              label='클릭 시 이동할 이벤트 페이지 링크'
              name='eventUrl'
              register={register}
              registerOptions={{ required: '이벤트 프로모션 게시글이 작성된 URL을 작성하세요' }}
              error={errors.event_url?.message}
            />
            <p className='text-right text-sm text-neutral-500'>권장 해상도 : 1920 x 1080px / JPG 권장</p>

            <div className='mt-4 flex w-full justify-center'>
              <button
                type='submit'
                className='block w-1/2 border border-primary bg-primary px-4 py-2 text-base text-secondary duration-700 ease-in-out hover:bg-secondary hover:text-primary'
              >
                {isEditing ? '수정' : '등록'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBannerOrPromotion;
