import { SectionBox } from '../../components/SectionBox';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DefaultImg from '@/assets/imgs/logoText.svg';

const AddImage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  // const bannerImageRegister = register('bannerImage', {
  //   required: '이미지를 선택해주세요',
  //   validate: {
  //     fileFormat: (value) => {
  //       if (value?.[0]) {
  //         const types = ['image/jpeg', 'image/png', 'image/gif'];
  //         return types.includes(value[0].type) || '이미지 파일만 업로드 가능합니다';
  //       }
  //       return true;
  //     },
  //     fileSize: (value) => {
  //       if (value?.[0]) {
  //         const fileSize = value[0].size / 1024 / 1024;
  //         return fileSize <= 5 || '파일 크기는 5MB 이하여야 합니다';
  //       }
  //       return true;
  //     },
  //   },
  // });

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     if (file) {
  //       const previewReader = new FileReader();
  //       previewReader.onload = () => {
  //         setImagePreview(previewReader.result as string);
  //         setValue('bannerImage', { file, fileName: file.name });
  //       };
  //       previewReader.onerror = (error) => {
  //         console.error('File read error:', error);
  //       };
  //       previewReader.readAsDataURL(file);
  //     }
  //   }
  // };
  const handlerSubmit = (data: any) => {
    const formData = new FormData();
    formData.append('bannerName', data.bannerName);
    formData.append('bannerImage', data.bannerImage);

    console.log(formData);
  };
  return (
    <SectionBox title='배너' border={false}>
      <form className='px-5'>
        <div className='flex items-center justify-between'>
          <div className='w-1/2 overflow-hidden rounded-md bg-neutral-300'>
            <img src={imagePreview || DefaultImg} alt='배너' className='' />
          </div>

          <div className='flex flex-col w-1/2 gap-4 ml-4'>
            <label>
              배너 제목
              <input
                type='text'
                placeholder='배너 제목'
                {...register('bannerName', {
                  required: '필수 입력 항목입니다',
                })}
                className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
              />
              {errors.bannerName && (
                <p className='mt-1 ml-1 text-sm text-red-500'>{errors.bannerName.message as string}</p>
              )}
            </label>

            <label>
              URL
              <input
                type='file'
                placeholder='URL'
                {...register('bannerImage', {
                  required: '필수 입력 항목입니다',
                })}
                className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
              />
              {errors.bannerImage && (
                <p className='mt-1 ml-1 text-sm text-red-500'>{errors.bannerImage.message as string}</p>
              )}
            </label>

            <p className='text-sm text-right text-neutral-500'>권장 해상도 : 1000 x 1000px / JPG 권장</p>
          </div>
        </div>

        <div className='flex justify-center w-full mt-4'>
          <button
            type='submit'
            onClick={handleSubmit(handlerSubmit)}
            className='block w-1/2 px-4 py-2 text-base text-white duration-300 ease-in-out rounded-md bg-primary hover:scale-105'
          >
            등록
          </button>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddImage;
