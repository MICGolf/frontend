import facebook from '@/assets/icons/facebook.svg';
import instagram from '@/assets/icons/instagram.svg';
import youtube from '@/assets/icons/youtube.svg';
import logoWhite from '@/assets/imgs/logoWhite.svg';

const Footer = () => {
  // INFO: 소셜 미디어 클릭 이벤트 링크 이동 핸들러
  const handleClickSocialMedia = (socialMedia: string) => {
    switch (socialMedia) {
      case 'facebook':
        window.open('https://www.facebook.com/', '_blank');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/', '_blank');
        break;
      case 'youtube':
        window.open('https://www.youtube.com/', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <footer className='flex w-full justify-between bg-black px-[130px] pb-[108px] pt-[50px] text-gray700'>
      <div>
        <div className='w-[220px] border-b border-white'>
          <img className='mb-6' src={logoWhite} alt='믹골프 로고' />
        </div>

        <div className='flex'>
          <img
            className='cursor-pointer'
            onClick={() => handleClickSocialMedia('facebook')}
            src={facebook}
            alt='믹골프 페이스북'
          />
          <img
            className='cursor-pointer'
            onClick={() => handleClickSocialMedia('instagram')}
            src={instagram}
            alt='믹골프 인스타그램'
          />
          <img
            className='cursor-pointer'
            onClick={() => handleClickSocialMedia('youtube')}
            src={youtube}
            alt='믹골프 유튜브'
          />
        </div>
        <div className='text-xs text-secondary'>www.micgolf.com</div>
      </div>
      <div className='mr-[160px] flex gap-[60px] text-sm'>
        <div className='flex flex-col gap-[6px]'>
          <h3 className='text-lg text-secondary'>Social Media</h3>
          <p className='cursor-pointer'>Facebook</p>
          <p className='cursor-pointer'>Instagram</p>
          <p className='cursor-pointer'>Naver</p>
          <p className='cursor-pointer'>Google</p>
        </div>
        <div className='flex flex-col gap-[6px]'>
          <h3 className='text-lg text-secondary'>Customer Service</h3>
          <p className='cursor-pointer'>문의하기</p>
          <p className='cursor-pointer'>자주 물어보는 질문</p>
          <p className='cursor-pointer'>FAQ</p>
        </div>
        <div className='flex flex-col gap-[6px]'>
          <h3 className='text-lg text-secondary'>회사</h3>
          <p className='cursor-pointer'>PATATALABS</p>
          <p className='cursor-pointer'>FACTORY</p>
          <p className='cursor-pointer'>MIC GOLF</p>
          <p className='cursor-pointer'>채용정보</p>
        </div>
        <div className='flex flex-col gap-[6px]'>
          <h3 className='text-lg text-secondary'>법적 고지 및 이용약관</h3>
          <p className='cursor-pointer'>이용 약관</p>
          <p className='cursor-pointer'>개인정보 처리방침</p>
          <p className='cursor-pointer'>쿠키 정책</p>
          <p className='cursor-pointer'>판매 약관</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
