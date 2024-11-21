import { categoryApi } from '@/api';
import { MajorCategory } from '@/assets/dummys/types';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface CategoriesProps {
  activeNav: string | null;
  categoryData: MajorCategory[];
}

type CategoryData = {
  id: number;
  name: string;
  parent_id: number | null;
  depth: number;
  created_at: string;
  updated_at: string;
};

type CategoryWithSubCategories = {
  id: number;
  name: string;
  parent_id: number | null;
  depth: number;
  created_at: string;
  updated_at: string;
  subCategories: CategoryData[];
};

const Categories = ({ activeNav, categoryData }: CategoriesProps) => {
  if (activeNav !== 'shop' || categoryData.length === 0) return null;

  const fetchCategoriesWithSubCategories = async () => {
    // 대분류 가져오기
    const mainResponse = await categoryApi.getCategory();
    const mainCategories: CategoryData[] = mainResponse.data;
    console.log('mainCategories', mainCategories);

    // 각 대분류에 해당하는 중분류 가져오기
    const categoriesWithSubcategories = await Promise.all(
      mainCategories.map(async (mainCategory) => {
        const subResponse = await categoryApi.getCategory(mainCategory.id);
        const subCategories: CategoryData[] = subResponse.data;

        return { ...mainCategory, subCategories };
      })
    );

    console.log('categoriesWithSubcategories', categoriesWithSubcategories);
    return categoriesWithSubcategories;
  };

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<CategoryWithSubCategories[]>({
    queryKey: ['categoriesWithSubcategories'],
    queryFn: fetchCategoriesWithSubCategories,
  });

  if (isLoading) return null;
  if (isError) return null;

  return (
    <nav className='absolute left-0 top-[60px] z-[10] w-full border-b border-gray-300 bg-white px-24 py-4'>
      <ul className='flex gap-12'>
        {categories?.map((category, i) => (
          <li key={i} className='flex flex-col gap-2'>
            <Link to={`/shop/${category.name}`} className='text-[18px]'>
              {category.name}
            </Link>
            <ul className='flex flex-col gap-2'>
              {category.subCategories?.map((subCategory, i) => (
                <li key={i}>
                  <Link to={`/shop/${category.name}/${subCategory.name}`} className='text-[14px] text-gray-700'>
                    {subCategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
