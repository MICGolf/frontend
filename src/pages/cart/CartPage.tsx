import { useState } from 'react';
import CheckBox from './components/CheckBox';
import { useUserStore } from '@/config/store';
import { useCart } from '@/hooks/useCart';
import { useCartSelection } from '@/hooks/useCartSelection';
import useCartCalculations from '@/hooks/uesCartCalculations';
import { Link, useNavigate } from 'react-router-dom';
import useModalState from '@/hooks/useModalState/useModalState';
import SalePrice from '@/components/SalePrice';
import { SaleProvider } from '@/components/SaleProvider';
import SaleLabel from '@/components/SaleLabel';
import GlobalCounterBtn from '@/components/GlobalCounterBtn';
import CloseIco from '@/assets/icons/CloseIco';
import { useMediaQuery } from 'react-responsive';
import PaymentModal from './components/PaymentModal';
import PaymentStickyBox from './components/PaymentStickyBox';

const CartPage = () => {
  const { user } = useUserStore();
  const { cartItems, syncGuestCartToUser } = useCart();
  const { selectedItems, handleToggle, selectedProducts } = useCartSelection(cartItems);
  const { totalPrice, totalDeliveryFee } = useCartCalculations(selectedProducts);
  const navigate = useNavigate();
  const paymentData = {
    items: selectedProducts,
    totalPrice,
    totalDeliveryFee,
  };
  const { handleModalOpen, renderModalContent } = useModalState({ paymentData });
  const [count, setCount] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const shouldResponsive = useMediaQuery({ maxWidth: '1280px' });

  const handlePayment = () => {
    if (user) {
      navigate('/checkout', {
        state: paymentData,
      });
    } else {
      handleModalOpen('결제모달');
    }
  };

  return (
    <article className='mx-auto w-full max-w-[1660px] px-[24px] py-[160px] transition-all duration-300 ease-in-out xl:px-[130px]'>
      {/* 타이틀 */}
      <h2 className='mb-[24px] w-full text-3xl font-semibold'>장바구니</h2>
      <section className='flex w-full h-full gap-12 flex-2'>
        <div className='flex flex-col w-full'>
          {/* 장바구니 헤더 영역 */}
          <div className='flex justify-between w-full py-4 text-sm border-y border-gray300'>
            <div className='flex items-center w-full gap-3'>
              <CheckBox />
              <span>전체선택 ({count})</span>
            </div>
            <div className='flex justify-end w-full'>
              <button>선택삭제</button>
            </div>
          </div>
          {/* 장바구니 리스트 영역 */}
          <ul className='flex flex-col w-full gap-8 my-6'>
            {cartItems.map((item, idx) => (
              <li key={idx} className='flex h-[150px] items-center gap-6'>
                <div>
                  <CheckBox />
                </div>

                <Link to={`/shop/detail/${item.id}`} className='h-full min-w-[100px] overflow-hidden md:min-w-[200px]'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='object-cover object-center w-full h-full transition-all duration-300 hover:scale-105'
                  />
                </Link>

                <div className='flex flex-col justify-between w-full h-full'>
                  <div className='flex flex-col'>
                    <h3 className='mb-1 text-sm font-semibold md:text-lg'>{item.name}</h3>
                    <p className='text-xs text-gray700'>
                      [옵션: {item.color.name} / {item.size}]
                    </p>
                  </div>
                  <SaleProvider data={item}>
                    <SaleLabel />
                  </SaleProvider>

                  <SalePrice data={item} originalSize='sm' saleSize='md' />
                </div>
                <div className='flex flex-col items-end justify-center w-full h-full gap-2'>
                  <GlobalCounterBtn count={count} setCount={setCount} maxCount={item.stock} amount={item.amount} />
                  <button className='h-[40px] w-[130px] border border-primary bg-primary text-sm text-secondary transition-all duration-300 hover:bg-secondary hover:text-primary'>
                    바로구매
                  </button>
                </div>
                <button className='hidden h-full cursor-pointer xl:block'>
                  <CloseIco />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 결제 창 */}
        {shouldResponsive ? (
          <PaymentModal totalPrice={totalPrice} totalDeliveryFee={totalDeliveryFee} handlePayment={handlePayment} />
        ) : (
          <PaymentStickyBox totalPrice={totalPrice} totalDeliveryFee={totalDeliveryFee} handlePayment={handlePayment} />
        )}
      </section>
      {/* 비회원일 경우 뜨는 모달 창 */}
      {renderModalContent()}
    </article>
  );
};

export default CartPage;
