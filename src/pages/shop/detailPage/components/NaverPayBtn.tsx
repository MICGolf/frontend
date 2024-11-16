import naverPayLogo from '@/assets/icons/naverPayLogo.svg';
import naverPayText from '@/assets/icons/naverPayText.svg';

const NaverPayBtn = () => {
  return (
    <button className='flex w-full flex-1 items-center justify-center gap-10 bg-naver px-[15px] py-[8px] md:gap-2 md:px-[30px] md:py-[10px]'>
      <div className='flex w-[41px] gap-2 md:w-[82px]'>
        <img src={naverPayLogo} alt='네이버페이 로고' className='w-[41px] md:w-[82px]' />
        <img src={naverPayText} alt='네이버페이 텍스트' className='w-[41px] md:w-[82px]' />
      </div>
      <span className='flex items-center justify-center text-lg font-semibold md:text-2xl'>구매</span>
    </button>
  );
};

export default NaverPayBtn;
