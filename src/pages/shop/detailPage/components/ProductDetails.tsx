import ReviewCarousel from './ReviewCarousel';
import TextContent from './TextContent';
import ReviewCard from './ReviewCard';
import ReviewDropdown from './ReviewDropDown';
import { ProductDetailsProps } from '../types';
import RefundPolicy from './RefundPolicy';

const ProductDetails = ({ data, isFetching }: ProductDetailsProps) => {
  const detailBoxes = [
    {
      id: 1,
      title: '제품 설명',
      content: <TextContent content={data.product.description} isFetching={isFetching} />,
      show: true,
    },
    {
      id: 2,
      title: '제품 특징',
      content: <TextContent content={data.product.detail} isFetching={isFetching} />,
      show: true,
    },
    {
      id: 3,
      title: '리뷰',
      content: <ReviewDropdown />,
      show: false, // 이 항목은 숨김 처리
      hasCarousel: true,
    },
    {
      id: 4,
      title: '환불 정책',
      content: <RefundPolicy />,
      show: true,
    },
  ];

  return (
    <section className='mx-[25px] my-[24px] flex flex-col xl:mx-[130px] xl:my-[96px]'>
      {detailBoxes
        .filter((item) => item.show) // show가 true인 항목만 표시
        .map((item) => (
          <div key={item.id} className='flex flex-col border-t border-t-gray500 py-[38px]'>
            <div className='flex flex-col gap-4 xl:flex-row xl:justify-between'>
              <h3 className='flex-1 text-xl font-semibold md:text-4xl'>{item.title}</h3>
              <div className='flex flex-1 flex-col'>{item.content}</div>
            </div>
            {item.hasCarousel && (
              <div className='mt-7 flex w-full flex-col'>
                <ReviewCarousel />
                <ReviewCard />
              </div>
            )}
          </div>
        ))}
    </section>
  );
};

export default ProductDetails;
