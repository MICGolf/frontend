import { SectionBox } from '../../ui/SectionBox';

export const ReviewAndQuestion = () => {
  return (
    <SectionBox title='리뷰/문의'>
      <div className='grid grid-cols-2 gap-4 px-5'>
        <div className='border-r-[1px] border-black pr-4 text-xl'>
          <p>
            새로 작성된 리뷰 <span className='float-right text-base'>0건</span>
          </p>
          <p className='mt-2'>
            평점 낮은 리뷰 <span className='float-right text-base'>0건</span>
          </p>
        </div>

        <div className='text-xl'>
          <p>
            미답변 문의 <span className='float-right text-base'>0건</span>
          </p>
        </div>
      </div>
    </SectionBox>
  );
};
