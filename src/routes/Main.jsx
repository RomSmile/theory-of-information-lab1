import React, { useState } from 'react';
import { InputText } from '../components/InputText';
import { TableOfNumbers } from '../components/TableOfNumbers';

export const Main = () => {
  const [ objText, setObjText ] = useState('');

  return (
    <>
      <InputText setObjText={setObjText} />
      {Object.keys(objText).length
        ? <TableOfNumbers objText={objText} />
        : ''
      }
    </>
  );
}
