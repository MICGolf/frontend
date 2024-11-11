import { useNavigate } from 'react-router-dom';
import { SignUpModalType } from './types';

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleModalOpen = (type: SignUpModalType) => {
    switch (type) {
      case '개인정보': {
        alert('개인정보 약관 모달 준비중');
        break;
      }
      case '이용약관': {
        alert('이용약관 모달 준비중');
        break;
      }
    }
  };

  const handleSignUpSubmit = () => {
    navigate('/auth/signup/complete', { replace: true });
  };

  return (
    <div className='mx-auto flex max-w-[700px] flex-col gap-[64px] py-[88px]'>
      {/* section 1 */}
      <div className='text-[40px] font-[500]'>회원 정보 입력</div>

      {/* section 2 */}
      <div>
        <form onSubmit={() => handleSignUpSubmit()} className='flex flex-col gap-[64px]'>
          {/* step 1 */}
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
              placeholder='아이디'
            />
            <div className='text-right text-error text-opacity-60'>이미 사용중인 아이디 입니다</div>
            <input
              className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
              type='password'
              placeholder='비밀번호(대문자,숫자 포함, 8자 이상)'
            />
            <div className='text-right text-error text-opacity-60'>비밀번호 양식이 올바르지 않습니다</div>
            <input
              className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
              type='password'
              placeholder='비밀번호 확인'
            />
            <div className='text-right text-error text-opacity-60'>입력한 비밀번호와 일치하지 않습니다</div>
          </div>
          {/* step 2 */}
          <div className='flex flex-col gap-[10px]'>
            <div className='text-2xl'>회원 연락처</div>
            <input
              className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
              type='text'
              placeholder='이메일'
            />
            <input
              className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
              type='text'
              placeholder='전화번호 "-" 없이 입력'
            />
          </div>
          {/* step 3 */}
          <div className='flex flex-col gap-[10px]'>
            <div className='text-2xl'>전화번호 인증</div>
            <div className='flex'>
              <input
                className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
                type='number'
                placeholder='인증번호'
              />
              <button type='button' className='whitespace-nowrap bg-gray100 px-4 py-5 text-gray200'>
                인증번호 전송
              </button>
            </div>
          </div>
          {/* step 4 */}
          <div className='flex flex-col justify-center gap-[20px]'>
            <div className='flex gap-[14px]'>
              <input type='checkbox' />
              <p>
                개인정보 수집약관 동의{' '}
                <span
                  onClick={() => handleModalOpen('개인정보')}
                  className='cursor-pointer border-b border-blue700 text-blue700'
                >
                  약관 보기 →
                </span>
              </p>
            </div>
            <div className='flex gap-[14px]'>
              <input type='checkbox' />
              <p>
                이용약관 동의{' '}
                <span
                  onClick={() => handleModalOpen('이용약관')}
                  className='cursor-pointer border-b border-blue700 text-blue700'
                >
                  약관 보기 →
                </span>
              </p>
            </div>
            <label className='flex gap-[14px]'>
              <input type='checkbox' />
              <p>전체 동의</p>
            </label>
            <button className='w-full bg-black px-6 py-4 text-center text-2xl text-white' type='submit'>
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
