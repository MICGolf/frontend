import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '@/assets/imgs/logoWhite.svg';
import kakao from '@/assets/icons/kakao.svg';
import naver from '@/assets/icons/naver.svg';
import { LoginType } from './types';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/Input';
import { client } from '@/api/client';

const { VITE_KAKAO_REST_API_KEY, VITE_KAKAO_REDIRECT_URI, VITE_NAVER_CLIENT_ID, VITE_NAVER_REDIRECT_URI } = import.meta
  .env;

type SignInFormData = {
  id: string;
  password: string;
};

const SignInPage = () => {
  const navigate = useNavigate();

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
        localStorage.setItem('loginType', 'kakao');
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${VITE_KAKAO_REST_API_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}`;
        break;
      }
      case 'naver': {
        localStorage.setItem('loginType', 'naver');
        window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${VITE_NAVER_CLIENT_ID}&redirect_uri=${VITE_NAVER_REDIRECT_URI}&state=STATE_STRING`;
        break;
      }
    }
  };

  const handleEmailLogin = async (data: SignInFormData) => {
    try {
      const response = await client.post('/auth/login', {
        loginType: 'email',
        id: data.id,
        password: data.password,
      });

      console.log('로그인 성공', response.data);

      localStorage.setItem('accessToken', response.data.access_token);
      navigate('/');

      return response.data;
    } catch (error) {
      console.error(error);
      setValue('id', '');
      setValue('password', '');
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className='mx-auto mt-[100px] flex max-w-[700px] flex-col gap-[64px] py-[88px]'>
      {/* section 1 */}
      <div className='text-4xl font-[500]'>로그인</div>

      {/* section 2 */}
      <div>
        <form onSubmit={handleSubmit(handleEmailLogin)} className='flex flex-col gap-[10px]'>
          <Input
            label='아이디'
            name='id'
            type='text'
            register={register}
            registerOptions={{ required: '아이디를 입력해주세요' }}
            error={errors?.id?.message}
          />
          <Input
            label='비밀번호'
            name='password'
            type='password'
            register={register}
            registerOptions={{ required: '비밀번호를 입력해주세요' }}
            error={errors?.password?.message}
          />
          <button type='submit' className='w-full bg-black px-6 py-4 text-left text-2xl text-white'>
            로그인
          </button>
          <div className='flex items-center gap-2'>
            <label className='flex gap-2'>
              <input type='checkbox' />
              <span>자동 로그인</span>
            </label>
          </div>
        </form>
        <div className='flex py-4 text-lg'>
          <Link to={'/auth/findId'}>아이디 찾기</Link>
          <span>&nbsp;|&nbsp;</span>
          <Link to={'/auth/findPw'}>비밀번호 찾기</Link>
        </div>
      </div>

      {/* section 3 */}
      <div className='border-t border-gray200 py-[78px] text-[20px]'>
        <div className='mx-auto flex max-w-[394px] flex-col items-center gap-4'>
          <div className='flex w-full items-center rounded-md bg-black px-[20px] py-[14px] text-white transition-all duration-300 hover:bg-opacity-60'>
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
