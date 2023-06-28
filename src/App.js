import { React, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
    </Routes>
  );
}

export default App;
