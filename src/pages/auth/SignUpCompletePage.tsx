import completeCheck from '@/assets/icons/completeCheck.svg';
import { Link, useLocation } from 'react-router-dom';

const SignUpCompletePage = () => {
  const location = useLocation();
  const { user } = location.state;

  return (
    <div>
      <div className='mb-6 flex flex-col items-center justify-center gap-4 pt-[250px]'>
        <img src={completeCheck} alt='성공 체크 아이콘' />
        <div className='text-5xl font-[700]'>회원 가입이 완료 되었습니다.</div>
        <div className='flex flex-col items-center'>
          <p className='text-2xl'>
            <strong>{user.name}</strong>님의 회원가입을 축하합니다.
          </p>
          <p className='text-2xl'>지금 바로 믹골프 회원만의 다양한 혜택을 받아보세요!</p>
        </div>
      </div>

      <div className='mt-4 flex justify-center gap-4'>
        <Link to={'/'} className='bg-gray100 px-4 py-3 hover:bg-black hover:text-white'>
          홈페이지 이동
        </Link>
      </div>
    </div>
  );
};

export default SignUpCompletePage;
