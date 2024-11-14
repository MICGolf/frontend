import { SectionBox } from '../../ui/SectionBox';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DefaultImg from '@/assets/imgs/logoText.svg';
import { Input } from '@/components/Input';
import Button from '@/components/Button';

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
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file) {
        const previewReader = new FileReader();
        previewReader.onload = () => {
          setImagePreview(previewReader.result as string);
          setValue('bannerImage', { file, fileName: file.name });
        };
        previewReader.onerror = (error) => {
          console.error('File read error:', error);
        };
        previewReader.readAsDataURL(file);
      }
    }
  };
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

          <div className='ml-4 flex w-1/2 flex-col gap-4'>
            <div>
              <Input
                type='text'
                placeholder='배너 제목'
                label='배너 제목'
                register={register('bannerName', {
                  required: '필수 입력 항목입니다',
                })}
                className=''
              />
              {errors.bannerName && (
                <p className='ml-1 mt-1 text-sm text-red-500'>{errors.bannerName.message as string}</p>
              )}
            </div>

            <div>
              <Input
                type='file'
                placeholder='URL'
                label='URL'
                onChange={(e) => {
                  handleImageChange(e);
                }}
                register={register('bannerImage', {
                  required: '필수 입력 항목입니다',
                })}
                className='rounded-md border border-neutral-300'
              />
              {errors.bannerImage && (
                <p className='ml-1 mt-1 text-sm text-red-500'>{errors.bannerImage.message as string}</p>
              )}
            </div>

            <p className='text-right text-sm text-neutral-500'>권장 해상도 : 1000 x 1000px / JPG 권장</p>
          </div>
        </div>

        <div className='mt-4 flex w-full justify-center'>
          <Button title='등록' onClick={handleSubmit(handlerSubmit)} className='w-1/2' />
        </div>
      </form>
    </SectionBox>
  );
};

export default AddImage;
