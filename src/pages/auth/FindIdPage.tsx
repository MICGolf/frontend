import { useState } from 'react';
import { Link } from 'react-router-dom';

const FindIdPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    date: '',
  });

  const handleFindIdClick = () => {
    // TODO: 아이디 찾기 로직
    // const { data } = await client.post('/api/auth/findId', {name, phone});
    const dummyUser = { email: 'gildong@gmail.com', date: '2024-11-11' };
    setUserInfo(dummyUser);
  };

  return (
    <div className='mx-auto flex max-w-[700px] flex-col gap-[64px] py-[88px]'>
      {/* section 1 */}
      <div className='text-[40px] font-[500]'>이메일 찾기</div>

      {/* section 2 */}
      <div>
        {userInfo.email === '' && (
          <form className='flex flex-col gap-[64px]'>
            <div className='flex flex-col gap-[10px]'>
              <div className='text-2xl'>회원 정보</div>
              <input
                className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
                type='text'
                placeholder='이름'
              />
              <input
                className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
                type='text'
                placeholder='전화번호 "-" 없이 입력'
              />
            </div>
          </form>
        )}

        {userInfo.email !== '' && (
          <div className='flex flex-col gap-[64px]'>
            <div className='flex flex-col gap-[10px]'>
              <strong className='mb-[10px] text-2xl'>회원님, 안녕하세요</strong>
              <div className='text-xl'>MIC Golf ID</div>
              <div className='w-full border border-gray100 px-6 py-4 text-2xl'>{userInfo.email}</div>
              <div className='text-2xl'>가입일</div>
              <div className='w-full border border-gray100 px-6 py-4 text-2xl'>{userInfo.date}</div>
            </div>
          </div>
        )}

        <div className='mt-4 flex w-full flex-col gap-4'>
          {userInfo.email === '' && (
            <button
              onClick={() => handleFindIdClick()}
              type='button'
              className='bg-black px-4 py-5 text-white hover:opacity-70'
            >
              아이디 찾기
            </button>
          )}
          <Link to={'/auth/signin'} className='hover:bg-gray400 bg-gray100 px-4 py-5 text-center hover:opacity-70'>
            로그인 이동
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FindIdPage;
