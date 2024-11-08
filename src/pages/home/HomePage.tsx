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
          <h1>Best Product</h1>
          <MultipleItems />
        </div>
      </div>
      <div className='h-[400px] bg-slate-600'>1</div>
    </>
  );
};
export default HomePage;
