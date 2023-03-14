import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Pagination.css"; // importe o arquivo CSS aqui

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const [showNextButton, setShowNextButton] = useState(
    currentPage !== totalPages
  );

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
    setShowNextButton(pageNumber !== totalPages);
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>
      <p className="pagination-info">{`Página ${currentPage} de ${totalPages}`}</p>
      {showNextButton && (
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
