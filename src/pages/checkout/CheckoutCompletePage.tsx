import completeCheck from '@/assets/icons/completeCheck.svg';
import { Link } from 'react-router-dom';

const CheckoutCompletePage = () => {
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
        <Link
          to={'/'}
          replace={true}
          className='hover border-gray300 bg-black px-4 py-3 text-white hover:border hover:bg-white hover:text-black'
        >
          홈페이지 이동
        </Link>
        <Link
          to={'/mypage'}
          replace={true}
          className='bg-black px-4 py-3 text-white hover:border hover:bg-white hover:text-black'
        >
          결제내역 이동
        </Link>
      </div>
    </div>
  );
};

export default CheckoutCompletePage;
