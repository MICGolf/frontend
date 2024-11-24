import LogoWhite from '@/assets/imgs/LogoWhite';

const ImageOnLoadSkeleton = ({ option = '디테일' }: { option?: '디테일' | '썸네일' }) => {
  return (
    <>
      {option === '디테일' && (
        <div className='relative h-screen w-full overflow-hidden bg-gray-200'>
          <div className='absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          <div className='z-1 absolute flex h-full w-full animate-pulse items-center justify-center object-cover'>
            <LogoWhite />
          </div>
        </div>
      )}
      {option === '썸네일' && (
        <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-200'>
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
