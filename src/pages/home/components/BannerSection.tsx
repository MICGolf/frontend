import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { bannerImage } from '@/assets/dummys/productListDatas';
// import { useQuery } from '@tanstack/react-query';
// import { homeApi } from '@/api';

const BannerSection = () => {
  // const { data: bannerData } = useQuery({
  //   queryKey: ['banner'],
  //   queryFn: async () => {
  //     const response = await homeApi.getBannersOrPromotions({ type: 'banner' });
  //     return response.data;
  //   },
  // });

  return (
    <div className='fixed top-0 z-[-1] h-[100vh] w-full'>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        navigation
        className='h-full'
        autoplay={{
          delay: 3000, // 3초 간격으로 자동 전환
          disableOnInteraction: true, // 사용자 조작 후에도 자동 재생 유지
        }}
        loop // 슬라이드가 끝나면 처음으로 돌아가도록 설정
        pagination={{ clickable: true }}
      >
        {bannerImage.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='h-full w-full bg-cover bg-center' style={{ backgroundImage: `url(${image})` }} />
          </SwiperSlide>
        ))}
        <div className='swiper-pagination'></div>
      </Swiper>
    </div>
  );
};

export default BannerSection;
