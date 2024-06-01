import React from 'react';
import MainContainer from './components/MainContainer'

import './App.css';
import './index.css'
import Pagination from './components/pagination';
import Card from './components/Card';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <MainContainer/>
    <Pagination/>
    </div>
  );
}

export default App;
