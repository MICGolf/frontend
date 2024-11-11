import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '@/assets/imgs/logoWhite.svg';
import kakao from '@/assets/icons/kakao.svg';
import naver from '@/assets/icons/naver.svg';
import { SignUpType } from './types';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSignUpClick = (type: SignUpType) => {
    switch (type) {
      case 'email': {
        navigate('/signup');
        break;
      }
      case 'kakao': {
        window.location.href = 'https://www.kakao.com';
        break;
      }
      case 'naver': {
        window.location.href = 'https://www.naver.com';
        break;
      }
    }
  };

  return (
    <div className='mx-auto flex max-w-[700px] flex-col gap-[64px] py-[88px]'>
      {/* section 1 */}
      <div className='text-[40px] font-[500]'>로그인</div>

      {/* section 2 */}
      <div>
        <form action='' className='flex flex-col gap-[10px]'>
          <label>
            <input
              className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
              type='text'
              placeholder='아이디'
            />
          </label>
          <label>
            <input
              className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
              type='password'
              placeholder='비밀번호'
            />
          </label>
          <button className='w-full bg-black px-6 py-4 text-left text-2xl text-white' type='submit'>
            로그인
          </button>
          <div className='flex items-center gap-2'>
            <input type='checkbox' />
            <button className='text-left text-2xl' type='button'>
              자동 로그인
            </button>
          </div>
        </form>
        <div className='flex py-4 text-lg'>
          <Link to={'/PasswordResetPage'}>아이디 찾기</Link>
          <span>&nbsp;|&nbsp;</span>
          <Link to={'/PasswordResetPage'}>비밀번호 찾기</Link>
        </div>
      </div>

      {/* section 3 */}
      <div className='border-t border-gray200 py-[78px] text-[30px]'>
        <div className='mx-auto flex max-w-[394px] flex-col items-center gap-4'>
          <div className='flex w-full items-center rounded-md bg-black px-[20px] py-[28px] text-white'>
            <img src={logoWhite} className='max-h-[18px] max-w-[50px]' alt='' />
            <button onClick={() => handleSignUpClick('email')} className='flex-1'>
              회원가입
            </button>
          </div>
          <div className='flex w-full rounded-md bg-[#FEE500] px-[20px] py-[28px] text-black text-opacity-85'>
            <img src={kakao} alt='' />
            <button onClick={() => handleSignUpClick('kakao')} className='flex-1'>
              카카오 로그인
            </button>
          </div>
          <div className='flex w-full rounded-md bg-[#03C75A] px-[20px] py-[28px] text-white'>
            <img src={naver} alt='' />
            <button onClick={() => handleSignUpClick('naver')} className='flex-1'>
              네이버 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
