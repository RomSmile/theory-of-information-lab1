import React, { useState } from "react";
import Button from '@mui/material/Button';
import './style.scss'

export const InputText = ({ setText }) => {
  const [ enteredText, setEnteredText ] = useState('');

  return (
    <>
      <textarea
        className="enter-message"
        onChange={(ev) => {
          setEnteredText(ev.target.value);
        }}
      />
      <Button
        size="medium"
        color="secondary"
        onClick={() => {
          setText(enteredText)
        }}
        loadingPosition="start"
        variant="contained"
        style={{ alignSelf: 'flex-end', margin: '10px 0 20px' }}
      >
        Start
      </Button>
    </>
  );
};
