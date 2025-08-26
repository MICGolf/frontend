const OptionSelectBoxSkeleton = () => {
  return (
    <div className='flex h-full flex-col gap-12'>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <div className='flex w-full flex-col gap-3'>
            <h2 className='relative h-[40px] w-[70%] overflow-hidden bg-gray-200'>
              <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </h2>
            <div className='flex w-full gap-2'>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className='relative h-[24px] w-[58px] overflow-hidden bg-gray-200'>
                  <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='relative h-[18px] w-[95px] overflow-hidden bg-gray-200'>
            <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          </div>
          <div className='relative h-[22px] w-[120px] overflow-hidden bg-gray-200'>
            <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          </div>
        </div>
      </div>
      <div className='mt-auto flex flex-col gap-6'>
        <div className='flex w-full flex-col gap-6 md:justify-start'>
          <div className='flex flex-col gap-2'>
            <h3 className='relative h-[24px] w-[220px] overflow-hidden bg-gray-200'>
              <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </h3>
            <div className='flex gap-2'>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className='relative h-7 w-7 overflow-hidden bg-gray-200'>
                  <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='relative h-[24px] w-[140px] overflow-hidden bg-gray-200'>
              <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </h3>
            <div className='flex gap-2'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='relative h-7 w-7 overflow-hidden bg-gray-200'>
                  <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='relative h-[24px] w-[140px] overflow-hidden bg-gray-200'>
              <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </h3>
            <div className='relative h-[20px] w-[120px] overflow-hidden bg-gray-200'>
              <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </div>
          </div>
        </div>
        <div className='relative flex flex-col gap-4 transition-all duration-300 ease-in-out xl:flex-row'>
          <div className='relative h-[54px] w-full overflow-hidden bg-gray-200'>
            <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          </div>
          <div className='relative h-[54px] w-full overflow-hidden bg-gray-200'>
            <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionSelectBoxSkeleton;
