import naverPayLogo from '@/assets/icons/naverPayLogo.svg';
import naverPayText from '@/assets/icons/naverPayText.svg';

const NaverPayBtn = () => {
  return (
    <button className='flex w-full flex-1 items-center justify-center gap-2 bg-naver px-[30px] py-[10px]'>
      <div className='flex gap-2'>
        <img src={naverPayLogo} alt='네이버페이 로고' />
        <img src={naverPayText} alt='네이버페이 텍스트' />
      </div>
      <span className='flex items-center justify-center text-2xl font-semibold'>구매</span>
    </button>
  );
};

export default NaverPayBtn;
