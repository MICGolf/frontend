import useTermsModalState from '@/hooks/useTermsModalState/useModalState';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CheckboxType = '개인정보' | '이용약관';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { handleModalOpen, renderModalContent } = useTermsModalState();
  const [selectedCheckbox, setSelectedCheckbox] = useState<CheckboxType[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const handleToggle = (type: CheckboxType) => {
    setSelectedCheckbox((prev) => (prev.includes(type) ? prev.filter((v) => v !== type) : [...prev, type]));
  };

  const handleToggleAll = () => {
    setSelectedCheckbox(isAllChecked ? [] : ['개인정보', '이용약관']);
    setIsAllChecked((prev) => !prev);
  };

  const handleSignUpSubmit = () => {
    navigate('/auth/signup/complete', { replace: true });
  };

  useEffect(() => {
    selectedCheckbox.includes('개인정보') && selectedCheckbox.includes('이용약관')
      ? setIsAllChecked(true)
      : setIsAllChecked(false);
  }, [selectedCheckbox]);

  return (
    <div className='mx-auto flex max-w-[700px] flex-col gap-[64px] py-[88px]'>
      {/* section 1 */}
      <h1 className='text-4xl font-[500]'>회원 정보 입력</h1>

      {/* section 2 */}
      <div>
        <form onSubmit={() => handleSignUpSubmit()} className='flex flex-col gap-[64px]'>
          {/* step 1 */}
          <div className='flex flex-col gap-[10px]'>
            <h2 className='text-2xl'>회원 정보</h2>
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
            <h2 className='text-2xl'>회원 연락처</h2>
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
            <h2 className='text-2xl'>전화번호 인증</h2>
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
                onClick={() => handleModalOpen('개인정보')}
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
                onClick={() => handleModalOpen('이용약관')}
                className='cursor-pointer border-b border-blue700 text-blue700'
              >
                약관 보기 →
              </span>
            </label>
          </div>
        </form>
      </div>
      {renderModalContent()}
    </div>
  );
};

export default SignUpPage;
