import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/auth/signin', { replace: true });
    }
  }, []);

  return (
    <div className='flex h-[100vh] w-full items-center justify-center'>
      <div className='mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg'>
        <div className='p-6'>
          <div className='mb-4 flex items-center space-x-4'>
            <div className='animate-pulse rounded-full bg-blue-500 p-2'></div>
            <h2 className='text-2xl font-bold text-blue-600'>마이페이지 안내</h2>
          </div>
          <p className='mb-4 text-gray-600'>
            추후 업데이트를 통해 마이페이지를 추가 할 예정이니, <br />
            기대해 주세요.
          </p>
          <div className='flex items-center space-x-2 text-sm text-blue-500'>
            <span>곧 더 많은 기능이 추가될 예정입니다</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
