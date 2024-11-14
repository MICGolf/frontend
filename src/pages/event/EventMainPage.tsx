import { useState } from 'react';
import ArrowLeft from '@/assets/arrow_L.svg';
import ArrowRight from '@/assets/arrow_R.svg';
import DropdownIcon from '@/assets/dropdown.svg';
import { Link } from 'react-router-dom';

const EventMainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageRange = 5;

  const dummyData = Array.from({ length: 120 }, (_, index) => ({
    id: index + 1,
    title: `이벤트 ${index + 1}`,
    date: `2024.11.01 ~ 2024.11.11`,
  }));

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 페이지 범위 계산
  const getPageRange = () => {
    const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
    const endPage = Math.min(startPage + pageRange - 1, totalPages);
    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageRange();

  return (
    <div className='mx-auto w-full px-[130px] py-5 pt-[200px]'>
      <p className='mb-[75px] text-[40px] text-primary'>Event</p>

      <div className='mb-[93px] flex gap-3'>
        <button className='h-[41px] w-[307px] border border-primary bg-secondary text-[20px] font-thin text-primary transition hover:bg-primary hover:text-secondary'>
          전체({dummyData.length})
        </button>
        <button className='h-[41px] w-[307px] bg-primary text-[20px] font-thin text-secondary transition hover:border hover:border-primary hover:bg-secondary hover:text-primary'>
          진행중(0)
        </button>
        <button className='h-[41px] w-[307px] bg-primary text-[20px] font-thin text-secondary transition hover:border hover:border-primary hover:bg-secondary hover:text-primary'>
          종료(0)
        </button>
      </div>

      <div className='mb-6 flex items-center justify-end'>
        <div className='flex cursor-pointer items-center px-[19.5px] py-[13px] text-base font-medium text-primary'>
          인기순
          <img src={DropdownIcon} alt='Dropdown Icon' className='pl-[6px]' />
        </div>
      </div>

      <div className='mb-6 grid grid-cols-2 gap-[38px]'>
        {dummyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
          <Link key={item.id} to={`/event/${item.id}`}>
            <div className='flex flex-col items-start bg-secondary'>
              <div className='mb-5 h-[591px] w-full bg-[#f6f6f6]'></div>
              <p className='mb-[6px] text-lg font-semibold text-primary'>{item.title}</p>
              <p className='text-sm text-primary'>{item.date}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className='mt-8 flex items-center justify-center space-x-3'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 ${currentPage === 1 ? 'text-gray300' : 'text-primary'}`}
        >
          <img src={ArrowLeft} alt='Arrow Left' />
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-2 py-1 ${
              page === currentPage ? 'border-b-2 border-primary font-bold text-primary' : 'text-gray300'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 ${currentPage === totalPages ? 'text-gray300' : 'text-primary'}`}
        >
          <img src={ArrowRight} alt='Arrow Right' />
        </button>
      </div>
    </div>
  );
};

export default EventMainPage;
