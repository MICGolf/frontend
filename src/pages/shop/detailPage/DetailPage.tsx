import { productDetailInfo } from '@/assets/dummys/productDetailInfo';
import ProductDetailView from '../components/ProductDetailView';
import ProductDetails from '../components/ProductDetails';

const DetailPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 장바구니 추가 로직
    console.log('장바구니에 상품이 추가되었습니다.');
  };

  return (
    <article className='w-full'>
      <ProductDetailView data={productDetailInfo} onSubmit={handleSubmit} />
      <ProductDetails data={productDetailInfo} />
    </article>
  );
};

export default DetailPage;
