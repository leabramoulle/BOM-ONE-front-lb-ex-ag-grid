import React from 'react';
import Cpn from '../cpn/cpn';
import './homePage.scss';

function HomePage() {
  return (
    <div className="main-container">
      <h1 className='main-title'>CPN List</h1>
      <Cpn />
    </div>
  );
}

export default HomePage;