import imageSection1 from '@/assets/imgs/image_section-1.jpg';
import { useEffect, useState } from 'react';
const HomePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 진행도를 0~1 사이의 값으로 계산
      const scrolled = window.scrollY; // 스크롤된 높이
      const maxScroll = window.innerHeight; // 현재 스크롤 최대 높이
      const progress = Math.min(scrolled / maxScroll, 1);
      console.log(progress);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className='relative min-h-[200vh]'>
        {/* 이미지 컨테이너 */}
        <div
          className='fixed left-0 top-0 w-full overflow-hidden'
          style={{
            height: `${100 - scrollProgress * 100}vh`, // 스크롤에 따라 높이가 줄어듦
            transition: 'height 0.1s ease-out',
          }}
        >
          <div
            className='h-screen w-full bg-cover bg-center'
            style={{
              backgroundImage: `url(${imageSection1})`,
            }}
          />
        </div>
      </div>
      {/* 컨텐츠 섹션 */}
      <div className='mt-screen relative'>
        <div className='container mx-auto px-4 py-16'>
          <h2 className='mb-8 text-3xl font-bold'>Best Product</h2>
          {/* 제품 컨텐츠 */}
        </div>
      </div>
    </>
  );
};
export default HomePage;
