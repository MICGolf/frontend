import { useState } from "react";
import ArrowLeft from "@/assets/arrow_L.svg";
import ArrowRight from "@/assets/arrow_R.svg";
import DropdownIcon from "@/assets/dropdown.svg";

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

  //페이지 범위 계산
  const getPageRange = () => {
    const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
    const endPage = Math.min(startPage + pageRange - 1, totalPages);
    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageRange();

  return (
    <div className="w-full mx-auto px-[130px] py-5">
      <p className="mb-[75px] text-[40px] text-primary">Event</p>

      <div className="flex gap-3 mb-[93px]">
        <button className="w-[307px] h-[41px] bg-secondary text-primary font-thin text-[20px] border border-primary hover:bg-primary hover:text-secondary transition">
          전체({dummyData.length})
        </button>
        <button className="w-[307px] h-[41px] bg-primary text-secondary font-thin text-[20px] hover:bg-secondary hover:text-primary hover:border hover:border-primary transition">
          진행중(0)
        </button>
        <button className="w-[307px] h-[41px] bg-primary text-secondary font-thin text-[20px] hover:bg-secondary hover:text-primary hover:border hover:border-primary transition">
          종료(0)
        </button>
      </div>

      <div className="flex items-center justify-end mb-6">
        <div className="flex items-center text-base font-medium cursor-pointer text-primary px-[19.5px] py-[13px]">
          인기순
          <img src={DropdownIcon} alt="Dropdown Icon" className="pl-[6px]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[38px] mb-6">
        {dummyData
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((item) => (
            <div className="flex flex-col items-start bg-secondary" key={item.id}>
              <div className="w-full h-[591px] bg-[#f6f6f6] mb-5 "></div>
              <p className="text-lg font-semibold text-primary mb-[6px]">{item.title}</p>
              <p className="text-sm text-primary">{item.date}</p>
            </div>
          ))}
      </div>

      <div className="flex items-center justify-center mt-8 space-x-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 ${currentPage === 1 ? "text-gray300" : "text-primary"}`}
        >
          <img src={ArrowLeft} alt="Arrow Left" />
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-2 py-1 ${page === currentPage
              ? "font-bold text-primary border-b-2 border-primary"
              : "text-gray300"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 ${currentPage === totalPages ? "text-gray300" : "text-primary"}`}
        >
          <img src={ArrowRight} alt="Arrow Right" />
        </button>
      </div>
    </div>
  );
};

export default EventMainPage;
