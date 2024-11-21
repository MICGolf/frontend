import LogoWhite from '@/assets/imgs/LogoWhite';

const CardSkeletonUI = () => {
  return (
    <div className='block h-full'>
      <div className='flex h-full flex-col'>
        {/* 이미지 영역 */}
        <div className='relative w-full overflow-hidden pt-[133%]'>
          <div className='absolute left-0 top-0 h-full w-full bg-gray-200'>
            <div className='absolute left-0 top-0 z-50 flex h-full w-full animate-pulse items-center justify-center'>
              <LogoWhite size='s' />
            </div>
            <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          </div>
        </div>
        {/* 타이틀, 라벨 영역 */}
        <div className='flex flex-grow flex-col justify-between py-4'>
          <div className='mb-3 flex flex-col gap-2'>
            <div className='relative h-6 w-3/4 overflow-hidden bg-gray-200'>
              <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </div>
            <div className='flex gap-2'>
              <div className='relative h-5 w-12 overflow-hidden bg-gray-200'>
                <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>
              <div className='relative h-5 w-12 overflow-hidden bg-gray-200'>
                <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>
            </div>
          </div>
          {/* 가격 영역  */}
          <div className='flex flex-col'>
            <div className='relative h-3 w-20 overflow-hidden bg-gray-200'>
              <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </div>
            <div className='relative mt-1 h-4 w-24 overflow-hidden bg-gray-200'>
              <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeletonUI;
