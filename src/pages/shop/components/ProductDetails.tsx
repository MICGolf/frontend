import ReviewCarousel from './ReviewCarousel';
import ReviewDropdown from './ReviewDropDown';
import TextContent from './TextContent';
import ReviewCard from './ReviewCard';

const descBoxes = [
  {
    id: 1,
    title: '제품 설명',
    contentType: 'text',
  },
  {
    id: 2,
    title: '리뷰',
    contentType: 'dropdown',
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

const ProductDetails = ({ data }) => {
  const renderContent = (item: { contentType: string }) => {
    if (item.contentType === 'dropdown') {
      return <ReviewDropdown />;
    } else if (item.contentType === 'text') {
      return <TextContent text={data.description} />;
    }
    return null;
  };

  return (
    <section className='mx-[50px] my-[48px] flex flex-col xl:mx-[130px] xl:my-[96px]'>
      {descBoxes.map((item) => (
        <div key={item.id} className='flex flex-col border-t border-t-gray500 py-[38px]'>
          <div className='flex flex-col gap-4 xl:flex-row xl:justify-between'>
            <h3 className='flex-1 text-4xl font-semibold'>{item.title}</h3>
            <div className='flex flex-col flex-1'>{renderContent(item)}</div>
          </div>
          {item.contentType === 'dropdown' && (
            <div className='flex flex-col w-full mt-7'>
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
