import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useMediaQuery } from 'react-responsive';

type EventPopupProps = {
  images: string[];
};

const EventPopup = ({ images }: EventPopupProps) => {
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60 + 60 * 24 + 41);
  const [isEventPopupHidden, setIsEventPopupHidden] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const isEventPopupHidden = Cookies.get('EventPopupHidden') === 'true';
    setIsEventPopupHidden(isEventPopupHidden);
  }, []);

  const handleTodayClose = () => {
    Cookies.set('EventPopupHidden', 'true', { expires: 1 });
    setIsEventPopupHidden(true);
  };

  const handleClose = () => {
    setIsEventPopupHidden(true);
  };

  if (isEventPopupHidden) return null;

  return (
    !isTablet && (
      <div className='fixed bottom-24 right-10 z-[20] h-[344px] w-[540px]'>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={1}
          slidesPerGroup={1}
          navigation
          autoplay={{
            delay: 2000,
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className='flex h-[344px] w-[540px] flex-col'>
              <div className='flex h-full w-full items-center bg-gray-100'>
                <div className='flex-1 p-6'>
                  <span className='rounded-full bg-orange-500 px-2 py-1 text-xs font-medium text-white'>
                    타임딜 진행중
                  </span>
                  <h1 className='mb-6 mt-4 text-4xl font-normal'>{formatTime(timeLeft)}</h1>
                  <p className='mb-4 text-lg font-medium text-gray-700'>믹골프 런칭 특별 프로모션</p>
                  <p className='mb-4 text-base font-light text-gray-700'>
                    오직 48H, 놓치면 후회할
                    <br />
                    특별한 제안 40% OFF
                  </p>
                </div>
                <div className='relative flex h-full w-full flex-1 items-center justify-center bg-gray-100'>
                  <img src={image} alt={`Slide ${index}`} className='h-full w-full object-cover' />
                  <div className='absolute bottom-4 right-4 rounded-full bg-black bg-opacity-70 px-2 py-1 text-xs font-light text-white'>
                    {index + 1} / {images.length}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='flex justify-between bg-white px-6 py-4 font-light text-gray-400'>
          <button type='button' onClick={handleTodayClose}>
            오늘 그만보기
          </button>
          <button type='button' onClick={handleClose}>
            닫기
          </button>
        </div>
      </div>
    )
  );
};

export default EventPopup;
