import { ProductDetailsProps } from '../detailPage/types';

// 다양한 항목에 대해 UI 타입을 명시합니다.
const descBoxes = [
  {
    id: 1,
    title: '제품 설명',
    contentType: 'text', // 텍스트 콘텐츠
  },
  {
    id: 2,
    title: '리뷰',
    contentType: 'dropdown', // 드롭다운 콘텐츠
  },
  {
    id: 3,
    title: '환불 정책',
    contentType: 'text',
  },
  {
    id: 4,
    title: '제품 특징',
    contentType: 'text',
  },
];

// 드롭다운 UI 컴포넌트
const ReviewDropdown = () => {
  return (
    <select className='w-full border-gray-300 p-2'>
      <option value='1'>★☆☆☆☆</option>
      <option value='2'>★★☆☆☆</option>
      <option value='3'>★★★☆☆</option>
      <option value='4'>★★★★☆</option>
      <option value='5'>★★★★★</option>
    </select>
  );
};

// 텍스트 콘텐츠 UI 컴포넌트
const TextContent = ({ text }: { text: string }) => {
  return <p className='flex-1 text-lg'>{text}</p>;
};

const ProductDetails = ({ data }: ProductDetailsProps) => {
  const renderContent = (item: { contentType: string }) => {
    switch (item.contentType) {
      case 'dropdown':
        return <ReviewDropdown />;
      case 'text':
      default:
        return <TextContent text={data.description} />;
    }
  };

  return (
    <section className='flex flex-col px-[130px] py-[96px]'>
      {descBoxes.map((item) => (
        <div className='flex justify-between border-t border-t-gray500 py-[38px]' key={item.id}>
          <h3 className='flex-1 text-4xl font-semibold'>{item.title}</h3>
          {/* 동적으로 렌더링되는 콘텐츠 */}
          <div className='flex-1'>{renderContent(item)}</div>
        </div>
      ))}
    </section>
  );
};

export default ProductDetails;
