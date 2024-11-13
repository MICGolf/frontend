import { cartItemData } from '@/assets/dummys/cartItemData';
import { useUserStore } from '@/config/store';
import useCartCalculations from '@/hooks/uesCartCalculations';
import { useCart } from '@/hooks/useCart';
import { useCartSelection } from '@/hooks/useCartSelection';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { user } = useUserStore();
  const { cartItems, syncGuestCartToUser } = useCart();
  const { selectedItems, isAllChecked, handleToggle, handleToggleAll, selectedProducts } =
    useCartSelection(cartItemData);
  const { totalPrice, totalDeliveryFee } = useCartCalculations(selectedProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  console.log(selectedItems);
  console.log(cartItems);

  useEffect(() => {
    syncGuestCartToUser();
  }, [user]);

  const paymentData = {
    items: selectedProducts,
    totalPrice,
    totalDeliveryFee,
  };

  const handlePayment = () => {
    if (selectedItems.length === 0) {
      alert('상품을 선택해주세요');
      return;
    }
    return user ? navigate('/checkout', { state: paymentData }) : setIsModalOpen(true);
  };

  const handleGuestPayment = () => {
    navigate('/checkout', { state: paymentData });
  };

  const handleLoginClick = () => {
    setIsModalOpen(false);
    navigate('/auth/signin');
  };

  return (
    <div className='mx-auto max-w-[1660px] pb-[120px] pt-[80px]'>
      <div>
        <div className='text-4xl font-[700]'>장바구니</div>
      </div>
      <div className='flex gap-4'>
        <div className='p-5 font-sans'>
          <div className='grid grid-cols-[50px_200px_1fr_220px_220px_50px] items-center border-y border-gray-200 py-4 font-bold'>
            <div>
              <label className='flex cursor-pointer items-center'>
                <input type='checkbox' className='hidden' onChange={handleToggleAll} checked={isAllChecked} />
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-sm border-2 ${isAllChecked ? 'bg-black' : 'bg-white'}`}
                >
                  {isAllChecked && (
                    <svg className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                  )}
                </span>
              </label>
            </div>
            <div className='col-span-2 text-center text-xl'>상품정보</div>
            <div className='text-center text-xl'>상품금액</div>
            <div className='text-center text-xl'>선택</div>
          </div>

          {/* FIX: cartItemData => data로 변경 예정 */}
          {cartItemData.map((item) => (
            <div
              key={item.id}
              className='grid grid-cols-[50px_200px_1fr_220px_220px_50px] items-center border-b border-gray-100 py-5'
            >
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

              <div className='h-[200px] w-[200px]'>
                <div className='h-full w-full border border-gray-200 bg-gray-100'></div>
              </div>

              <div className='px-5 text-xl'>
                <div className='mb-2 text-2xl'>{item.name}</div>
                <div className='text-gray-600'>
                  {item.color}&nbsp;&nbsp;{item.size}
                </div>
                <div className='text-gray-600'>{item.amount}</div>
              </div>

              <div className='text-center text-2xl font-bold'>{item.price.toLocaleString()} 원</div>

              <div className='flex flex-col items-center gap-2 px-2'>
                <div>
                  <button className='border border-gray200 bg-white px-6 py-3 text-2xl hover:opacity-70'>
                    옵션 변경
                  </button>
                </div>
                <div>
                  <button className='bg-black px-6 py-3 text-2xl text-white hover:opacity-70'>바로 구매</button>
                </div>
              </div>

              <button className='text-xl text-gray-400 hover:text-gray-600'>✕</button>
            </div>
          ))}
        </div>

        {/* 주문 section */}
        <div className='min-w-[386px]'>
          <div className='flex flex-col gap-2 border border-gray200 p-8'>
            <div className='flex flex-col gap-6 border-b border-gray200 p-6'>
              <div className='mb- text-left text-2xl'>총 상품 0개</div>
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
            <div className='flex flex-col gap-2 p-6 text-right text-2xl'>
              <div>결제예상금액</div>
              <strong>{(totalPrice + totalDeliveryFee).toLocaleString()}원</strong>
            </div>
            <button
              onClick={() => handlePayment()}
              type='button'
              className='bg-black px-6 py-3 text-left text-2xl text-white hover:opacity-70'
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
      {/* 버튼 section */}
      <div className='flex gap-2'>
        <button className='border border-gray200 p-2 text-gray700'>계속 쇼핑하기</button>
        <button className='border border-gray200 p-2 text-gray700'>선택 상품 삭제하기</button>
        <button className='border border-gray200 p-2 text-gray700'>장바구니 비우기</button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='flex gap-4 bg-white px-14 py-8'>
            <button onClick={handleLoginClick} className='bg-black px-6 py-4 text-white'>
              로그인 하기
            </button>
            <button onClick={handleGuestPayment} className='bg-black px-6 py-4 text-white'>
              비회원 결제
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
