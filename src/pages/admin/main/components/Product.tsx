import { SectionBox } from '../../components/SectionBox';

export const Product = () => {
  return (
    <SectionBox title='상품'>
      <div className='grid grid-cols-2 gap-4 px-5'>
        <div className='border-r-[1px] border-black pr-4 text-xl'>
          <p>
            판매중 상품 <span className='float-right text-base'>0건</span>
          </p>
          <p className='mt-2'>
            품절 상품 <span className='float-right text-base'>0건</span>
          </p>
        </div>

        <div className='text-xl'>
          <p>
            Best Item <span className='float-right text-base'>0건</span>
          </p>
          <p className='mt-2'>
            New Arrival <span className='float-right text-base'>0건</span>
          </p>
          <p className='mt-2'>
            MD’s Choice <span className='float-right text-base'>0건</span>
          </p>
        </div>
      </div>
    </SectionBox>
  );
};
