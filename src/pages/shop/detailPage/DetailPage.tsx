import { productListData } from '@/assets/dummys/productListDatas';
import ProductDetailView from './components/ProductDetailView';
import ProductDetails from './components/ProductDetails';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const product = productListData.find((item) => item.id === id);

  if (!product) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <p>상품을 찾을 수 없습니다.</p>
      </div>
    ); // 상품이 없을 경우
  }

  return (
    <article className='w-full'>
      <ProductDetailView data={product} />
      <ProductDetails data={product} />
    </article>
  );
};

export default DetailPage;
