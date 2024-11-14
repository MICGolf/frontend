import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';

interface CategorySelcetProps {
  categoryLargeArray: string[];
  categoryMiddleArray: string[];
  categorySmallArray: string[];
}

const CategorySelcet = ({ categoryLargeArray, categoryMiddleArray, categorySmallArray }: CategorySelcetProps) => {
  const { register } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
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
        {categoryLargeArray.map((item, index) => (
          <option key={index} value={item}>
            {item}
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
        {categoryMiddleArray.map((item, index) => (
          <option key={index} value={item}>
            {item}
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
        {categorySmallArray.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelcet;
