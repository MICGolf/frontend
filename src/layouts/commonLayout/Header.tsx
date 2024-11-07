import logoBlack from '@/assets/logo-black.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div>
        <img src={logoBlack} alt='믹골프 로고' />
      </div>
      <nav>
        <Link to={'/shop'}></Link>
        <Link to={'/event'}></Link>
        <Link to={'/notice'}></Link>
      </nav>
      <div></div>
    </header>
  );
};

export default Header;
