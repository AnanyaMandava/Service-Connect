import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.css'




// export default function BasicTable(props) {
//   function openBooking(row){
//     console.log(row.id)
//     // props.detailedBooking(row)
//     }

//     const formatDate = (dateString) => {
//       const date = new Date(dateString);
//       return date.toLocaleString(); // Converts to local timezone and formats as string
//     };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'scroll' }}>
//     <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
//       <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>S.No</TableCell>
//             <TableCell align="left">Service Name&nbsp;</TableCell>
//             <TableCell align="left">Service Type&nbsp;</TableCell>
//             <TableCell align="left">Service Provider&nbsp;</TableCell>
//             <TableCell align="left">Booking Date&nbsp;</TableCell>
//             <TableCell align="left">Payment Status&nbsp;</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {props.rows.filter((row)=>{
//             if(props.search==null)
//                 return row;
//             else if(props.search!=null && (row.service.serviceName.toLowerCase().includes(props.search.toLowerCase()) || row.serviceType.serviceType.toLowerCase().includes(props.search.toLowerCase()) || row.serviceProvider.fullname.toLowerCase().includes(props.search.toLowerCase()))){
//               return row
//             }
//             else{

//             }
//           }).map((row, index) => (
//             <TableRow
//               key={row._id}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               onClick={()=>{openBooking(row)}}
//               className="spanRowId"
//             >
//               <TableCell component="th" scope="row">
//                 {index + 1}
//               </TableCell>
//               <TableCell align="left">{row.service.serviceName}</TableCell>
//               <TableCell align="left">{row.serviceType.serviceType}</TableCell>
//               <TableCell align="left">{row.serviceProvider.fullname}</TableCell>
//               <TableCell align="left">{formatDate(row.bookingDate)}</TableCell>
//               <TableCell align="left">{row.paymentStatus}</TableCell>
//               <TableCell align="left">{
//               row.status=="Active"? <span className='ActiveStatus'>{row.status}</span> : row.status=="completed" ?<span className='FinishedStatus'>{row.status}</span>:<span className='NotActiveStatus'>{row.status}</span>
//               }</TableCell>

//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </Paper>
//   );
// }

export default function BasicTable(props) {
  function openBooking(row) {
    console.log(row.id);
    // props.detailedBooking(row)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Converts to local timezone and formats as string
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'scroll' }}>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell align="left">Service Name&nbsp;</TableCell>
              <TableCell align="left">Service Type&nbsp;</TableCell>
              <TableCell align="left">Service Provider&nbsp;</TableCell>
              <TableCell align="left">Booking Date&nbsp;</TableCell>
              <TableCell align="left">Payment Status&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.filter((row) => {
              if (!props.search) return row;
              const searchLower = props.search.toLowerCase();
              return (row.service?.serviceName.toLowerCase().includes(searchLower) ||
                      row.serviceType?.serviceType.toLowerCase().includes(searchLower) ||
                      row.serviceProvider?.fullname.toLowerCase().includes(searchLower));
            }).map((row, index) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => openBooking(row)}
                className="spanRowId"
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.service?.serviceName}</TableCell>
                <TableCell align="left">{row.serviceType?.serviceType}</TableCell>
                <TableCell align="left">{row.serviceProvider?.fullname}</TableCell>
                <TableCell align="left">{formatDate(row.bookingDate)}</TableCell>
                <TableCell align="left">{row.paymentStatus}</TableCell>
                <TableCell align="left">{
                  row.status === "Active" ? <span className='ActiveStatus'>{row.status}</span> :
                  row.status === "Completed" ? <span className='FinishedStatus'>{row.status}</span> :
                  <span className='NotActiveStatus'>{row.status}</span>
                }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
