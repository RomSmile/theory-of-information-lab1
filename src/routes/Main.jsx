import React, { useState } from 'react';
import { InputText } from '../components/InputText';
import { TableOfNumbers } from '../components/TableOfNumbers';

export const Main = () => {
  const [ text, setText ] = useState('');

  return (
    <>
      <InputText setText={setText} />
      {text
        ? <TableOfNumbers text={text} />
        : ''
      }
    </>
  );
}
