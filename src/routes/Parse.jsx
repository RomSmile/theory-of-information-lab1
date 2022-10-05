import React, { useState, useEffect } from 'react';
import { InputLabel, Input, styled, Button } from '@mui/material';
import axios from 'axios';

const ariaLabel = { 'aria-label': 'description' };

const CssInput = styled(Input)({
  '&:before': {
    borderColor: '#fff',
  },
  '&': {
    color: '#fff',
  },
  '&:after': {
    borderColor: '#e0fd03',
  },
});

export const Parse = () => {
  const [ textToRequest, setTextToRequest ] = useState('');
  const [ error, setError ] = useState(false);

  const getRequest = async () => {
    fetch(textToRequest).then(function (response) {
      // The API call was successful!
      return response.text();
    }).then(function (html) {
    
      // Convert the HTML string into a document object
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
    
      // Get the image file
      var img = doc.querySelector('img');
      console.log(img);
    
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  }

  return (
    <>
        <InputLabel
          style={{
            color: `${error ? 'red' : '#fff'}`,
            alignSelf: 'flex-start' 
          }}
          htmlFor="enterLink"
        >
          Enter the link of page
        </InputLabel>
        <CssInput
          id="enterLink"
          fullWidth
          placeholder="Enter link here"
          error={error}
          inputProps={ariaLabel}
          onChange={(ev) => {
            setTextToRequest(ev.target.value);
          }}
        />
        <Button
          size="medium"
          color="secondary"
          onClick={() => {
            getRequest()
          }}
          loadingPosition="start"
          variant="contained"
          style={{ margin: '10px 0 20px', alignSelf: 'flex-end' }}
        >
          Get result
        </Button>
    </>
  );
}