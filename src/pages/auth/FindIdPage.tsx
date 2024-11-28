import { useState } from 'react';
import { Link } from 'react-router-dom';
import comepleteCheck from '@/assets/icons/completeCheck.svg';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/Input';

type FindIdFormData = {
  name: string;
  phone: number;
};

const FindIdPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    date: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindIdFormData>();

  const handleFindIdClick = (data: FindIdFormData) => {
    console.log(data);
    setUserInfo({ email: 'asd@asd.asd', date: new Date().toISOString().slice(0, 10) });
  };

  if (userInfo.email === '') {
    return (
      <div className='mx-auto mt-[100px] flex max-w-[700px] flex-col gap-[64px] py-[88px]'>
        <div className='text-4xl font-[500]'>이메일 찾기</div>
        <div>
          <form onSubmit={handleSubmit(handleFindIdClick)} className='flex flex-col'>
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
                label='전화번호 "-" 없이 입력'
                name='phone'
                type='number'
                register={register}
                registerOptions={{
                  required: '전화번호는 필수 입력값입니다.',
                  minLength: {
                    value: 11,
                    message: '전화번호 형식이 올바르지 않습니다.',
                  },
                  maxLength: {
                    value: 11,
                    message: '전화번호 형식이 올바르지 않습니다.',
                  },
                }}
                error={errors?.phone?.message}
              />
            </div>
            <div className='mt-4 flex w-full flex-col gap-4 text-xl'>
              <button
                type='submit'
                className='border border-primary bg-primary px-[20px] py-[14px] text-secondary transition-colors duration-500 hover:bg-secondary hover:text-primary'
              >
                아이디 찾기
              </button>
              <Link
                to={'/auth/signin'}
                className='bg-gray100 px-[20px] py-[14px] text-center hover:bg-gray400 hover:opacity-70'
              >
                로그인 이동
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto flex max-w-[700px] flex-col items-center gap-[64px] py-[88px]'>
      <div className='flex flex-col items-center gap-4'>
        <img src={comepleteCheck} alt='성공 체크 아이콘' />
        <div className='text-5xl font-[500]'>회원 정보를 찾았어요!</div>
      </div>

      <div className='w-full'>
        <div className='flex flex-col gap-[64px]'>
          <div className='flex flex-col gap-[10px]'>
            <strong className='mb-[10px] text-2xl'>회원님, 안녕하세요</strong>
            <div className='text-xl'>MIC Golf ID</div>
            <div className='w-full border border-gray100 px-6 py-4 text-2xl'>{userInfo.email}</div>
            <div className='text-2xl'>가입일</div>
            <div className='w-full border border-gray100 px-6 py-4 text-2xl'>{userInfo.date}</div>
          </div>
        </div>

        <div className='mt-4 flex w-full flex-col gap-4'>
          <Link
            to={'/auth/signin'}
            className='bg-gray100 px-4 py-5 text-center text-2xl hover:bg-gray400 hover:opacity-70'
          >
            로그인 이동
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FindIdPage;
