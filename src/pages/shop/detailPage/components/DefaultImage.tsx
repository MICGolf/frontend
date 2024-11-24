import LogoWhite from '@/assets/imgs/LogoWhite';

const DefaultImage = ({ option = '디테일' }: { option?: '디테일' | '썸네일' }) => {
  return (
    <>
      {option === '디테일' && (
        <div className={`relative h-screen w-full overflow-hidden bg-gray-200 md:h-full`}>
          <div className='absolute flex items-center justify-center w-full h-full z-1'>
            <LogoWhite />
          </div>
        </div>
      )}
      {option === '썸네일' && (
        <div className={`flex h-full w-full items-center justify-center overflow-hidden bg-gray-200 object-cover`}>
          <LogoWhite />
        </div>
      )}
    </>
  );
};

export default DefaultImage;
