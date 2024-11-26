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

  return <div>MyPage</div>;
};

export default MyPage;
