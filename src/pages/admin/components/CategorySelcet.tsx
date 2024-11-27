import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';
import { categoryApi } from '@/api';
import { CategoryData } from './type';
type CategoryWithChildren = CategoryData & {
  subCategories?: CategoryWithChildren[];
};
interface CategorySelcetProp {
  setSelectedCategoryId: (value: string) => void;
}
const CategorySelcet = ({ setSelectedCategoryId }: CategorySelcetProp) => {
  const { register, watch, setValue } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryWithChildren[]>([]);
  const mainCategory = watch('mainCategory');
  const subCategory = watch('subCategory');
  const subSubCategory = watch('subSubCategory');

  const selectedCategoryId = subSubCategory // 소분류 ID가 존재하면 사용
    ? Number(subSubCategory)
    : subCategory // 중분류 ID가 존재하면 사용
      ? Number(subCategory)
      : Number(mainCategory); // 대분류 ID가 존재하면 사용

  useEffect(() => {
    setSelectedCategoryId(String(selectedCategoryId));
  }, [mainCategory, subCategory, subSubCategory]);
  const fetchCategories = async () => {
    const mainResponse = await categoryApi.getCategory();
    const mainCategories: CategoryData[] = mainResponse.data;

    const categoriesWithChildren = await Promise.all(
      mainCategories.map(async (mainCategory) => {
        const subResponse = await categoryApi.getCategory(mainCategory.id);
        const subCategories: CategoryData[] = subResponse.data;

        const subCategoriesWithChildren = await Promise.all(
          subCategories.map(async (subCategory) => {
            const subSubResponse = await categoryApi.getCategory(subCategory.id);
            const subSubCategories: CategoryData[] = subSubResponse.data;

            return { ...subCategory, subCategories: subSubCategories };
          })
        );

        return { ...mainCategory, subCategories: subCategoriesWithChildren };
      })
    );

    setCategories(categoriesWithChildren);
  };

  const subCategories = categories.find((cate) => cate.id === Number(mainCategory))?.subCategories || [];

  const subSubCategories = subCategories.find((subCate) => subCate.id === Number(subCategory))?.subCategories || [];

  useEffect(() => {
    setValue('subCategory', '');
    setValue('subSubCategory', '');
  }, [mainCategory]);

  useEffect(() => {
    setValue('subSubCategory', '');
  }, [subCategory]);
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='col-span-5 flex items-center gap-4'>
      <select
        {...register('mainCategory', { required: '대분류를 선택해주세요' })}
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
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        {...register('subCategory')}
        className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
        style={{
          backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
        }}
        onClick={(prev) => setIsOpen(!prev)}
        defaultValue=''
        disabled={!mainCategory}
      >
        <option value='' disabled>
          중분류
        </option>
        {subCategories.map((subCategory) => (
          <option key={subCategory.id} value={subCategory.id}>
            {subCategory.name}
          </option>
        ))}
      </select>
      <select
        {...register('subSubCategory')}
        className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
        style={{
          backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
        }}
        onClick={(prev) => setIsOpen(!prev)}
        defaultValue=''
        disabled={!subCategory}
      >
        <option value='' disabled>
          소분류
        </option>
        {subSubCategories.map((subSubCategory) => (
          <option key={subSubCategory.id} value={subSubCategory.id}>
            {subSubCategory.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelcet;
