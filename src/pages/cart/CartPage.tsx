import { cartItemData } from '@/assets/dummys/cartItemData';
import { useUserStore } from '@/config/store';
import useCartCalculations from '@/hooks/uesCartCalculations';
import { useCart } from '@/hooks/useCart';
import { useCartSelection } from '@/hooks/useCartSelection';
import useModalState from '@/hooks/useModalState/useModalState';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import minus from '@/assets/icons/minus.svg';
import plus from '@/assets/icons/plus.svg';

const CartPage = () => {
  const { user } = useUserStore();
  const { cartItems, syncGuestCartToUser } = useCart();
  const { selectedItems, isAllChecked, handleToggle, handleToggleAll, selectedProducts } =
    useCartSelection(cartItemData);
  const { totalPrice, totalDeliveryFee } = useCartCalculations(selectedProducts);
  const navigate = useNavigate();
  const paymentData = {
    items: selectedProducts,
    totalPrice,
    totalDeliveryFee,
  };
  const { handleModalOpen, renderModalContent } = useModalState({ paymentData });
  const [count, setCount] = useState(1);

  useEffect(() => {
    syncGuestCartToUser();
  }, [user]);

  const handlePayment = () => {
    if (selectedItems.length === 0) {
      alert('상품을 선택해주세요');
      return;
    }
    return user ? navigate('/checkout', { state: paymentData }) : handleModalOpen('결제모달');
  };

  return (
    <div className='flex w-full justify-center pt-[210px]'>
      <div className='flex w-[1320px] flex-col'>
        <div className='flex w-full justify-center lg:gap-4'>
          <div className='p-5 font-sans'>
            {/* FIX: cartItemData => data로 변경 예정 */}
            <div className='flex justify-start px-[20px] text-4xl font-[700]'>장바구니</div>
            {cartItemData.map((item) => (
              <div key={item.id} className='flex items-center gap-4 border-b border-gray-100 py-5'>
                {/* 체크박스 */}
                <div className='text-center'>
                  <label
                    className={`flex h-8 w-8 items-center justify-center rounded-sm border-2 ${selectedItems.includes(item.id) ? 'bg-black' : 'bg-white'}`}
                  >
                    <input
                      type='checkbox'
                      className='hidden'
                      onChange={() => handleToggle(item.id)}
                      checked={selectedItems.includes(item.id)}
                    />
                    {selectedItems.includes(item.id) && (
                      <svg className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                      </svg>
                    )}
                  </label>
                </div>
                {/* 상품 이미지 */}
                {/* lg:h-[140px] lg:w-[140px] xl:h-[200px] xl:w-[200px] */}
                <div className='max-h-[200px] max-w-[200px] overflow-hidden'>
                  <img src={item.image} className='h-full w-full border border-gray-200 bg-gray-100 object-cover'></img>
                </div>

                <div className='items flex flex-1 flex-col items-start gap-1 px-2 xl:flex-row xl:items-center xl:gap-4'>
                  {/* 상품정보 */}
                  <div className='flex flex-1 flex-col text-base lg:text-lg xl:text-xl'>
                    <div className='mb-2'>{item.name}</div>
                    <div className='text-gray-600'>
                      {item.color}&nbsp;&nbsp;{item.size}
                    </div>
                  </div>
                  {/* 가격 */}
                  <div className='whitespace-nowrap text-center text-xl font-bold'>
                    {item.price.toLocaleString()} 원
                  </div>
                  {/* 선택 */}
                  <div className='flex flex-row items-center gap-2 xl:flex-col'>
                    <div
                      className='item-center flex h-[28px] w-[110px] justify-around border border-gray200 text-base xl:h-[40px] xl:w-[130px] xl:text-lg'
                      aria-live='polite'
                      role='group'
                      aria-labelledby='quantity-selection'
                    >
                      <button
                        type='button'
                        onClick={() => {
                          if (count !== 1) {
                            setCount((prev) => prev - 1);
                          }
                        }}
                        className='flex flex-1 items-center justify-center'
                        aria-label='수량 감소'
                      >
                        <img src={minus} alt='수량 감소 버튼' />
                      </button>
                      <span
                        id='quantity-selection'
                        className='text-item flex flex-1 items-center justify-center text-[16px] font-thin'
                        aria-live='assertive'
                      >
                        {count}
                      </span>
                      <button
                        type='button'
                        onClick={() => setCount((prev) => prev + 1)}
                        className='flex flex-1 items-center justify-center'
                        aria-label='수량 증가'
                      >
                        <img src={plus} alt='수량 증가 버튼' />
                      </button>
                    </div>
                    <button className='hidden h-[28px] w-[110px] bg-black text-base text-white hover:opacity-70 sm:block xl:h-[40px] xl:w-[130px] xl:text-lg'>
                      바로 구매
                    </button>
                  </div>
                </div>

                {/* 제거 */}
                <button className='text-xl text-gray-400 hover:text-gray-600'>✕</button>
              </div>
            ))}
            <div className='flex gap-2'>
              <button className='border border-gray200 p-2 text-gray700'>계속 쇼핑하기</button>
              <button className='border border-gray200 p-2 text-gray700'>선택 상품 삭제하기</button>
              <button className='border border-gray200 p-2 text-gray700'>장바구니 비우기</button>
            </div>
          </div>

          {/* 주문 section */}
          <div>
            <div className='fixed bottom-0 left-0 right-0 min-w-[300px] bg-white lg:sticky xl:top-[260px]'>
              <div className='flex flex-col gap-2 border border-gray200 p-4'>
                <div className='flex flex-col gap-2 border-b border-gray200 p-6'>
                  <div className='mb- text-left text-xl'>총 상품 {cartItemData.length}개</div>
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
                  onClick={() => handlePayment()}
                  type='button'
                  className='bg-black px-6 py-3 text-left text-xl text-white hover:opacity-70'
                >
                  결제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 section */}
      {renderModalContent()}
    </div>
  );
};

export default CartPage;
