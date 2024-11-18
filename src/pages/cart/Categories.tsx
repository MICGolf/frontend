import { MajorCategory } from '@/assets/dummys/types';
import { Link } from 'react-router-dom';

interface CategoriesProps {
  content: string;
  categoryData: MajorCategory[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Categories = ({ content, categoryData, onMouseEnter, onMouseLeave }: CategoriesProps) => {
  // 카테고리 기본 URL 생성 함수
  const generateCategoryUrl = (type: string, major: string, middle: string = '') =>
    `/${type}/${major.toLowerCase()}${middle ? `/${middle.toLowerCase()}` : ''}`;

  // 카테고리 내용 렌더링
  const renderCategoryContent = (type: string) => (
    <ul className='flex gap-12'>
      {categoryData.map((major) => (
        <li key={major.id} className='flex flex-col gap-2'>
          <Link to={generateCategoryUrl(type, major.majorCategory)} className='text-[18px]'>
            {major.majorCategory}
          </Link>
          <ul className='flex flex-col gap-2'>
            {major.middleCategories.map((middle) => (
              <li key={middle.id}>
                <Link
                  to={generateCategoryUrl(type, major.majorCategory, middle.category)}
                  className='text-[14px] text-gray-700'
                >
                  {middle.category}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );

  return (
    <nav
      className='absolute top-[110px] z-[10] w-full border-b border-gray-300 bg-white px-24 py-4'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {content && renderCategoryContent(content)} {/* content에 맞는 카테고리 렌더링 */}
    </nav>
  );
};

export default Categories;
