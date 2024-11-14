import { productDetailData } from '@/assets/dummys/productDetailData';
import ProductDetailView from '../components/ProductDetailView';
import ProductDetails from '../components/ProductDetails';

const DetailPage = () => {
  return (
    <article className='w-full'>
      <ProductDetailView data={productDetailData} />
      <ProductDetails data={productDetailData} />
    </article>
  );
};

export default DetailPage;
