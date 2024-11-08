import imageSection1 from '@/assets/imgs/image_section-1.jpg';
import MultipleItems from './components/MultipleItems';

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
        <div className='absolute z-20 mt-[100vh] h-[100vh] w-full bg-white'></div>

        {/* 컨텐츠 섹션 */}
        <div className='mt-screen px-[130px]'>
          <h1>Best Product</h1>
          <div>
            <MultipleItems />
          </div>
        </div>
      </section>
    </>
  );
};
export default HomePage;
