import LogoWhite from '@/assets/imgs/LogoWhite';

const ImageOnLoadSkeleton = ({ option = '디테일' }: { option?: '디테일' | '썸네일' }) => {
  return (
    <>
      {option === '디테일' && (
        <div className='relative w-full h-screen overflow-hidden bg-gray-200 md:h-full'>
          <div className='absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          <div className='absolute flex items-center justify-center w-full h-full z-1 animate-pulse'>
            <LogoWhite />
          </div>
        </div>
      )}
      {option === '썸네일' && (
        <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full gap-2 bg-gray-200'>
          <div className='absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          <div className='absolute object-contain'>
            <LogoWhite size='s' />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageOnLoadSkeleton;
