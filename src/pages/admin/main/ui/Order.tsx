import { SectionBox } from '../../ui/SectionBox';

export const Order = () => {
  return (
    <SectionBox title='주문/배송'>
      <div className='grid grid-cols-2 gap-4 px-5'>
        <div className='border-r-[1px] border-black pr-4 text-xl'>
          <p>
            결제대기 <span className='float-right text-base'>0건</span>
          </p>
          <p className='mt-2'>
            신규주문 <span className='float-right text-base'>0건</span>
          </p>
        </div>

        <div className='text-xl'>
          <p>
            배송준비 <span className='float-right text-base'>0건</span>
          </p>
          <p className='mt-2'>
            배송중 <span className='float-right text-base'>0건</span>
          </p>
          <p className='mt-2'>
            배송완료 <span className='float-right text-base'>0건</span>
          </p>
        </div>
      </div>
    </SectionBox>
  );
};
