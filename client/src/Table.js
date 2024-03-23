import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.css'




export default function BasicTable(props) {
  function openBooking(row){
    console.log(row.id)
    props.detailedBooking(row)
    }
  return (
    <Paper sx={{ width: '100%', overflow: 'scroll' }}>
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Service ID</TableCell>
            <TableCell align="left">Farmland</TableCell>
            <TableCell align="left">Land Type&nbsp;</TableCell>
            <TableCell align="left">Service&nbsp;</TableCell>
            <TableCell align="left">Time&nbsp;</TableCell>
            <TableCell align="left">Status&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.filter((row)=>{
            if(props.search==null)
                return row;
            else if(props.search!=null && (row.farmLand.split('$')[0].toLowerCase().includes(props.search.toLowerCase()) || row.serviceType.toLowerCase().includes(props.search.toLowerCase()))){
              return row
            }
            else{

            }
          }).map((row) => (
            <TableRow
              key={row.bookingId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={()=>{openBooking(row)}}
              className="spanRowId"
            >
              <TableCell component="th" scope="row">
                {row.bookingId}
              </TableCell>
              <TableCell align="left">{row.farmLand && row.farmLand.split('$')[0]}</TableCell>
              <TableCell align="left">{row.farmLand && row.farmLand.split('$')[1]}</TableCell>
              <TableCell align="left">{row.serviceType}</TableCell>
              <TableCell align="left">{row.fromDate}</TableCell>
              <TableCell align="left">{
              row.status=="Active"? <span className='ActiveStatus'>{row.status}</span> : row.status=="completed" ?<span className='FinishedStatus'>{row.status}</span>:<span className='NotActiveStatus'>{row.status}</span>
              }</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}
