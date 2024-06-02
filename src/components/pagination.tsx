import React, { useState } from 'react';

interface PropType {
  currentPage:number,
  setCurrentPage:(arg:number)=>void,
  setOffset:(arg:number)=>void
}

const PaginationComponent: React.FC<PropType> = ({currentPage, setCurrentPage,setOffset}) => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [offset,setOffset] = useState<number>(10)
  const [totalPages,setTotalpages] = useState<number>(10)
  
  let pages:number[]=[]
  for(let i = 1;i<=Math.ceil(totalPages);i++) pages.push(i)

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      
    }
    // console.log(currentPage)
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleOffset : React.ChangeEventHandler<HTMLSelectElement> = (e)=>{
    // console.log(e.target.value)
    setOffset(parseInt(e.target.value))
  }

  // const handlePageClick:React.MouseEventHandler<HTMLButtonElement>  = (page) => {
  //   setCurrentPage(page);
  // };

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
          {'<'}
        </button>
        <ul className="flex space-x-2 mx-2">
        {
          pages.map((page,index)=>{
            return <button key={index} onClick={(e)=>setCurrentPage(page)} className= {` ${currentPage===page ? 'bg-blue-800': 'bg-white' } text-black p-1 rounded-md `} >{page}</button>
          })
        }
          
        </ul>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="mx-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded disabled:bg-gray-500"
        >
          {'>'}
        </button>


        <div className="dropdown-container ">
        <label htmlFor="offset-dropdown " className="mr-2">Select Offset :</label>
        <select onChange={handleOffset} className="offset-dropdown p-2 border rounded bg-inherit text-red-600 outline-none">
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </div>
      </footer>

    </div>
  );
};

export default PaginationComponent;
