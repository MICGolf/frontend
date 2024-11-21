const TextContentSkeleton = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <div className='relative h-[20px] w-[70%] overflow-hidden bg-gray-200'>
          <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
        </div>
        <div className='relative h-[10px] w-1/4 overflow-hidden bg-gray-200'>
          <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
        </div>
        <div className='relative h-[10px] w-1/5 overflow-hidden bg-gray-200'>
          <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='relative h-[20px] w-[70%] overflow-hidden bg-gray-200'>
          <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
        </div>
        <div className='relative h-[10px] w-1/4 overflow-hidden bg-gray-200'>
          <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
        </div>
        <div className='relative h-[10px] w-1/5 overflow-hidden bg-gray-200'>
          <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
        </div>
      </div>
    </div>
  );
};

export default TextContentSkeleton;
