import { allProductDatas } from '@/assets/dummys/productListDatas';
import ProductDetailView from './components/ProductDetailView';
import ProductDetails from './components/ProductDetails';
import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { productsApi } from '@/api';
import { useEffect, useState } from 'react';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setIsLoading(false);
    })();
  }, []);

  const product = allProductDatas.find((item) => item.id === id);
  if (!product) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <p>상품을 찾을 수 없습니다.</p>
      </div>
    ); // 상품이 없을 경우
  }

  // const {
  //   data: productData,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ['productData'],
  //   queryFn: async () => {
  //     const response = await productsApi.getProductDetail(13);
  //     return response.data;
  //   },
  // });

  return (
    <article className='w-full'>
      <ProductDetailView data={product} isLoading={isLoading} />
      <ProductDetails data={product} isLoading={isLoading} />
    </article>
  );
};

export default DetailPage;
