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

export const TableOfNumbers = ({ text }) => {
  const [ objOfSymbols, setObjOfSymbols ] = useState({});

  useEffect(() => {
    // (
    //   async () => {
    //     const res = await fetch("https://libretranslate.com/translate", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         q: text,
    //         source: "en",
    //         target: "ua",
    //         format: "text",
    //       }),
    //       headers: { "Content-Type": "application/json" }
    //     });

    //     console.log(res);
    //   }
    // )()

    let obj = {};

    text.split('').forEach((item) => {
      if (item in obj) {
        obj = { ...obj, [item]: obj[item] + 1 };
      } else {
        obj = { ...obj, [item]: 1 };
      }
    })

    Object.keys(obj).map(item => obj[item] /= text.length);
    
    setObjOfSymbols({ ...obj });
  }, [ text ])


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
                <StyledTableCell align="center">{item}</StyledTableCell>
                <StyledTableCell align="center">{objOfSymbols[item]}</StyledTableCell>
              </StyledTableRow>
            ))
            : ''
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}