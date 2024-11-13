const CheckoutPage = () => {
  return (
    <div className='mx-auto max-w-[800px] py-[70px]'>
      <div className='flex flex-col gap-[64px]'>
        {/* step 1 */}
        <div className='flex flex-col gap-[10px]'>
          <h2 className='text-2xl'>주문자 정보</h2>
          <input
            className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
            type='text'
            placeholder='보내는 분'
          />
          <input
            className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
            type='number'
            placeholder='연락처 "-" 없이 입력'
          />
        </div>

        {/* step 2 */}
        <div className='flex flex-col gap-[10px]'>
          <h2 className='text-2xl'>배송정보</h2>
          <div className='flex'>
            <input
              className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
              type='text'
              placeholder='우편번호'
            />
            <button type='button' className='whitespace-nowrap bg-gray100 px-4 py-5 text-gray200'>
              우편번호 찾기
            </button>
          </div>
          <input
            className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
            type='text'
            placeholder='주소'
          />
          <input
            className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
            type='text'
            placeholder='상세주소'
          />
          <input
            className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
            type='text'
            placeholder='배송요청사항'
          />
        </div>

        {/* step 3 */}
        <div className='flex flex-col gap-[10px]'>
          <h2 className='text-2xl'>결제수단</h2>
          <div className='flex gap-6'>
            <button className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl' type='button'></button>
            <button className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl' type='button'></button>
          </div>
        </div>

        {/* step 4 */}
        <div className='flex flex-col gap-[10px]'>
          <h2 className='text-2xl'>개인정보 수집/제공</h2>
          <label className='flex cursor-pointer items-center'>
            <input type='checkbox' className='hidden' />
            <span className='flex h-5 w-5 items-center justify-center rounded-sm border-2 bg-black'>
              <svg className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </span>
            개인정보 수집약관 동의
          </label>
          <label className='flex cursor-pointer items-center'>
            <input type='checkbox' className='hidden' />
            <span className='flex h-5 w-5 items-center justify-center rounded-sm border-2 bg-black'>
              <svg className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </span>
            이용약관 동의
          </label>
          <label className='flex cursor-pointer items-center'>
            <input type='checkbox' className='hidden' />
            <span className='flex h-5 w-5 items-center justify-center rounded-sm border-2 bg-black'>
              <svg className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </span>
            전체 동의
          </label>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
