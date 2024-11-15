import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { majorCategory, middleCategory } = useParams();

  return (
    <div>
      <h1>
        {majorCategory} - {middleCategory}
      </h1>
      {/* 상품 목록 표시 */}
    </div>
  );
};

export default CategoryPage;
