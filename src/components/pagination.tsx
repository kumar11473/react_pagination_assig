import React, { useState } from 'react';

const PaginationComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Your card components here */}
      </div>
      <footer className="bg-gray-800 text-white py-3 fixed bottom-0 left-0 right-0 flex justify-center items-center">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded disabled:bg-gray-500"
        >
          Previous
        </button>
        <ul className="flex space-x-2 mx-2">
          
            <li key={1}>
              <a href="#" onClick={() => handlePageClick( 1)}
                className={`page-number ${currentPage ===  1 ? 'font-bold' : ''}`}
              >{ 1}</a>
            </li>
            <li key={2}>
              <a href="#" onClick={() => handlePageClick( 1)}
                className={`page-number ${currentPage ===  1 ? 'font-bold' : ''}`}
              >{ 1}</a>
            </li>
            <li key={1}>
              <a href="#" onClick={() => handlePageClick( 1)}
                className={`page-number ${currentPage ===  1 ? 'bg-blue-700' : ''}`}
              >{ 1}</a>
            </li>
            <li key={1}>
              <a href="#" onClick={() => handlePageClick( 1)}
                className={`page-number ${currentPage ===  1 ? 'font-bold' : ''}`}
              >{ 1}</a>
            </li>
            <li key={1}>
              <a href="#" onClick={() => handlePageClick( 1)}
                className={`page-number ${currentPage ===  1 ? 'font-bold' : ''}`}
              >{ 1}</a>
            </li>

          
        </ul>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="mx-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded disabled:bg-gray-500"
        >
          Next
        </button>
      </footer>
    </div>
  );
};

export default PaginationComponent;
