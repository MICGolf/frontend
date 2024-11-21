import LogoWhite from '@/assets/imgs/LogoWhite';

const DetailImageSkeleton = () => {
  return (
    <div className='relative h-screen w-full overflow-hidden bg-gray-200 md:h-full'>
      <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
      <div className='z-1 absolute flex h-full w-full animate-pulse items-center justify-center'>
        <LogoWhite />
      </div>
    </div>
  );
};

export default DetailImageSkeleton;
