import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

type SliderProps = {
  images: string[];
};

export const MultipleSwiper = ({ images }: SliderProps) => {
  return (
    <div className='relative mx-auto w-full'>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={20}
        navigation
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          renderBullet: (_, className) => {
            return `
            <button 
              class="${className} relative focus:outline-none !my-6 !py-4 bg-transparent !m-0 w-full"
            >
              <div class="h-2 w-full transition-all duration-300 bg-black">
              </div>
            </button>
          `;
          },
        }}
        breakpoints={{
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1280: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1560: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='flex h-[465px] items-center justify-center bg-gray-100'>
              <img src={image} alt={`Slide ${index}`} className='h-full w-full object-cover' />
            </div>
          </SwiperSlide>
        ))}
        {/* 점 버튼을 출력할 컨테이너 */}
        <div className='swiper-pagination relative flex w-full !py-6'></div>
      </Swiper>
    </div>
  );
};
