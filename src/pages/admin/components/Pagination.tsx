import { useEffect } from 'react';
import { PaginationProps } from './type';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ total = 200, page, setPage }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = Number(localStorage.getItem('pageListLimit') || '10');
  const numPages = Math.ceil(total / limit);
  const showedLecture = new Array(numPages).fill(0);
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('page', String(page));
    setSearchParams(currentParams);
  }, [page]);
  return (
    <div className='mt-5 flex items-center justify-center'>
      <button type='button' onClick={() => setPage(page - 1)} disabled={page === 1} className='p-1'>
        &lt;
      </button>
      {showedLecture.map((_, index) => (
        <button
          type='button'
          key={index + 1}
          onClick={() => setPage(index + 1)}
          className={`p-1 ${index + 1 === page ? 'font-semibold text-black' : 'font-thin text-neutral-500'}`}
        >
          {index + 1}
        </button>
      ))}
      <button type='button' onClick={() => setPage(page + 1)} disabled={page === numPages} className='p-1'>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
