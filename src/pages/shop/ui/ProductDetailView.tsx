import minus from '@/assets/icons/minus.svg';
import plus from '@/assets/icons/plus.svg';
import { ProductDetailViewProps } from '../detailPage/types';

const ProductDetailView = ({ data, onSubmit }: ProductDetailViewProps) => {
  return (
    <section className='flex h-[45vw] max-h-[1080px]' role='region' aria-labelledby='product-detail-header'>
      <figure className='flex h-full w-full flex-1 flex-col overflow-y-scroll border border-r-primary'>
        {data.images.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt={item.name}
            className='h-full w-full object-cover'
            role='img'
            aria-label={item.name}
          />
        ))}
        <figcaption className='sr-only'>상품의 다양한 각도: 정면, 측면, 디테일</figcaption>
      </figure>

      <form
        onSubmit={onSubmit}
        className='flex h-full flex-1 flex-col justify-between gap-20 px-[50px] pt-[50px]'
        aria-labelledby='product-form'
      >
        <div className='flex flex-col gap-4'>
          <h2 className='text-5xl font-bold'>{data.name}</h2>
          <p className='text-4xl font-light' aria-live='polite'>
            ₩{data.price.toLocaleString()}
          </p>
        </div>

        <div className='flex flex-col gap-[10px]'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-2xl font-medium'>색상</h3>
            <ul className='flex gap-[7px]'>
              {data.colors.map((color) => (
                <li key={color}>
                  <button
                    className={'h-7 w-7'}
                    style={{ backgroundColor: color }}
                    aria-label={`색상: ${color}`}
                    role='button'
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-2xl font-medium'>수량</h3>
            <div
              className='item-center border-gray200 flex h-[42px] w-[132px] justify-around border'
              aria-live='polite'
              role='group'
              aria-labelledby='quantity-selection'
            >
              <button type='button' className='flex flex-1 items-center justify-center' aria-label='수량 감소'>
                <img src={minus} alt='수량 감소 버튼' />
              </button>
              <span
                id='quantity-selection'
                className='text-item flex flex-1 items-center justify-center text-[20px] font-thin'
                aria-live='assertive'
              >
                1
              </span>
              <button type='button' className='flex flex-1 items-center justify-center' aria-label='수량 증가'>
                <img src={plus} alt='수량 증가 버튼' />
              </button>
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='flex h-[72px] w-full items-center justify-start border border-primary bg-primary px-[30px] py-[10px] text-4xl font-light text-secondary transition-colors duration-700 hover:bg-transparent hover:text-primary'
          aria-label='장바구니에 상품 추가'
        >
          장바구니 추가하기
        </button>
      </form>
    </section>
  );
};

export default ProductDetailView;
