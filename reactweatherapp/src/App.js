import React, { useState } from 'react';
import './App.css';
import Search from './Components/search/search.js';

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  };

  return (
    <div className="main">
      <Search onSearchChange={handleOnSearchChange} />
    </div>
  );
}

export default App;
