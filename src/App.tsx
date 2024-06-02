import React, { useRef, useState } from 'react';
import MainContainer from './components/MainContainer'

import './App.css';
import './index.css'
import Pagination from './components/pagination';
import Card from './components/Card';
import Navbar from './components/Navbar';


import { ProductType } from './components/MainContainer'

interface  PropType {
  favStatus:boolean,
  setFavStatus:React.Dispatch<React.SetStateAction<boolean>>
}


function App({favStatus,setFavStatus}:PropType) {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [offset,setOffset] = useState<number>(10)
  const [totalPages,setTotalpages] = useState<number>(10)
  let [Data,setData] =useState<Array<ProductType>>([])

  // const [favStatus,setFavStatus] = useState<boolean>(false)


  let CACHE =useRef<any>({})
  
  console.log('app.tsx re-render')
  return (
    <div className="App">
      <Navbar/>
      <MainContainer  
        favStatus={favStatus}
        setFavStatus={setFavStatus}
        CACHE={CACHE}
        currentPage={currentPage}
        offset={offset}
        totalPages={totalPages}
      />

    <Pagination 
      currentPage={currentPage}
      setCurrentPage = {setCurrentPage}
      setOffset = {setOffset}
    />
    </div>
  );
}

export default App;
