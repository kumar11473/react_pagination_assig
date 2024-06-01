import React, { MouseEventHandler, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';

const Navbar: React.FC = () => {

  const [query,setQuery] =useState<string>()
  const [order,setOrder] =useState<string>()

  const handleClick :React.MouseEventHandler<HTMLButtonElement> = (e):void=>{
    console.log(e)
    console.log('search clicked',query)

  }
  const handleSort :React.ChangeEventHandler<HTMLSelectElement>  = (e):void=>{
    console.log('changed order')
    // console.log(e.target.value)
    setOrder(e.target.value)
  }
  const handleCart = ()=>{
    
  }

  return (
    <div className="navbar-container bg-gray-800 p-3">
      <div className="navbar flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-4">

        <div className="sort-dropdown-container text-xl bg-red-700 p-2 rounded-md">
          <select onChange={handleSort} className="sort-dropdown bg-red-700 text-white outline-none" >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
              {/* overflow-hidden  */}
        <div className="search-bar-container flex items-center bg-white rounded-lg  overflow-hidden  w-full md:w-auto">
          <input type="text" className="search-bar p-2 w-full outline-none" placeholder="Search..." value={query} onChange={e=>setQuery(e.target.value)} />
          <button onClick={handleClick} className="search-btn p-2 text-gray-800" >
            <IoSearch />
          </button>
        </div>

        <div onClick={handleCart} className="fav-icon-container text-3xl text-white">
          <FaShoppingCart />
        </div>

      </div>
    </div>
  );
};

export default Navbar;
