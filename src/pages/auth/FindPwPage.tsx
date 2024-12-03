import { useState } from 'react';
import { Link } from 'react-router-dom';
import comepleteCheck from '@/assets/icons/completeCheck.svg';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/Input';
import { client } from '@/api/client';

interface UserInfo {
  name: string | null;
  id: string | null;
}

const FindPwPage = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [newPw, setNewPw] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserInfo>();

  const handleFindPwClick = async () => {
    console.log(watch('id'));
    console.log(watch('name'));
    try {
      // TODO: email, 휴대폰 인증 번호에 대한 값을 validation 할 수 있는 뭔가가 필요함.
      const response = await client.post('/auth/request-password-reset', {
        name: watch('name'),
        login_id: watch('id'),
      });

      if (response.status === 200) {
        setIsVerified(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePwClick = async () => {
    if (isVerified) {
      try {
        const response = await client.post('/reset-password', { newPw });

        if (response.status === 200) {
          setIsSuccess(true);
          alert('비밀번호가 변경되었습니다');
        }
      } catch (error) {
        console.error(error);
      }
    }
    console.log(newPw);

    if (isVerified) {
      setIsSuccess(true);
    }
  };

  const handleVerifyCodeClick = () => {
    // TODO: 휴대폰 인증 번호 전송 로직
  };
  const handlePwChangeClick = (data: any) => {
    console.log(data);
  };

  if (isSuccess) {
    return (
      <div className='mx-auto flex max-w-[700px] flex-col items-center gap-[64px] py-[88px]'>
        <div className='flex flex-col items-center gap-4'>
          <img src={comepleteCheck} alt='성공 체크 아이콘' />
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
  }

  return (
    <div className='mx-auto mt-[100px] flex max-w-[700px] flex-col gap-[64px] py-[88px]'>
      {/* section 1 */}
      <div className='text-4xl font-[500]'>{isVerified ? '비밀번호 재설정' : '비밀번호 찾기'}</div>

      {/* section 2 */}
      <div>
        {isVerified === false && (
          <form onSubmit={handleSubmit(handlePwChangeClick)} className='flex flex-col gap-[64px]'>
            <div className='flex flex-col gap-[10px]'>
              <div className='text-2xl'>회원 정보</div>
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
              <Input
                label='아이디'
                name='id'
                type='text'
                register={register}
                registerOptions={{ required: '아이디는 필수 항목입니다.' }}
              />
            </div>
          </form>
        )}

        {isVerified && (
          <div className='flex flex-col gap-[64px]'>
            <div className='flex flex-col gap-[10px]'>
              <div className='text-xl'>새 비밀번호</div>
              <input
                type='password'
                placeholder='새 비밀번호를 입력하세요'
                className='w-full border border-gray100 px-6 py-4 text-2xl'
                onChange={(e) => setNewPw(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className='mt-4 flex w-full flex-col gap-4'>
          {isVerified === false ? (
            <>
              <button
                onClick={() => handleFindPwClick()}
                type='button'
                className='bg-black px-[20px] py-[14px] text-xl text-white hover:opacity-70'
              >
                비밀번호 찾기
              </button>
              <Link
                to={'/auth/signin'}
                className='bg-gray100 px-[20px] py-[14px] text-center text-xl hover:bg-gray400 hover:opacity-70'
              >
                로그인 이동
              </Link>
            </>
          ) : (
            <button
              onClick={() => handleChangePwClick()}
              type='button'
              className='bg-black px-4 py-5 text-2xl text-white hover:opacity-70'
            >
              비밀번호 변경
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindPwPage;
