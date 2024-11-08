import { detailData } from '@/assets/dummys/detailData';
import ProductDetailView from '../ui/ProductDetailView';
import ProductDetails from '../ui/ProductDetails';

const DetailPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 장바구니 추가 로직
    console.log('장바구니에 상품이 추가되었습니다.');
  };

  return (
    <article className='w-full'>
      <ProductDetailView data={detailData} onSubmit={handleSubmit} />
      <ProductDetails data={detailData} />
    </article>
  );
};

export default DetailPage;
