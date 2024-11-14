import imageSection1 from '@/assets/imgs/image_section-1.jpg';
import MultipleItems from './components/MultipleItems';
import { useEffect, useRef } from 'react';
import { useHeaderStore } from '@/config/store';

const HomePage = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const { headerRef } = useHeaderStore();
  console.log('저장됐나요', headerRef);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  };

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('트리거 성공');
      } else {
        // 헤더의 색상을 다시 돌려줘야함
        console.log('트리거 해제');
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  useEffect(() => {
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <>
      <img
        className='fixed top-0 z-[-1] h-[100vh] w-full'
        style={{
          backgroundImage: `url(${imageSection1})`,
          backgroundSize: 'cover',
        }}
        ref={imageRef}
      />
      <div className='z-20 mt-[100vh] w-full bg-white'>
        <div className='px-[130px] py-[100px]'>
          <h1 className='mb-[30px] px-2 text-4xl font-bold'>Best Product</h1>
          <MultipleItems />
        </div>
        <div className='py-[100px]'>
          <h1 className='mb-[30px] px-[138px] text-4xl font-bold'>Promotion</h1>
          <div className='h-[470px] bg-gray100'></div>
        </div>
        <div className='px-[130px] py-[100px]'>
          <h1 className='mb-[30px] px-2 text-4xl font-bold'>MD’s Choice</h1>
          <MultipleItems />
        </div>
      </div>
    </>
  );
};
export default HomePage;
