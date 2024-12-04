import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '@/assets/imgs/logoWhite.svg';
import kakao from '@/assets/icons/kakao.svg';
import naver from '@/assets/icons/naver.svg';
import { LoginType } from './types';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/Input';
import { client } from '@/api/client';
import { useAuthStore } from '@/config/store';
import { decodeJwt } from '@/utils/decodeJwt';

const { VITE_KAKAO_REST_API_KEY, VITE_KAKAO_REDIRECT_URI, VITE_NAVER_CLIENT_ID, VITE_NAVER_REDIRECT_URI } = import.meta
  .env;

type SignInFormData = {
  login_id: string;
  password: string;
};

const SignInPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const methods = useForm<SignInFormData>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = methods;

  const handleSocialLogin = (type: LoginType) => {
    switch (type) {
      case 'kakao': {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${VITE_KAKAO_REST_API_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}`;
        break;
      }
      case 'naver': {
        window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${VITE_NAVER_CLIENT_ID}&redirect_uri=${VITE_NAVER_REDIRECT_URI}&state=${Date.now()}`;
        break;
      }
    }
  };

  const handleEmailLogin = async (data: SignInFormData) => {
    console.log(data);
    try {
      const response = await client.post('/auth/login', {
        login_id: data.login_id,
        password: data.password,
      });

      const decodeToken = decodeJwt(response.data.access_token);
      setUser(decodeToken);
      localStorage.setItem('accessToken', response.data.access_token);

      navigate('/');

      return decodeToken;
    } catch (error) {
      console.error(error);
      setValue('login_id', '');
      setValue('password', '');
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className='mx-auto mt-[100px] flex max-w-[700px] flex-col gap-[32px] px-[20px] py-[88px] md:gap-[64px]'>
      {/* section 1 */}
      <div className='text-4xl font-[500]'>로그인</div>

      {/* section 2 */}
      <div>
        <form onSubmit={handleSubmit(handleEmailLogin)} className='flex flex-col gap-[10px]'>
          <Input
            label='아이디'
            name='login_id'
            type='text'
            register={register}
            registerOptions={{ required: '아이디를 입력해주세요' }}
            error={errors?.login_id?.message}
          />
          <Input
            label='비밀번호'
            name='password'
            type='password'
            register={register}
            registerOptions={{ required: '비밀번호를 입력해주세요' }}
            error={errors?.password?.message}
          />
          <button
            type='submit'
            className='w-full border border-primary bg-black px-[20px] py-[14px] text-left text-xl text-white transition-colors duration-500 hover:bg-secondary hover:text-primary'
          >
            로그인
          </button>
        </form>
        <div className='flex py-4 text-base'>
          <Link to={'/auth/findId'} className='hover:text-gray-500'>
            아이디 찾기
          </Link>
          <span>&nbsp;|&nbsp;</span>
          <Link to={'/auth/findPw'} className='hover:text-gray-500'>
            비밀번호 찾기
          </Link>
        </div>
      </div>

      {/* section 3 */}
      <div className='border-t border-gray200 py-[48px] text-[20px] md:py-[78px]'>
        <div className='mx-auto flex max-w-[394px] flex-col items-center gap-4'>
          <div className='flex w-full items-center bg-black px-[20px] py-[14px] text-white transition-all duration-300 hover:bg-opacity-60'>
            <img src={logoWhite} className='max-h-[18px] max-w-[50px]' alt='' />
            <button onClick={() => navigate('/auth/signup')} className='flex-1'>
              회원가입
            </button>
          </div>
          <div className='duration-500-60 flex w-full items-center rounded-md bg-[#FEE500] px-[20px] py-[14px] text-black text-opacity-85 transition-all duration-300 hover:bg-opacity-60'>
            <img src={kakao} alt='' className='h-[24px] w-[50px]' />
            <button onClick={() => handleSocialLogin('kakao')} className='flex-1'>
              카카오 로그인
            </button>
          </div>
          <div className='flex w-full items-center rounded-md bg-[#03C75A] px-[20px] py-[14px] text-white transition-all duration-300 hover:bg-opacity-60'>
            <img src={naver} alt='' className='h-[24px] w-[50px]' />
            <button onClick={() => handleSocialLogin('naver')} className='flex-1'>
              네이버 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
