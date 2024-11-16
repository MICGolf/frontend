import { CartItemData } from '@/assets/dummys/types';
import useModalState from '@/hooks/useModalState/useModalState';
import { useEffect, useState } from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { useLocation, useNavigate } from 'react-router-dom';

type CheckboxType = '개인정보' | '이용약관';

const CheckoutPage = () => {
  const { handleModalOpen, renderModalContent } = useModalState();
  const [selectedCheckbox, setSelectedCheckbox] = useState<CheckboxType[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [address, setAddress] = useState({
    zonecode: '',
    fullAddress: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { items, totalDeliveryFee, totalPrice } = location.state as {
    items: CartItemData[];
    totalDeliveryFee: number;
    totalPrice: number;
  };

  const [loadingflag, setLoadingFlag] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleTogglePayment = () => {
    setIsVisible((prev) => !prev);
  };

  // INFO: 패키지를 열어보면 Address 타입이 정의되어 있습니다.
  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';
    let localAddress = data.sido + ' ' + data.sigungu;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress = fullAddress.replace(localAddress, '');
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log('주소: ', data.zonecode, fullAddress);
    setAddress({ zonecode: data.zonecode, fullAddress });
  };

  const handleFindAddressClick = () => {
    open({ onComplete: handleComplete });
  };

  const handleToggle = (type: CheckboxType) => {
    setSelectedCheckbox((prev) => (prev.includes(type) ? prev.filter((v) => v !== type) : [...prev, type]));
  };

  const handleToggleAll = () => {
    setSelectedCheckbox(isAllChecked ? [] : ['개인정보', '이용약관']);
    setIsAllChecked((prev) => !prev);
  };

  useEffect(() => {
    selectedCheckbox.includes('개인정보') && selectedCheckbox.includes('이용약관')
      ? setIsAllChecked(true)
      : setIsAllChecked(false);
  }, [selectedCheckbox]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 입력하도록 제한하고, 길이를 11자로 제한
    if (/^\d*$/.test(value) && value.length <= 11) {
      setPhoneNumber(value);
    }
  };

  const handlePaymentClick = async () => {
    // 결제하기 버튼 클릭 시 로직
    setLoadingFlag(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoadingFlag(false);
    navigate('/checkout/success');
  };

  return (
    <div className='mx-auto px-5 py-[200px]'>
      {/* 결제 section */}

      <div className='flex max-w-[1660px] gap-4'>
        <div className='flex w-[1160px] flex-col gap-[64px] p-5'>
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
              type='text'
              value={phoneNumber || ''}
              onChange={handlePhoneNumberChange}
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
                value={address.zonecode}
                readOnly
              />
              <button
                onClick={handleFindAddressClick}
                type='button'
                className='whitespace-nowrap bg-black px-4 py-5 text-white'
              >
                우편번호 찾기
              </button>
            </div>
            <input
              className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl'
              type='text'
              placeholder='주소'
              value={address.fullAddress}
              readOnly
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
              <button className='w-full bg-[#ffeb00] px-6 py-4 placeholder:text-2xl' type='button'>
                카카오페이
              </button>
              <button className='w-full border border-gray100 px-6 py-4 placeholder:text-2xl' type='button'>
                KG 이니시스
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

          {/* 결제 내용 section */}
        </div>

        <div className='hidden lg:block lg:min-w-[400px]'>
          <div className='bg-white lg:sticky xl:top-[260px]'>
            <div className='flex flex-col gap-2 border border-gray200 p-4'>
              <div className='flex flex-col gap-6 border-b border-gray200 p-6'>
                <div className='text-left text-2xl'>총 상품 {items.length || 0}개</div>
                {items.map((item) => (
                  <div key={item.id} className='flex items-center border-b border-gray-100 py-5'>
                    <div className='max-h-[200px] max-w-[200px] overflow-hidden'>
                      <img
                        src={item.image}
                        className='h-full w-full border border-gray-200 bg-gray-100 object-cover'
                      ></img>
                    </div>

                    <div className='flex-grow px-5 text-base lg:text-lg xl:text-xl'>
                      <div className='mb-2'>{item.name}</div>
                      <div className='text-gray-600'>
                        {item.color}&nbsp;&nbsp;{item.size}
                      </div>
                      <div className='text-gray-600'>{item.amount}</div>
                    </div>

                    <div className='whitespace-nowrap text-center text-base font-bold lg:text-lg xl:text-xl'>
                      {item.price.toLocaleString()} 원
                    </div>
                  </div>
                ))}

                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between'>
                    <span>상품합계</span>
                    <span>{totalPrice.toLocaleString()}원</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>배송비</span>
                    <span>{totalDeliveryFee.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 p-6 text-right text-xl'>
                <div>결제예상금액</div>
                <strong>{(totalPrice + totalDeliveryFee).toLocaleString()}원</strong>
              </div>
              <button
                onClick={() => handlePaymentClick()}
                type='button'
                className='bg-black px-6 py-3 text-left text-xl text-white hover:opacity-70'
              >
                결제하기
              </button>
            </div>
          </div>
        </div>

        <div className={`${isVisible ? 'fixed inset-0 z-[100] bg-black bg-opacity-70' : null} lg:hidden`}>
          <div className='fixed bottom-0 left-0 right-0 min-w-[300px] bg-white'>
            <div className='flex flex-col gap-2 border-gray200 p-4 lg:border'>
              <div className='flex justify-between px-4'>
                <div className='mb- text-left text-xl'>총 상품 {items.length || 0}개</div>
                <button onClick={handleTogglePayment} className='text-xl text-gray-400 hover:text-gray-600'>
                  ✕
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${isVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className='flex flex-col gap-2 border-b border-gray200 p-4'>
                  {items.map((item) => (
                    <div key={item.id} className='flex items-center border-b border-gray-100 py-5'>
                      <div className='max-h-[200px] max-w-[200px] overflow-hidden'>
                        <img
                          src={item.image}
                          className='h-full w-full border border-gray-200 bg-gray-100 object-cover'
                        ></img>
                      </div>

                      <div className='flex-grow px-5 text-base lg:text-lg xl:text-xl'>
                        <div className='mb-2'>{item.name}</div>
                        <div className='text-gray-600'>
                          {item.color}&nbsp;&nbsp;{item.size}
                        </div>
                        <div className='text-gray-600'>{item.amount}</div>
                      </div>

                      <div className='whitespace-nowrap text-center text-base font-bold lg:text-lg xl:text-xl'>
                        {item.price.toLocaleString()} 원
                      </div>
                    </div>
                  ))}

                  <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                      <span>상품합계</span>
                      <span>{totalPrice.toLocaleString()}원</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>배송비</span>
                      <span>{totalDeliveryFee.toLocaleString()}원</span>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-2 p-4 text-right text-xl'>
                  <div>결제예상금액</div>
                  <strong>{(totalPrice + totalDeliveryFee).toLocaleString()}원</strong>
                </div>
              </div>
              <button
                onClick={() => handlePaymentClick()}
                type='button'
                className='bg-black px-6 py-3 text-left text-xl text-white hover:opacity-70'
              >
                <strong>
                  {(totalPrice + totalDeliveryFee).toLocaleString()}원 구매하기 ({items.length || 0}개)
                </strong>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 결제중 loading 모달 */}
      {loadingflag && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='mx-4 w-full max-w-md bg-white p-8 shadow-xl'>
            <div className='mb-6 flex items-center justify-center'>
              <div className='relative h-16 w-16'>
                <div className='absolute inset-0 rounded-full border-4 border-gray-200'></div>
                <div className='absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
              </div>
            </div>
            <h2 className='mb-4 text-center text-2xl font-bold text-gray-800'>결제 중입니다</h2>
            <p className='text-center text-gray-600'>
              결제 처리에는 약간의 시간이 소요될 수 있습니다. <br />
              잠시만 기다려 주세요.
            </p>
          </div>
        </div>
      )}

      {renderModalContent()}
    </div>
  );
};

export default CheckoutPage;
