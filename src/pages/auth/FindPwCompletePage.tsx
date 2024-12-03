import completeCheck from '@/assets/icons/completeCheck.svg';
import { Link } from 'react-router-dom';

const FindPwCompletePage = () => {
  return (
    <div className='mx-auto flex max-w-[700px] flex-col items-center gap-[64px] py-[88px]'>
      <div className='flex flex-col items-center gap-4'>
        <img src={completeCheck} alt='성공 체크 아이콘' />
        <div className='text-5xl font-[500]'>비밀번호 변경이 완료되었습니다!</div>
      </div>
      <Link
        to={'/auth/signin'}
        replace={true}
        className='w-full bg-black px-4 py-5 text-center text-2xl text-white hover:opacity-70'
      >
        로그인 이동
      </Link>
    </div>
  );
};

export default FindPwCompletePage;
