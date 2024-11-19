import { bannerImage, Homeimages1, Homeimages2, promotionImage } from '@/assets/dummys/productListDatas';
import { MultipleSwiper } from './components/MultipleSwiper';
import { BannerSwiper } from './components/BannerSwiper';

const HomePage = () => {
  return (
    <>
      <BannerSwiper images={bannerImage} />

      <div className='z-20 mt-[100vh] w-full bg-white'>
        <div className='px-[130px] py-[100px]'>
          <h1 className='mb-[30px] px-2 text-4xl font-bold'>Best Product</h1>
          <MultipleSwiper images={Homeimages2} />
        </div>
        <div className='py-[100px]'>
          <h1 className='mb-[30px] px-[138px] text-4xl font-bold'>Promotion</h1>
          <div className='h-[470px] bg-gray100'>
            <img src={promotionImage[0]} alt='' className='h-full w-full object-cover' />
          </div>
        </div>
        <div className='px-[130px] py-[100px]'>
          <h1 className='mb-[30px] px-2 text-4xl font-bold'>MD’s Choice</h1>
          <MultipleSwiper images={Homeimages1} />
        </div>
      </div>
    </>
  );
};
export default HomePage;
