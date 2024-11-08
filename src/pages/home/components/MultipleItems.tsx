import { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MultipleItems() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<Slider>(null); // Slider 레퍼런스 생성
  const pagePerSlide = 4;
  const slideLength = 19;
  const totalSlides = Math.ceil(slideLength / pagePerSlide); // Assuming 100/4 (slidesToScroll) = 25 total segments

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: pagePerSlide,
    slidesToScroll: pagePerSlide,
    beforeChange: (_current: number, next: number) => setActiveSlide(next / 4),
    appendDots: () => (
      <div className='relative w-full'>
        <div className='flex w-full justify-between'>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => sliderRef.current?.slickGoTo(index * 4)} // 특정 슬라이드로 이동
              className={`relative my-6 h-1 w-full transition-all duration-300 ${index === activeSlide ? 'bg-black' : 'bg-gray300'}`}
            />
          ))}
        </div>
      </div>
    ),
    customPaging: () => <div className='hidden' />, // Hide default dots but keep functionality
  };

  return (
    <div className='mx-auto w-full'>
      <div className='slider-container'>
        <Slider ref={sliderRef} {...settings}>
          {Array.from({ length: slideLength }).map((_, index) => (
            <div key={index}>
              <div className='flex h-[465px] items-center justify-center rounded-lg bg-gray-200'>
                <h3 className='text-xl font-semibold'>{index}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
