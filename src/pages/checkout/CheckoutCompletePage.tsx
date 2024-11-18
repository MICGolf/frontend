import completeCheck from '@/assets/icons/completeCheck.svg';
import { Link } from 'react-router-dom';

const CheckoutCompletePage = () => {
  const linkStyle =
    'bg-primary px-4 py-3 text-secondary transition-colors duration-700 hover:border hover:border-primary hover:bg-secondary hover:text-primary';

  return (
    <div>
      <div className='mb-6 flex flex-col items-center justify-center gap-4 pt-[250px]'>
        <img src={completeCheck} alt='성공 체크 아이콘' />
        <div className='text-5xl font-[700]'>주문을 완료 했습니다</div>
        <div className='flex flex-col items-center'>
          <p className='text-2xl'>주문 정보를 확인하세요</p>
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
    </div>
  );
};

export default CheckoutCompletePage;
