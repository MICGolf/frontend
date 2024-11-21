import CartIco from '@/assets/icons/CartIco';
import UserIco from '@/assets/icons/UserIco';
import { Link } from 'react-router-dom';

const UserUtilities = () => {
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
    </ul>
  );
};

export default UserUtilities;
