import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/Input';
import { client } from '@/api/client';
import axios from 'axios';

type FindIdFormData = {
  name: string;
  email: string;
};

const FindIdPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FindIdFormData>();

  const hadleFindIdClick = async (name: string, email: string) => {
    try {
      const response = await client.get('auth/find-id', {
        params: { name: name, email: email },
      });

      if (response.status === 200) {
        navigate('/auth/findId/complete', {
          state: { data: response.data },
        });
        // 이동된 페이지로 데이터를 전송해야함
      }
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          // 서버가 응답했으나 에러 상태 코드
          alert('일치하는 회원 정보가 없습니다.');
        } else if (error.request) {
          // 요청은 전송되었으나 응답 없음
          alert('서버와의 통신에 실패했습니다. 인터넷 연결을 확인하세요.');
        } else {
          // 기타 Axios 관련 에러
          alert('믹골프 서버에서 오류가 발생했습니다. 잠시 후 다시 요청해주세요.');
        }
      } else {
        console.error('알 수 없는 에러: ', error);
        alert('알 수 없는 에러가 발생했습니다.');
      }
    }
  };

  const handleFindIdClick = (data: FindIdFormData) => {
    hadleFindIdClick(watch('name'), watch('email'));
    console.log(data);
  };

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
              label='이메일'
              name='email'
              type='email'
              register={register}
              registerOptions={{
                required: '이메일은 필수 입력값입니다.',
              }}
              error={errors?.email?.message}
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
};

export default FindIdPage;
