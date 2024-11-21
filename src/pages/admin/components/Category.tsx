import { categoryApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const Category = ({ onClose }: { onClose: () => void }) => {
  const methods = useForm();
  const { register, watch, handleSubmit, setValue } = methods;
  const radioCategory = watch('category');
  const addCategory = watch('addCategory');
  const categoryLarge = watch('categoryLarge');
  const categoryMiddle = watch('categoryMiddle');
  const categorySmall = watch('categorySmall');
  const [categoryId, setCategoryId] = useState({
    large: 0,
    middle: 0,
    small: 0,
  });
  useEffect(() => {
    setCategoryId({
      large: Number(categoryLarge) || 0,
      middle: Number(categoryMiddle) || 0,
      small: Number(categorySmall) || 0,
    });
  }, [categoryLarge, categoryMiddle, categorySmall]);
  const { data: categoryData } = useQuery({
    queryKey: ['productFilter', categoryId],
    queryFn: async () => {
      const response = await categoryApi.getCategory(categoryId);
      if (!response) return null;
      return response.data;
    },
  });
  const renderCategory = () => {
    switch (radioCategory) {
      case 'large':
        setValue('categoryTypeLarge', '');
        setValue('categoryTypeMedium', '');
        setValue('categoryTypeSmall', '');
        return (
          <label className='flex flex-col text-neutral-600'>
            대분류
            <input
              {...register('addCategory')}
              type='text'
              placeholder='대분류'
              className='mt-2 rounded-md border-2 border-gray-300 p-2'
            />
          </label>
        );
      case 'medium':
        setValue('categoryTypeLarge', '');
        setValue('categoryTypeMedium', '');
        return (
          <>
            <label className='flex flex-col text-neutral-600'>
              대분류
              <select {...register('categoryTypeLarge')} className='mt-2 rounded-md border-2 border-gray-300 p-2'>
                {categoryData?.map((item: any) => <option value={item.categoryId}>{item.categoryName}</option>)}
              </select>
            </label>
            <label className='flex flex-col text-neutral-600'>
              중분류
              <input
                {...register('addCategory')}
                type='text'
                placeholder='중분류'
                className='mt-2 rounded-md border-2 border-gray-300 p-2'
              />
            </label>
          </>
        );
      case 'small':
        setValue('categoryTypeLarge', '');
        setValue('categoryTypeMedium', '');
        setValue('categoryTypeSmall', '');
        return (
          <>
            <label className='flex flex-col text-neutral-600'>
              대분류
              <select {...register('categoryTypeLarge')} className='mt-2 rounded-md border-2 border-gray-300 p-2'>
                <option value=''>대분류</option>
              </select>
            </label>
            <label className='flex flex-col text-neutral-600'>
              중분류
              <select {...register('categoryTypeMedium')} className='mt-2 rounded-md border-2 border-gray-300 p-2'>
                <option value=''>중분류</option>
              </select>
            </label>
            <label className='flex flex-col text-neutral-600'>
              소분류
              <input
                {...register('addCategory')}
                type='text'
                placeholder='소분류'
                className='mt-2 rounded-md border-2 border-gray-300 p-2'
              />
            </label>
          </>
        );
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/40'>
      <form className='m-auto w-2/3 rounded-lg bg-white' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between gap-4 border-b-[1px] border-neutral-300 p-4'>
          <p className='mt-3 text-xl font-semibold'>새 카테고리</p>
          <div className='flex grow justify-end gap-4'>
            <button
              onClick={onClose}
              className='mt-4 block w-1/3 rounded-md border border-neutral-300 px-4 py-2 text-base text-neutral-900 duration-300 ease-in-out hover:scale-105'
            >
              취소
            </button>
            <button
              type='submit'
              className='mt-4 block w-1/3 rounded-md bg-primary px-4 py-2 text-base text-white duration-300 ease-in-out hover:scale-105'
            >
              저장
            </button>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-2 p-4'>
          <div>
            <p className='text-neutral-500'>카테고리 리스트</p>
            <div className='mt-2'>
              <p>대분류</p>
              <p className='ml-4'>중분류</p>
              <p className='ml-8'>소분류</p>
              <p className='ml-8 text-neutral-500'>{addCategory}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-neutral-500'>카테고리 분류</p>
            <div className='mb-2 flex items-center gap-2'>
              <label>
                <input {...register('category')} type='radio' className='mr-2' name='category' value='large' />
                대분류
              </label>
              <label>
                <input {...register('category')} type='radio' className='mr-2' name='category' value='medium' />
                중분류
              </label>
              <label>
                <input {...register('category')} type='radio' className='mr-2' name='category' value='small' />
                소분류
              </label>
            </div>
            {renderCategory()}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Category;
