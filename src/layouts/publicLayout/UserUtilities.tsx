import CartIco from '@/assets/icons/CartIco';
import UserIco from '@/assets/icons/UserIco';
import { useAuthStore } from '@/config/store';
import { Link } from 'react-router-dom';

const UserUtilities = () => {
  const { user, clearUser } = useAuthStore();

  const handleLogoutClick = () => {
    localStorage.removeItem('accessToken');
    clearUser();
  };

  return (
    <ul className='flex w-full justify-end gap-[16px]'>
      <li>
        <Link to={'/cart'} className='h-[25px] w-[25px]'>
          <CartIco />
        </Link>
      </li>
      <li>
        <Link to={'/mypage'} className='h-[25px] w-[25px]'>
          <UserIco />
        </Link>
      </li>
      {user && (
        <li>
          <div className='h-[25px]'>
            <p onClick={handleLogoutClick} className='cursor-pointer whitespace-nowrap'>
              로그아웃
            </p>
          </div>
        </li>
      )}
    </ul>
  );
};

export default UserUtilities;
