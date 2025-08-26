import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/Input';
import { client } from '@/api/client';

type UserInfo = {
  name: string | null;
  id: string | null;
};

const FindPwPage = () => {
  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    watch,
    formState: { errors: errorsInfo },
  } = useForm<UserInfo>();

  const handleFindPwClick = async () => {
    try {
      const response = await client.post('/auth/request-password-reset-test', {
        name: watch('name'),
        login_id: watch('id'),
      });

      if (response.status === 200) {
        alert('가입 시 입력하신 이메일 주소로 비밀번호 재설정 링크가 전송되었습니다. 메일을 확인해주세요.');
      }
    } catch (error) {
      console.error(error);
      alert('일치하는 정보가 없습니다.');
    }
  };

  return (
    <div className='mx-auto mt-[100px] flex max-w-[700px] flex-col gap-[64px] py-[88px]'>
      {/* section 1 */}
      <div className='text-4xl font-[500]'>비밀번호 찾기</div>

      {/* section 2 */}
      <div>
        <form onSubmit={handleSubmitInfo(handleFindPwClick)} className='flex flex-col gap-[64px]'>
          <div className='flex flex-col gap-[10px]'>
            <div className='text-2xl'>회원 정보</div>
            <Input
              label='이름'
              name='name'
              type='text'
              register={registerInfo}
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
              error={errorsInfo.name?.message}
            />
            <Input
              label='아이디'
              name='id'
              type='text'
              register={registerInfo}
              registerOptions={{ required: '아이디는 필수 항목입니다.' }}
              error={errorsInfo.id?.message}
            />
          </div>
          <div className='mt-4 flex w-full flex-col gap-4'>
            <button type='submit' className='bg-black px-[20px] py-[14px] text-xl text-white hover:opacity-70'>
              비밀번호 찾기
            </button>
            <Link
              to={'/auth/signin'}
              className='bg-gray100 px-[20px] py-[14px] text-center text-xl hover:bg-gray400 hover:opacity-70'
            >
              로그인 이동
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindPwPage;
