import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { getSecuestros } from '../../redux/actions';

function PaginationComponent() {

  const dispatch = useDispatch();
  const filter = useSelector((state) => state.selectedFilter);
  const currentPagina = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);
  const vehicleType = useSelector((state) => state.vehicleType);

  const handlePage = (page) => {
    dispatch(getSecuestros(page, filter, vehicleType));
  };

  const handlePrev = () => {
    if (currentPagina === 1) return;
    handlePage(currentPagina - 1);
  };

  const handleNext = () => {
    if (currentPagina === totalPages) return;
    handlePage(currentPagina + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPagina > 3) pages.push("...");

      const startPage = Math.max(2, currentPagina - 1);
      const endPage = Math.min(totalPages - 1, currentPagina + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPagina < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === "number" && handlePage(page)}
        className={`px-4 py-2 text-sm font-semibold border border-[#0477AD] ${
          page === currentPagina
            ? "bg-[#0477AD] text-white"
            : "text-[#0477AD] hover:bg-gray-100"
        }`}
        disabled={page === "..."}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex items-center justify-center px-4 py-6">
      <div className="inline-flex shadow-sm bg-white border-2 border-[#0477AD]">
        <button onClick={handlePrev} disabled={currentPagina === 1}>
          <div className="px-2 py-2 border-r border-[#0477AD] hover:bg-gray-50">
            <ChevronLeftIcon className="h-5 w-5 text-[#0477AD]" />
          </div>
        </button>

        {renderPageNumbers()}

        <button onClick={handleNext} disabled={currentPagina === totalPages}>
          <div className="px-2 py-2 border-l border-[#0477AD] hover:bg-gray-50">
            <ChevronRightIcon className="h-5 w-5 text-[#0477AD]" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default PaginationComponent;
