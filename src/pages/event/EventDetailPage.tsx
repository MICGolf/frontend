import { useState } from 'react';

const EventDetailPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const dummyComments = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    author: `ID ${index + 1}`,
    date: `2000.00.00`,
    content: `댓글작성 ${index + 1}`,
  }));

  const totalPages = Math.ceil(dummyComments.length / commentsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className='mx-auto w-[1024px] px-8 py-10'>
      {/* Event Header */}
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-semibold'>제목</h1>
        <p className='mb-4 text-sm text-gray-600'>2024.10.21 ~ 2024.10.21</p>
        <div className='mb-5 h-[400px] w-full bg-gray-200'></div>
      </div>

      {/* Comment Form */}
      <div className='mb-8'>
        <h2 className='mb-4 text-xl font-semibold'>댓글쓰기</h2>
        <textarea
          className='mb-2 h-24 w-full rounded border border-gray-300 p-3'
          placeholder='로그인 후 이용해 주세요'
        />
        <div className='mb-2 flex items-center justify-between text-sm'>
          <span className='text-gray-400'>0/500</span>
        </div>
        <button className='w-full bg-black py-2 text-white'>등록하기</button>
      </div>

      {/* Comments */}
      <div className='mb-8'>
        <h2 className='mb-4 text-xl font-semibold'>댓글</h2>
        {dummyComments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage).map((comment) => (
          <div key={comment.id} className='mb-4 border-b border-gray-300 pb-4'>
            <p className='text-sm font-semibold'>{comment.author}</p>
            <p className='text-sm text-gray-500'>{comment.date}</p>
            <p className='mt-2 text-sm'>{comment.content}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center space-x-2'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 ${currentPage === 1 ? 'text-gray-300' : 'text-black'}`}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-2 ${page === currentPage ? 'font-bold text-black' : 'text-gray-500'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 ${currentPage === totalPages ? 'text-gray-300' : 'text-black'}`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage;
