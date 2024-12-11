import { client } from '@/api/client';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const KakaoCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get('code');
  useEffect(() => {
    const fetchOauthCodePost = async () => {
      if (!code) {
        throw new Error('인가 코드가 누락되었습니다.');
      }

      try {
        const response = await client.post(
          '/oauth/kakao',
          {},
          {
            headers: {
              code,
            },
          }
        );
        localStorage.setItem('accessToken', response.data.access_token);

        navigate('/');
        return response.data;
      } catch (error) {
        console.error(error);
        alert('로그인 중 에러가 발생했습니다.');
        navigate('/auth/signin', { replace: true });
      }
    };

    fetchOauthCodePost();
  }, []);

  return <div className='flex h-[1000px] items-center justify-center'>로그인 처리</div>;
};

export default KakaoCallbackPage;
