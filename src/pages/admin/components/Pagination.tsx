import { useEffect } from 'react';
import { PaginationProps } from './type';

const Pagination = ({ total = 200, page, setPage }: PaginationProps) => {
  const limit = Number(localStorage.getItem('pageListLimit') || '100'); //page_size

  const numPages = Math.ceil(total / limit);

  const showedLecture = new Array(numPages).fill(0);
  //린트가 알려주는 방법도 있음
  useEffect(() => {}, [total]);
  return (
    <div className='mt-5 flex items-center justify-center'>
      <button type='button' onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {showedLecture.map((_, index) => (
        <button
          type='button'
          key={index + 1}
          onClick={() => setPage(index + 1)}
          className={index + 1 === page ? 'font-semibold text-black' : 'font-thin text-neutral-500'}
        >
          {index + 1}
        </button>
      ))}
      <button type='button' onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
