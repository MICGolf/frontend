import completeCheck from '@/assets/icons/completeCheck.svg';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CheckoutCompletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timer, setTimer] = useState(5);
  const fromCheckout = location.state?.from === '/checkout';
  const linkStyle =
    'bg-primary px-4 py-3 text-secondary transition-colors duration-700 border border-primary hover:bg-secondary hover:text-primary';

  useEffect(() => {
    if (!fromCheckout) {
      alert('잘못된 접근입니다.');
      navigate('/', { replace: true });
    }
  }, [fromCheckout]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerId); // 타이머를 정리
          navigate('/'); // 랜딩 페이지로 이동
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // 1초 간격으로 실행

    return () => clearInterval(timerId);
  }, []);

  if (!fromCheckout) {
    return null;
  }

  return (
    <section className='flex h-screen w-full flex-col items-center justify-center gap-4'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <img src={completeCheck} alt='성공 체크 아이콘' />
        <div className='text-5xl font-[700]'>주문을 완료 했습니다</div>
        <div className='flex flex-col items-center'>
          <p className='text-2xl'>주문 정보를 확인하세요</p>
          <p className='text-sm text-gray200'>{timer}초 후 랜딩페이지로 이동합니다.</p>
        </div>
      </div>

      <div className='mt-4 flex justify-center gap-4'>
        <Link to={'/'} replace={true} className={`${linkStyle}`}>
          홈페이지 이동
        </Link>
        <Link to={'/mypage'} replace={true} className={`${linkStyle}`}>
          결제내역 이동
        </Link>
      </div>
    </section>
  );
};

export default CheckoutCompletePage;
