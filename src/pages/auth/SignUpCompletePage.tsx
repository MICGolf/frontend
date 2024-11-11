import { user } from '@/assets/dummys/user';
import signupCompleteCheck from '@/assets/icons/signupCompleteCheck.svg';

const SignUpCompletePage = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 pt-[250px]'>
      <img src={signupCompleteCheck} alt='로그인 성공 체크표시' />
      <div className='text-5xl font-[700]'>회원 가입이 완료 되었습니다.</div>
      <div className='flex flex-col items-center'>
        <p className='text-2xl'>{user.name}님의 회원가입을 축하합니다.</p>
        <p className='text-2xl'>지금 바로 믹골프 회원만의 다양한 혜택을 받아보세요!</p>
      </div>
    </div>
  );
};

export default SignUpCompletePage;
