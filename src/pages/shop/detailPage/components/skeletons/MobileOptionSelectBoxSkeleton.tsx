const MobileOptionSelectBoxSkeleton = () => {
  return (
    <>
      <div className='flex h-full flex-col gap-12 p-6'>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-2'>
            <div className='flex flex-col gap-3'>
              <div className='relative h-8 w-3/4 overflow-hidden bg-gray-200'>
                <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>
              <div className='flex gap-2'>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className='relative h-6 w-14 overflow-hidden bg-gray-200'>
                    <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='relative h-4 w-1/2 overflow-hidden bg-gray-200'>
              <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </div>
            <div className='relative h-4 w-2/3 overflow-hidden bg-gray-200'>
              <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </div>
          </div>
        </div>

        {/* 옵션 선택 영역 */}
        <div className='mt-auto flex flex-col gap-4'>
          <div className='flex w-full flex-col gap-4 md:justify-start'>
            {/* 컬러버튼 */}
            <div className='flex flex-col gap-2'>
              <div className='relative h-6 w-1/4 overflow-hidden bg-gray-200'>
                <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>
              <div className='flex gap-2'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className='relative h-6 w-6 overflow-hidden bg-gray-200'>
                    <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 장바구니 & 네이버페이 버튼 영역 */}
          <div className='relative flex flex-col gap-2 transition-all duration-300 ease-in-out xl:flex-row'>
            <div className='relative h-8 w-full overflow-hidden bg-gray-200'>
              <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </div>
            <div className='relative h-8 w-full overflow-hidden bg-gray-200'>
              <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileOptionSelectBoxSkeleton;
