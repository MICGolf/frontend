import { client } from '@/api/client';
import { Input } from '@/components/Input';
import { useForm } from 'react-hook-form';

type Pw = {
  password: string | null;
  passwordRe: string | null;
};

const FindPwChangePage = () => {
  const {
    register,
    handleSubmit,
    watch: watchPw,
    formState: { errors },
  } = useForm<Pw>();

  const handleChangePwClick = async () => {
    try {
      const response = await client.post('/reset-password', {});

      if (response.status === 200) {
        alert('비밀번호가 변경되었습니다');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='mx-auto mt-[100px] flex max-w-[700px] flex-col gap-[64px] py-[88px]'>
      {/* section 1 */}
      <div className='text-4xl font-[500]'>비밀번호 재설정</div>

      {/* section 2 */}
      <form onSubmit={handleSubmit(handleChangePwClick)} className='flex flex-col gap-[64px]'>
        <div className='flex flex-col gap-[10px]'>
          <div className='text-xl'>새 비밀번호</div>
          <Input
            label='비밀번호 재설정'
            name='password'
            type='password'
            register={register}
            registerOptions={{
              required: '비밀번호는 필수 항목입니다.',
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: '비밀번호는 대문자, 숫자, 특수기호를 포함한 8자 이상이어야 합니다.',
              },
            }}
            error={errors.password?.message}
          />
          <Input
            label='비밀번호 확인'
            name='passwordRe'
            type='password'
            register={register}
            registerOptions={{
              required: '비밀번호 확인은 필수 항목입니다.',
              validate: (value) => value === watchPw('password') || '비밀번호가 일치하지 않습니다.',
            }}
            error={errors.passwordRe?.message}
          />
        </div>
        <div className='mt-4 flex w-full flex-col gap-4'>
          <button type='submit' className='bg-black px-[20px] py-[14px] text-xl text-white hover:opacity-70'>
            비밀번호 변경
          </button>
        </div>
      </form>
    </div>
  );
};

export default FindPwChangePage;
