import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';

import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';


import Cart from './components/Cart';
import Main from './Main';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <StrictMode>
    <Main/>
  </StrictMode>
);


