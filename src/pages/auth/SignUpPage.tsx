import { client } from '@/api/client';
import { Input } from '@/components/Input';
import { useAuthStore } from '@/config/store';
import useTermsModalState from '@/hooks/useModalState/useModalState';
import { decodeJwt } from '@/utils/decodeJwt';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type CheckboxType = '개인정보' | '이용약관';

type SignUpFormData = {
  id: string;
  name: string;
  password: string;
  passwordRe: string;
  email: string;
  phone: string;
  verification: number;
};

const SignUpPage = () => {
  const { handleModalOpen, renderModalContent } = useTermsModalState();
  const [selectedCheckbox, setSelectedCheckbox] = useState<CheckboxType[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<SignUpFormData>();

  const handleToggle = (type: CheckboxType) => {
    setSelectedCheckbox((prev) => (prev.includes(type) ? prev.filter((v) => v !== type) : [...prev, type]));
  };

  const handleToggleAll = () => {
    setSelectedCheckbox(isAllChecked ? [] : ['개인정보', '이용약관']);
    setIsAllChecked((prev) => !prev);
  };

  const handleSignUpSubmit = async (data: SignUpFormData) => {
    const signUp = async () => {
      return client.post('auth/sign-up', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        login_id: data.id,
        password: data.password,
        password2: data.passwordRe,
      });
    };

    const login = async () => {
      return client.post('auth/login', { login_id: data.id, password: data.password });
    };

    try {
      const signUpResponse = await signUp();

      if (signUpResponse.status === 201) {
        const loginResponse = await login();

        setUser(decodeJwt(signUpResponse.data));
        localStorage.setItem('accessToken', loginResponse.data.access_token);

        navigate('/auth/signup/complete', { state: { user: data } });
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생: ', error);
    }
  };

  useEffect(() => {
    selectedCheckbox.includes('개인정보') && selectedCheckbox.includes('이용약관')
      ? setIsAllChecked(true)
      : setIsAllChecked(false);
  }, [selectedCheckbox]);

  const handleDuplicateCheckId = async () => {
    try {
      const response = await client.get(`auth/check-login-id?login_id=${watch('id')}`);
      if (response.status === 422) {
        setError('id', { type: 'manual', message: '이미 사용중인 아이디입니다.' });
      } else {
        clearErrors('id');
      }
    } catch (error) {
      setError('id', { type: 'manual', message: '중복 확인 중 문제가 발생했습니다. 다시 시도해주세요.' });
    }
  };

  return (
    <div className='mx-auto mt-[100px] flex max-w-[700px] flex-col gap-[64px] py-[88px]'>
      {/* section 1 */}
      <h1 className='text-4xl font-[500]'>회원 정보 입력</h1>

      {/* section 2 */}
      <div>
        <form onSubmit={handleSubmit(handleSignUpSubmit)} className='flex flex-col gap-[64px]'>
          {/* step 1 */}
          <div className='flex flex-col gap-[10px]'>
            <h2 className='text-2xl'>회원 정보</h2>
            <Input
              label='이름'
              name='name'
              type='text'
              register={register}
              registerOptions={{
                required: '이름은 필수 입력값입니다.',
                minLength: {
                  value: 2,
                  message: '이름은 최소 2자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 10,
                  message: '이름은 최대 10자까지 입력 가능합니다.',
                },
                pattern: {
                  value: /^[가-힣a-zA-Z\s]+$/,
                  message: '이름은 한글, 영문, 공백만 입력 가능합니다.',
                },
              }}
              error={errors?.name?.message}
            />
            <div className='flex'>
              <Input
                label='아이디'
                name='id'
                type='text'
                register={register}
                registerOptions={{
                  required: '아이디는 필수 입력값입니다.',
                  minLength: {
                    value: 2,
                    message: '아이디는 최소 8자 이상이어야 합니다.',
                  },
                  maxLength: {
                    value: 10,
                    message: '아이디는 최대 20자까지 입력 가능합니다.',
                  },
                }}
                error={errors?.id?.message}
              />
              <button
                onClick={handleDuplicateCheckId}
                type='button'
                className='h-[50px] w-[124px] whitespace-nowrap bg-primary px-4 py-3 text-secondary'
              >
                중복확인
              </button>
            </div>
            <Input
              label='비밀번호(특수문자,대문자,숫자 포함, 8자 이상)'
              name='password'
              type='password'
              register={register}
              registerOptions={{
                required: '비밀번호는 필수 입력값입니다.',
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: '비밀번호는 대문자, 숫자, 특수기호를 포함한 8자 이상이어야 합니다.',
                },
              }}
              error={errors?.password?.message}
            />
            <Input
              label='비밀번호 확인'
              name='passwordRe'
              type='password'
              register={register}
              registerOptions={{
                required: '비밀번호 확인은 필수 입력값입니다.',
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
              }}
              error={errors?.passwordRe?.message}
            />
          </div>

          {/* step 2 */}
          <div className='flex flex-col gap-[10px]'>
            <h2 className='text-2xl'>회원 연락처</h2>
            <Input label='이메일' name='email' type='email' register={register} registerOptions={{ required: '' }} />
            <Input
              label='전화번호 "-" 없이 입력'
              name='phone'
              type='number'
              register={register}
              registerOptions={{
                required: '전화번호는 필수 입력값입니다.',
                minLength: {
                  value: 11,
                  message: '전화번호는 11자여야 합니다.',
                },
                maxLength: {
                  value: 11,
                  message: '전화번호는 11자여야 합니다.',
                },
              }}
              error={errors?.phone?.message}
            />
          </div>

          {/* step 3 */}
          <div className='flex flex-col gap-[10px]'>
            <h2 className='text-2xl'>전화번호 인증</h2>
            <div className='flex'>
              <Input
                label='인증번호'
                name='verification'
                type='number'
                register={register}
                registerOptions={{
                  required: '인증번호를 입력해주세요.',
                  minLength: {
                    value: 6,
                    message: '인증번호는 6자리여야 합니다.',
                  },
                  maxLength: {
                    value: 6,
                    message: '인증번호는 6자리여야 합니다.',
                  },
                }}
                error={errors?.verification?.message}
              />
              <button
                type='button'
                className='h-[50px] w-[124px] whitespace-nowrap bg-primary px-4 py-3 text-secondary'
              >
                인증번호 전송
              </button>
            </div>
          </div>

          {/* step 4 */}
          <div className='flex flex-col gap-[10px]'>
            <h2 className='text-2xl'>개인정보 수집/제공</h2>
            <label className='flex cursor-pointer items-center'>
              <input type='checkbox' className='hidden' checked={isAllChecked} onChange={handleToggleAll} />
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 ${isAllChecked ? 'bg-black' : 'bg-white'}`}
              >
                {isAllChecked && (
                  <svg className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                )}
              </span>
              전체 동의
            </label>
            <label className='flex cursor-pointer items-center'>
              <input
                type='checkbox'
                className='hidden'
                checked={selectedCheckbox.includes('개인정보')}
                onChange={() => handleToggle('개인정보')}
              />
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 ${selectedCheckbox.includes('개인정보') ? 'bg-black' : 'bg-white'}`}
              >
                {selectedCheckbox.includes('개인정보') && (
                  <svg className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                )}
              </span>
              개인정보 수집약관 동의&nbsp;
              <span
                onClick={() => window.open('https://micgolf.oopy.io/14d83dfe-5356-80fa-b391-d1a121cd1209')}
                className='cursor-pointer border-b border-blue700 text-blue700'
              >
                약관 보기 →
              </span>
            </label>
            <label className='flex cursor-pointer items-center'>
              <input
                type='checkbox'
                className='hidden'
                checked={selectedCheckbox.includes('이용약관')}
                onChange={() => handleToggle('이용약관')}
              />
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 ${selectedCheckbox.includes('이용약관') ? 'bg-black' : 'bg-white'}`}
              >
                {selectedCheckbox.includes('이용약관') && (
                  <svg className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                )}
              </span>
              이용약관 동의&nbsp;
              <span
                onClick={() => window.open('https://micgolf.oopy.io/14d83dfe-5356-805f-9a1c-f2ed84858454')}
                className='cursor-pointer border-b border-blue700 text-blue700'
              >
                약관 보기 →
              </span>
            </label>
          </div>

          <button
            type='submit'
            disabled={!isAllChecked}
            className={`${isAllChecked ? 'hover:bg-secondary hover:text-primary' : 'opacity-50'} border border-primary bg-primary px-4 py-3 text-secondary transition-colors duration-500`}
          >
            가입하기
          </button>
        </form>
      </div>
      {renderModalContent()}
    </div>
  );
};

export default SignUpPage;
