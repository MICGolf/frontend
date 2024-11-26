import DefaultImg from '@/assets/imgs/logoWhite.svg';
import { X } from 'lucide-react';
import { useState } from 'react';

const HistoryFab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedType, setClickedType] = useState('최근');

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // const history = localStorage.getItem('history');
  // const dataHistory = history ? JSON.parse(history) : [];

  const dummyHistory = [
    {
      date: '2024-11-21',
      products: [
        {
          id: 1,
          name: '믹골프 파우치',
          price: 10000,
          img: 'https://via.placeholder.com/60',
        },
        {
          id: 2,
          name: '믹골프 파우치',
          price: 20000,
          img: 'https://via.placeholder.com/60',
        },
      ],
    },
    {
      date: '2024-11-20',
      products: [
        {
          id: 3,
          name: '믹골프 골프채 1 blue',
          price: 30000,
          img: 'https://via.placeholder.com/60',
        },
        {
          id: 4,
          name: '믹골프 골프채 2 red',
          price: 40000,
          img: 'https://via.placeholder.com/60',
        },
      ],
    },
  ];

  const validateTextLength = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }

    return text;
  };

  return (
    <>
      <button
        type='button'
        onClick={toggleModal}
        className='fixed bottom-20 right-20 z-[11] h-[50px] w-[50px] rounded-full bg-primary'
        style={{ boxShadow: '0 0 10px #7000FF' }}
      >
        <img src={DefaultImg} alt='' className='h-[50px] w-[50px] cursor-pointer' />
      </button>

      <div
        onClick={toggleModal}
        className={`fixed inset-0 z-[100] flex transform justify-end bg-black bg-opacity-50 transition-opacity duration-300 ${isModalOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} bg-black`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`h-full w-[395px] transform overflow-auto bg-white px-8 py-10 transition-transform duration-300 ${isModalOpen ? 'translate-x-0' : 'translate-x-[400px]'}`}
        >
          <div className='flex justify-between'>
            <h2>히스토리</h2>
            <button type='button' onClick={toggleModal}>
              <X />
            </button>
          </div>
          <div className='flex w-full'>
            <div
              className={`flex-1 transform border-b transition-colors ${clickedType === '최근' ? 'border-b-2 border-primary' : 'border-neutral-300'} py-4 text-center`}
            >
              <button onClick={() => setClickedType('최근')}>최근 본</button>
            </div>
            <div
              className={`flex-1 transform border-b transition-colors ${clickedType === '관심' ? 'border-b-2 border-primary' : 'border-neutral-300'} py-4 text-center`}
            >
              <button onClick={() => setClickedType('관심')}>관심상품</button>
            </div>
          </div>
          <div className='flex w-full justify-end pt-4'>
            <button className='transform rounded-full px-2 py-1 text-sky-900 transition-colors duration-300 hover:bg-primary hover:text-secondary'>
              전체삭제
            </button>
          </div>
          <div className='relative py-8'>
            {dummyHistory.map((item) => (
              <div key={item.date} className='relative z-50'>
                <div className='flex pb-4 font-light'>
                  <div className='rounded-full border border-neutral-200 bg-white px-2 py-1 text-neutral-600'>
                    {item.date}
                  </div>
                </div>
                <div>
                  {item.products.map((product) => (
                    <div className='flex items-center gap-2 pb-6 pl-8 font-light'>
                      <div className='h-[66px] w-[66px]'>
                        <img src={product.img} alt={product.name} className='h-full w-full' />
                      </div>
                      <div>
                        <div className='mb-[10px] text-[10px] text-primary'>MIC GOLF</div>
                        <div className='text-[16px]'>[MIC GOLF] {validateTextLength(product.name, 10)}</div>
                        <div className='text-[16px]'>{product.price.toLocaleString()}원</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className='absolute left-[64px] top-0 h-full w-[1px] bg-neutral-200'></div>
          </div>
          <div className='flex justify-center py-8 font-light'>
            <p>
              쇼핑 히스토리는 최근 30일간, <br />
              최대 100개까지 보관됩니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryFab;
