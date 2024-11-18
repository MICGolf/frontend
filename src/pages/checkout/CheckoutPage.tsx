import { CartItemData2 } from '@/assets/dummys/types';
import useModalState from '@/hooks/useModalState/useModalState';
import { useEffect, useState } from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import dropDownIco from '@/assets/icons/dropDownIco.svg';
import kakaopay from '@/assets/icons/kakaopay.svg';
import { Input } from '@/components/Input';

type CheckboxType = '개인정보' | '이용약관';

type CheckoutFormData = {
  deliveryRequest: string;
  detailAddress: string;
  fullAddress: string;
  paymentType: string;
  phoneNumber: string;
  senderName: string;
  zoneCode: string;
};

const CheckoutPage = () => {
  const { handleModalOpen, renderModalContent } = useModalState();
  const [selectedCheckbox, setSelectedCheckbox] = useState<CheckboxType[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const disabled = selectedCheckbox.includes('개인정보') && selectedCheckbox.includes('이용약관') ? false : true;

  const methods = useForm<CheckoutFormData>({
    mode: 'onChange',
  });
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const paymentType = watch('paymentType');

  const navigate = useNavigate();
  const location = useLocation();

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

    setValue('zoneCode', data.zonecode);
    setValue('fullAddress', localAddress + fullAddress);
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

  const handlePaymentClick = async (data: any) => {
    // 결제하기 버튼 클릭 시 로직
    console.log(data);

    if (data) {
      setLoadingFlag(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoadingFlag(false);
      navigate('/checkout/success');
    }
  };

  if (!location.state) {
    return (
      <div className='flex items-center justify-center pt-[300px]'>
        <div className='text-[48px]'>
          1. POST 주문번호 요청 <br />
          2. Response.주문번호를 기반으로 결제 요청
        </div>
      </div>
    );
  }

  // FIXME: 로케이션 상태로 받아오는게 아니라 주문번호 요청 및 응답을 통해 받아온 데이터로 처리
  const { items, totalDeliveryFee, totalPrice } = location.state as {
    items: CartItemData2[];
    totalDeliveryFee: number;
    totalPrice: number;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handlePaymentClick)} className='px-5 py-[200px]'>
        {/* 결제 section */}
        <div className='mx-auto flex max-w-[1220px] gap-4'>
          <div className='flex w-[1160px] flex-col gap-[64px] p-5'>
            {/* step 1 */}
            <div className='flex flex-col gap-[10px]'>
              <h2 className='mb-4 text-2xl'>주문자 정보</h2>
              <Input
                type='text'
                label='보내는 분'
                name='senderName'
                register={register}
                registerOptions={{ required: '보내는 분 성함을 입력해주세요' }}
                error={errors.senderName?.message}
              />
              <Input
                type='text'
                label='연락처 "-" 없이 입력'
                name='phoneNumber'
                register={register}
                registerOptions={{ required: '연락처를 입력해주세요' }}
                error={errors.phoneNumber?.message}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 입력
                  setValue('phoneNumber', value, { shouldValidate: true }); // 검증 실행
                }}
              />
            </div>

            {/* step 2 */}
            <div className='flex flex-col gap-[10px]'>
              <h2 className='mb-4 text-2xl'>배송 정보</h2>
              <div className='flex'>
                <Input
                  type='text'
                  label='우편번호'
                  name='zoneCode'
                  register={register}
                  registerOptions={{ required: '우편번호를 입력해주세요' }}
                  error={errors.zoneCode?.message}
                  maxLength={5}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 입력
                    setValue('zoneCode', value, { shouldValidate: true }); // 검증 실행
                  }}
                  className='flex-1'
                />
                <button
                  onClick={handleFindAddressClick}
                  type='button'
                  className='h-[50px] whitespace-nowrap bg-black px-3 py-2 text-white'
                >
                  우편번호 찾기
                </button>
              </div>
              <Input
                type='text'
                label='주소'
                name='fullAddress'
                register={register}
                registerOptions={{ required: '주소를 입력해주세요' }}
                error={errors.fullAddress?.message}
              />
              <Input
                type='text'
                label='상세주소'
                name='detailAddress'
                register={register}
                registerOptions={{ required: '상세주소를 입력해주세요' }}
                error={errors.detailAddress?.message}
              />
              <Input
                type='text'
                label='배송요청사항'
                name='deliveryRequest'
                register={register}
                registerOptions={{ required: '상세주소를 입력해주세요' }}
                error={errors.deliveryRequest?.message}
              />
            </div>

            {/* step 3 */}
            <div className='flex flex-col gap-[10px]'>
              <h2 className='text-2xl'>결제수단</h2>
              <div className='flex gap-6'>
                <label
                  className={`flex w-full items-center border px-3 py-2 transition-colors duration-300 ${paymentType === 'kakaopay' ? 'border-[#ffeb00] bg-[#ffeb00]' : 'border-neutral-300'}`}
                >
                  <input
                    type='radio'
                    value='kakaopay'
                    {...register('paymentType', { required: '결제 수단을 선택해주세요.' })}
                    hidden
                  />
                  <img src={kakaopay} alt='카카오페이 결제' className='h-5' />
                </label>
                <label
                  className={`w-full border px-3 py-2 transition-colors duration-300 ${paymentType === 'inicis' ? 'bg-primary text-secondary' : 'border-neutral-300'}`}
                >
                  <input
                    type='radio'
                    value='inicis'
                    {...register('paymentType', { required: '결제 수단을 선택해주세요.' })}
                    hidden
                  />
                  KG 이니시스
                </label>
              </div>
              <p className='text-sm text-red-500'>{errors.paymentType?.message}</p>
            </div>

            {/* step 4 */}
            <div className='flex flex-col gap-[10px]'>
              <h2 className='text-2xl'>개인정보 수집/제공</h2>
              <label className='flex cursor-pointer items-center gap-2'>
                <input type='checkbox' hidden checked={isAllChecked} onChange={handleToggleAll} />
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
              <label className='flex cursor-pointer items-center gap-2'>
                <input
                  type='checkbox'
                  hidden
                  checked={selectedCheckbox.includes('개인정보')}
                  onChange={() => handleToggle('개인정보')}
                />
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 ${selectedCheckbox.includes('개인정보') ? 'bg-black' : 'bg-white'}`}
                >
                  {selectedCheckbox.includes('개인정보') && (
                    <svg className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                  )}
                </div>
                개인정보 수집약관 동의&nbsp;
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    handleModalOpen('개인정보');
                  }}
                  className='cursor-pointer border-b border-blue700 text-blue700'
                >
                  약관 보기 →
                </span>
              </label>
              <label className='flex cursor-pointer items-center gap-2'>
                <input
                  type='checkbox'
                  hidden
                  checked={selectedCheckbox.includes('이용약관')}
                  onChange={() => handleToggle('이용약관')}
                />
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 ${selectedCheckbox.includes('이용약관') ? 'bg-black' : 'bg-white'}`}
                >
                  {selectedCheckbox.includes('이용약관') && (
                    <svg className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                  )}
                </div>
                이용약관 동의&nbsp;
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    handleModalOpen('이용약관');
                  }}
                  className='cursor-pointer border-b border-blue700 text-blue700'
                >
                  약관 보기 →
                </span>
              </label>
            </div>

            {/* 결제 내용 section */}
          </div>

          {/* 웹 뷰 결제 */}
          <div className='hidden lg:block lg:min-w-[500px]'>
            <div className='bg-white lg:sticky xl:top-[260px]'>
              <div className='flex flex-col gap-2 border border-gray200 p-4'>
                <div className='flex flex-col gap-6 border-b border-gray200 p-6'>
                  <div className='text-left text-2xl'>총 상품 {items.length || 0}개</div>
                  {items.map((item) => (
                    <div key={item.id} className='flex items-center border-b border-gray-100 py-5'>
                      <div className='max-h-[100px] max-w-[100px] overflow-hidden'>
                        <img
                          src={item.image}
                          className='h-full w-full border border-gray-200 bg-gray-100 object-cover'
                        ></img>
                      </div>

                      <div className='flex-grow px-5 text-base lg:text-lg xl:text-xl'>
                        <div className='mb-2'>{item.name}</div>
                        <div className='text-gray-600'>
                          {item.color.name}&nbsp;&nbsp;{item.size}
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
                  disabled={disabled}
                  type='submit'
                  className={`px-6 py-3 text-left text-xl transition-colors duration-700 ${disabled ? 'border border-gray300 bg-gray100 text-gray300' : 'bg-primary text-secondary hover:border hover:border-primary hover:bg-secondary hover:text-primary'}`}
                >
                  {(totalPrice + totalDeliveryFee).toLocaleString()}원 구매하기 ({items.length || 0}개)
                </button>
              </div>
            </div>
          </div>

          {/* 모바일 뷰 결제 */}
          <div
            className={`${isVisible ? 'fixed inset-0 z-[100] bg-black bg-opacity-50 backdrop-blur-sm' : null} lg:hidden`}
          >
            <div className='fixed bottom-0 left-0 right-0 z-[100] min-w-[300px] bg-white'>
              <div className='flex flex-col gap-2 border-gray200 p-4 lg:border'>
                <div className='flex justify-between px-4'>
                  <div className='mb- text-left text-xl'>총 상품 {items.length || 0}개</div>
                  <button
                    type='button'
                    onClick={handleTogglePayment}
                    className='text-xl text-gray-400 hover:text-gray-600'
                  >
                    <img
                      src={dropDownIco}
                      alt='드롭다운 열기 닫기 버튼'
                      className='transition-transform duration-300 ease-in-out'
                      style={{ transform: isVisible ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${isVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className='flex flex-col gap-2 border-b border-gray200 p-4'>
                    {items.map((item) => (
                      <div key={item.id} className='flex items-center border-b border-gray-100 py-5'>
                        <div className='max-h-[100px] max-w-[100px] overflow-hidden'>
                          <img
                            src={item.image}
                            className='h-full w-full border border-gray-200 bg-gray-100 object-cover'
                          ></img>
                        </div>

                        <div className='flex-grow px-5 text-base lg:text-lg xl:text-xl'>
                          <div className='mb-2'>{item.name}</div>
                          <div className='text-gray-600'>
                            {item.color.name}&nbsp;&nbsp;{item.size}
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
                  disabled={disabled}
                  type='submit'
                  className={`px-6 py-3 text-left text-xl transition-colors duration-700 ${disabled ? 'border border-gray300 bg-gray100 text-gray300' : 'bg-primary text-secondary hover:border hover:border-primary hover:bg-secondary hover:text-primary'}`}
                >
                  {(totalPrice + totalDeliveryFee).toLocaleString()}원 구매하기 ({items.length || 0}개)
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* 결제중 loading 모달 */}
      {loadingflag && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50'>
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
    </FormProvider>
  );
};

export default CheckoutPage;
