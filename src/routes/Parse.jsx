import React, { useState, useEffect } from 'react';
import { InputLabel, Input, styled, Button, CircularProgress } from '@mui/material';
import { TableOfNumbers } from '../components/TableOfNumbers';

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
  const [ error404, setError404 ] = useState(false);
  const [ html, setHtml ] = useState({});
  const [ loaded, setLoaded ] = useState(false);

  useEffect(() => {
    if (!textToRequest.length) {
      setHtml({});
      setError404(false);
      setLoaded(false);
    }
  }, [textToRequest])

  const getRequest = async () => {
    setLoaded(true)
    setError404(false);
    const response = await fetch(`https://get-html-js.herokuapp.com/api/v1/path?str=${textToRequest}`)
    if (response.ok) {
      const html = await response.json();
      console.log(response.status.code)
      setHtml(html.html);
    } else {
      setHtml({});
      setError404(true);
      setLoaded(false);
    }
  }

  return (
    <>
      <InputLabel
        style={{
          color: `${error404 ? 'red' : '#fff'}`,
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
        error={error404}
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
      {loaded && !Object.keys(html).length && <CircularProgress />}
      {Object.keys(html).length !== 0 && textToRequest.length !== 0 && <TableOfNumbers objText={html} />}
      {error404 && (
        <span>Not valid link</span>
      )}
    </>
  );
}