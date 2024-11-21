import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';
import { categoryApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { CategoryData } from './type';

const CategorySelcet = () => {
  const { register, watch } = useFormContext();
  const categoryLarge = watch('categoryLarge');
  const categoryMiddle = watch('categoryMiddle');
  const categorySmall = watch('categorySmall');
  const [isOpen, setIsOpen] = useState(false);
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
      const response = await categoryApi.getCategory();
      if (!response) return null;
      return response.data;
    },
  });

  console.log('categoryList', categoryData);

  return (
    <div className='col-span-5 flex items-center gap-4'>
      <select
        {...register('categoryLarge')}
        className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
        style={{
          backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
        }}
        onClick={(prev) => setIsOpen(!prev)}
        defaultValue=''
      >
        <option value='' disabled>
          대분류
        </option>
        {categoryData?.map((item: CategoryData) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        {...register('categoryMiddle')}
        className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
        style={{
          backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
        }}
        onClick={(prev) => setIsOpen(!prev)}
        defaultValue=''
      >
        <option value='' disabled>
          중분류
        </option>
        {categoryData?.map((item: CategoryData) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        {...register('categorySmall')}
        className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
        style={{
          backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
        }}
        onClick={(prev) => setIsOpen(!prev)}
        defaultValue=''
      >
        <option value='' disabled>
          소분류
        </option>
        {categoryData?.map((item: CategoryData) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelcet;
