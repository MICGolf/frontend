import imageSection1 from '@/assets/imgs/image_section-1.jpg';
import MultipleItems from './components/MultipleItems';

const HomePage = () => {
  return (
    <>
      <img className='fixed z-[-1] h-full w-full object-cover' src={imageSection1} />

      <section className='h-[100vh] w-full'>
        <div className='mt-[100vh] h-full bg-white px-[130px]'>
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
