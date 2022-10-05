import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from './routes/Main';
import { Parse } from './routes/Parse';
import './styles/style.scss'

export const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className='container__content'>
          <Routes>
            <Route index element={<Main />} />
            <Route path='/parse' element={<Parse />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
