import { client } from '@/api/client';
import { useAuthStore } from '@/config/store';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthInitializer = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { setUser, clearUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        clearUser();
        setIsInitialized(true);
        return;
      }

      // INFO: 사용자 정보 조회, accessToken이 유효한지 체크하는 API
      try {
        const response = await client.get('/auth/validate', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.data) {
          setUser(response.data);
        } else {
          clearUser();
          navigate('/auth/signin', { replace: true });
        }
      } catch (error) {
        console.error(error);
        clearUser();
        navigate('/auth/signin', { replace: true });
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [setUser, clearUser, navigate]);

  if (!isInitialized) return;

  return <Outlet />;
};

export default AuthInitializer;
