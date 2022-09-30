import React, { useState } from 'react';
import { InputText } from './components/InputText';
import { TableOfNumbers } from './components/TableOfNumbers';
import './styles/style.scss'

export const App = () => {
  const [ text, setText ] = useState('');

  console.log(text);

  return (
    <div className="App">
      <div className="container">
        <div className='container__content'>
          <InputText setText={setText} />
          {text
            ? <TableOfNumbers text={text} />
            : ''
          }
        </div>
      </div>
    </div>
  );
}

export default App;
