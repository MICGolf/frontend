import { SectionBox } from '../../ui/SectionBox';

export const Payment = () => {
  return (
    <SectionBox title='클레임/정산'>
      <div className='grid grid-cols-2 gap-4 px-5'>
        <div className='border-r-[1px] border-black pr-4 text-xl'>
          <p>
            취소요청 <span className='float-right text-base'>0건</span>
          </p>
          <p className='mt-2'>
            반품요청 <span className='float-right text-base'>0건</span>
          </p>
          <p>
            반품수거완료 <span className='float-right text-base'>0건</span>
          </p>
          <p className='mt-2'>
            교환요청 <span className='float-right text-base'>0건</span>
          </p>
          <p>
            교환수거완료 <span className='float-right text-base'>0건</span>
          </p>
        </div>
        <div className='text-xl'>
          <p>
            구매확정 <span className='float-right text-base'>0건</span>
          </p>
          <p className='mt-2'>
            오늘정산 <span className='float-right text-base'>0건</span>
          </p>
          <p className='mt-2'>
            정산예정 <span className='float-right text-base'>0건</span>
          </p>
        </div>
      </div>
    </SectionBox>
  );
};
