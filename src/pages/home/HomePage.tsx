import imageSection1 from '@/assets/imgs/image_section-1.jpg';

const HomePage = () => {
  return (
    <>
      <section className='relative'>
        <div
          className='fixed z-10 h-[100vh] w-full'
          style={{
            backgroundImage: `url(${imageSection1})`,
            backgroundSize: 'cover',
          }}
        ></div>
        <div className='absolute z-20 mt-[100vh] h-[400dvh] w-full bg-white'></div>
      </section>

      {/* 컨텐츠 섹션 */}
      <section className='mt-screen relative px-[130px]'>
        <h1>Best Product</h1>
        <div>
          <div></div>
        </div>
        <div></div>
      </section>
    </>
  );
};
export default HomePage;
