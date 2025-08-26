import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { reviewImgs } from '@/assets/dummys/reviewData';

export default function ReviewCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
  };

  return (
    <div className='slider-container'>
      <Slider {...settings} className='review-slider'>
        {reviewImgs.map((item) => (
          <div key={item.id} className='pr-3'>
            <div className='relative overflow-hidden'>
              <img
                src={item.image}
                alt={`리뷰이미지 ${item.id}`}
                className='w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105'
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
