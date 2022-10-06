import React, { useState } from "react";
import Button from '@mui/material/Button';
import './style.scss'

export const InputText = ({ setObjText }) => {
  const [ enteredText, setEnteredText ] = useState('');

  return (
    <>
      <textarea
        className="enter-message"
        onChange={(ev) => {
          setEnteredText(ev.target.value);
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Button
          size="medium"
          color="secondary"
          onClick={() => {
            let obj = {};
            enteredText.toLowerCase().split('').forEach((item) => {
              if (item in obj) {
                obj = { ...obj, [item]: obj[item] + 1 };
              } else {
                obj = { ...obj, [item]: 1 };
              }
            })

            Object.keys(obj).map(item => obj[item] /= enteredText.length)

            setObjText(obj)
          }}
          loadingPosition="start"
          variant="contained"
          style={{ margin: '10px 0 20px' }}
        >
          Start
        </Button>
        <Button
          size="medium"
          color="secondary"
          onClick={() => {
            document.location.href += 'parse'
          }}
          loadingPosition="start"
          variant="contained"
          style={{ margin: '10px 0 20px' }}
        >
          Parse
        </Button>
      </div>
    </>
  );
};
