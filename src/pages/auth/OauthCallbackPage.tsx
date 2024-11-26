import { client } from '@/api/client';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type LoginType = 'kakao' | 'naver';

const OauthCallbackPage = () => {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  useEffect(() => {
    const fetchOauthCodePost = async () => {
      const type = localStorage.getItem('loginType') as LoginType;

      const response = await client.post('/auth/callback', {
        type: type,
        code: code,
      });
      console.log('인가코드 전송성공: ', response.data);
      return response.data;
    };

    fetchOauthCodePost();
  }, []);
  return <div className='flex h-[1000px] items-center justify-center'>Oauth Callback</div>;
};

export default OauthCallbackPage;
