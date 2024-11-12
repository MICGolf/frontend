import { reviewImgs } from '@/assets/dummys/reviewData';

const ReviewCard = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex h-[60px] items-center gap-2 border-b border-b-gray-700 text-gray-700'>
        <span className='text-primary'>★★★★☆</span>
        <span>smi****</span>
        <span>24.11.01</span>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-12'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl font-semibold text-primary'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h2>
            <p className='break-all'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
              Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
              tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.
              Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at
              sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu
              eros, eget tempus orci facilisis id.
            </p>
          </div>
          <img className='w-[190px] object-cover' src={reviewImgs[0].image} alt='리뷰이미지' />
        </div>
        <div className='flex h-[35px] items-center'>
          <p>[답변] 감사합니다^^ 카키색 가방에 흰색 파우치 멋지십니다~!</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
