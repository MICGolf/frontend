import completeCheck from '@/assets/icons/completeCheck.svg';
import { Link, useLocation } from 'react-router-dom';

type FindIdData = {
  login_id: string;
  login_type: string[];
};

const FindIdCompletePage = () => {
  const location = useLocation();
  const { data }: { data: FindIdData } = location.state;
  console.log(location);

  data.login_type;

  return (
    <div className='mx-auto flex max-w-[700px] flex-col items-center gap-[64px] py-[88px]'>
      <div className='flex flex-col items-center gap-4'>
        <img src={completeCheck} alt='성공 체크 아이콘' />
        <div className='text-5xl font-[500]'>회원 정보를 찾았어요!</div>
      </div>

      <div className='w-full'>
        <div className='flex flex-col gap-[64px]'>
          <div className='flex flex-col gap-[10px]'>
            <strong className='mb-[10px] text-2xl'>회원님, 안녕하세요</strong>
            <div className='text-xl'>MIC Golf ID</div>
            <div className='w-full border border-gray100 px-6 py-4 text-2xl'>{data.login_id}</div>
            <div className='text-2xl'>가입된 계정 종류</div>
            {data.login_type.map((type) => (
              <div className='w-full border border-gray100 px-6 py-4 text-2xl'>{type}</div>
            ))}
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

export default FindIdCompletePage;
