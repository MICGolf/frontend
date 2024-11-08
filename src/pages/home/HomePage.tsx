import imageSection1 from '@/assets/imgs/image_section-1.jpg';
import MultipleItems from './components/MultipleItems';

const HomePage = () => {
  return (
    <>
      <img
        className='fixed top-0 z-[-1] h-[100vh] w-full'
        style={{
          backgroundImage: `url(${imageSection1})`,
          backgroundSize: 'cover',
        }}
      ></img>
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
