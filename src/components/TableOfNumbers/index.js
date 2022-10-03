import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export const TableOfNumbers = ({ text }) => {
  const [ objOfSymbols, setObjOfSymbols ] = useState({});
  const [ amountOfInfo, setAmountOfInfo ] = useState(0);

  useEffect(() => {
    let obj = {};
    let info = 0;

    text.split('').forEach((item) => {
      if (item in obj) {
        obj = { ...obj, [item]: obj[item] + 1 };
      } else {
        obj = { ...obj, [item]: 1 };
      }
    })

    Object.keys(obj).map(item => obj[item] /= text.length);
    Object.keys(obj).sort((first, second) => {
      if (obj[first] < obj[second]) {
        return -1;
      } else if (obj[first] === obj[second]) {
        return 0;
      } else {
        return 1;
      }
    });

    for (let i = 0; i < Object.keys(obj).length; i++) {
      info += obj[Object.keys(obj)[i]] * Math.log2(obj[Object.keys(obj)[i]]);
    }

    setAmountOfInfo(-1 * info);
    setObjOfSymbols({ ...obj });
  }, [ text ])

  const copyHandler = () => {
    if (!Object.keys(objOfSymbols)) {
      return;
    }

    const str = Object.keys(objOfSymbols)
      .map(item => `${item}: ${objOfSymbols[item]}`)
      .join('\n');

    navigator.clipboard.writeText(str)
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return(
    <>
      <TableContainer component={Paper} aria-label="customized table" style={{ marginBottom: '20px'}}>
        <Table sx={{ minWidth: 320 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Shannon formule</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell align="center">{amountOfInfo}</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} aria-label="customized table">
        <Table sx={{ minWidth: 320 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">symbol</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(objOfSymbols).length
              ? Object.keys(objOfSymbols).map((item, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell align="center" style={{ padding: "16px 8px"}}>{item}</StyledTableCell>
                  <StyledTableCell align="center">{objOfSymbols[item]}</StyledTableCell>
                </StyledTableRow>
              ))
              : ''
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        size="medium"
        color="secondary"
        onClick={copyHandler}
        loadingPosition="start"
        variant="contained"
        style={{margin: '10px 0 20px' }}
      >
        Copy
      </Button>
    </>
  )
}