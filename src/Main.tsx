import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import App from "./App";
import Cart from "./components/Cart";



const Main:React.FC = ()=>{
const [favStatus,setFavStatus] = useState<boolean>(false)

    return(
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<App favStatus={favStatus} setFavStatus={setFavStatus} />} />
          <Route path='/cart' element={<Cart favStatus={favStatus} setFavStatus={setFavStatus}/>} /> 
    
        </Routes>
      </BrowserRouter>
    )
}

export default Main;