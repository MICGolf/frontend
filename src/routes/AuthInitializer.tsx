import { client } from '@/api/client';
import { useAuthStore } from '@/config/store';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const AuthInitializer = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { setUser, clearUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      // INFO: 첫 요청 이후 발생되는 훅 실행 막기 위한 장치
      if (isInitialized) return;

      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        clearUser();
        setIsInitialized(true);
        return;
      }

      // INFO: 사용자 정보 조회, accessToken이 유효한지 체크하는 API
      try {
        const response = await client.get('/auth/protected', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.data) {
          setUser(response.data);
        } else {
          clearUser();

          if (location.state === '/mypage') {
            navigate('/auth/signin', { replace: true });
          }
        }
      } catch (error) {
        console.error(error);
        clearUser();
        if (location.state === '/mypage') {
          navigate('/auth/signin', { replace: true });
        }
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [navigate, setUser, clearUser]);

  if (!isInitialized) return;

  return <Outlet />;
};

export default AuthInitializer;
