import { client } from '@/api/client';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface UserInfo {
  name: string | null;
  email: string | null;
  phone: number | null;
  verifyCode: number | null;
}

const FindPwPage = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: null,
    email: null,
    phone: null,
    verifyCode: null,
  });
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleFindPwClick = async () => {
    // try {
    //   // TODO: email, 휴대폰 인증 번호에 대한 값을 validation 할 수 있는 뭔가가 필요함.
    //   const response = await client.post('/api/auth/findPw', {
    //     name: userInfo.name,
    //     email: userInfo.email,
    //     number: userInfo.verifyCode,
    //   });

    //   if (response.status === 200) {
    //     setIsVerified(true);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    setIsVerified(true);
  };

  const handleChangePwClick = async () => {
    // if (isVerified) {
    //   try {
    //     const response = await client.post('/api/auth/changePw', { password });

    //     if (response.status === 200) {
    //       alert('비밀번호가 변경되었습니다');
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

    if (isVerified) {
      navigate('/auth/signin', { replace: true });
      alert('비밀번호가 변경되었습니다 다시 로그인해주세요.');
    }
  };

  const handleVerifyCodeClick = () => {
    // TODO: 휴대폰 인증 번호 전송 로직
  };

  return (
    <div className='mx-auto flex max-w-[700px] flex-col gap-[64px] py-[88px]'>
      {/* section 1 */}
      <div className='text-[40px] font-[500]'>{isVerified ? '비밀번호 재설정' : '비밀번호 찾기'}</div>

      {/* section 2 */}
      <div>
        {isVerified === false && (
          <form className='flex flex-col gap-[64px]'>
            <div className='flex flex-col gap-[10px]'>
              <div className='text-2xl'>회원 정보</div>
              <input
                className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
                type='text'
                placeholder='이름'
                value={userInfo.name || ''}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              />
              <input
                className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
                type='text'
                placeholder='이메일'
                value={userInfo.email || ''}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              />
              <input
                className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
                type='number'
                placeholder='전화번호 "-" 없이 입력'
                value={userInfo.phone || ''}
                onChange={(e) => setUserInfo({ ...userInfo, phone: parseInt(e.target.value) })}
              />
            </div>

            <div className='flex flex-col gap-[10px]'>
              <div className='text-2xl'>전화번호 인증</div>
              <div className='flex'>
                <input
                  className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
                  type='number'
                  placeholder='인증번호'
                />
                <button
                  onClick={() => handleVerifyCodeClick()}
                  type='button'
                  className='whitespace-nowrap bg-black px-4 py-5 text-white hover:opacity-70'
                >
                  인증번호 전송
                </button>
              </div>
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
                onChange={(e) => setPassword(e.target.value)}
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
                className='bg-black px-4 py-5 text-white hover:opacity-70'
              >
                비밀번호 찾기
              </button>
              <Link to={'/auth/signin'} className='hover:bg-gray400 bg-gray100 px-4 py-5 text-center hover:opacity-70'>
                로그인 이동
              </Link>
            </>
          ) : (
            <button
              onClick={() => handleChangePwClick()}
              type='button'
              className='bg-black px-4 py-5 text-white hover:opacity-70'
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
