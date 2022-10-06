import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  TableCell,
  tableCellClasses,
  styled,
} from '@mui/material';

export const TableOfNumbers = ({ objText }) => {
  const [ amountOfInfo, setAmountOfInfo ] = useState(0);
  const [ arrToRender, setArrToRender ] = useState([])

  useEffect(() => {
    let info = 0;

    const arr = [
      ...Object.keys(objText).sort((first, second) => {
        if (objText[first] > objText[second]) {
          return -1;
        } else if (objText[first] === objText[second]) {
          return 0;
        } else {
          return 1;
        }
      })
    ];

    for (let i = 0; i < Object.keys(objText).length; i++) {
      info += objText[Object.keys(objText)[i]] * Math.log2(objText[Object.keys(objText)[i]]);
    }

    setArrToRender([ ...arr ]);
    setAmountOfInfo(-1 * info);
  }, [objText])

  const copyHandler = () => {
    if (!Object.keys(objText)) {
      return;
    }

    const str = arrToRender.map(item => `${item}: ${objText[item]}`)
      .join('\n') + '\n' + `Shannon formula: ${amountOfInfo}`;

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
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Shannon formula</StyledTableCell>
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
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">symbol</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrToRender.length
              ? arrToRender.map((item, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell align="center" style={{ padding: "16px 8px"}}>{item}</StyledTableCell>
                  <StyledTableCell align="center">{objText[item]}</StyledTableCell>
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