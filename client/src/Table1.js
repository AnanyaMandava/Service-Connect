import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function BasicTable({ rows, handleStatusChange }) {
    const [editStatusId, setEditStatusId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState({});

    const handleStatusEdit = (event, id) => {
        setSelectedStatus({ ...selectedStatus, [id]: event.target.value });
        handleStatusChange(id, event.target.value); // Save the status right after selection
    };

    const displayStatus = (row) => {
        if (editStatusId === row._id) {
            return (
                <Select
                    value={selectedStatus[row._id] || row.status}
                    onChange={(event) => handleStatusEdit(event, row._id)}
                    onBlur={() => setEditStatusId(null)} // Optional: close the dropdown when focus is lost
                    displayEmpty
                >
                    <MenuItem value="Upcoming">Upcomimg</MenuItem>
                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
            );
        } else {
            return (
                <div onClick={() => {
                    setEditStatusId(row._id);
                    setSelectedStatus({ ...selectedStatus, [row._id]: row.status });
                }} style={{ cursor: 'pointer' }}>
                    {row.status}
                </div>
            );
        }
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell align="left">Service Name&nbsp;</TableCell>
                        <TableCell align="left">Service Type&nbsp;</TableCell>
                        <TableCell align="left">Customer&nbsp;</TableCell>
                        <TableCell align="left">Booking Date&nbsp;</TableCell>
                        <TableCell align="left">Customer Mobile&nbsp;</TableCell>
                        <TableCell align="left">Address&nbsp;</TableCell>
                        <TableCell align="left">Status&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                            <TableCell align="left">{row.service.serviceName}</TableCell>
                            <TableCell align="left">{row.serviceType.serviceType}</TableCell>
                            <TableCell align="left">{row.user.fullname}</TableCell>
                            <TableCell align="left">{new Date(row.bookingDate).toLocaleString()}</TableCell>
                            <TableCell align="left">+1 {row.user.mobile}</TableCell>
                            <TableCell align="left">{`${row.user.address}, ${row.user.city}, ${row.user.state}, ${row.user.zipcode}`}</TableCell>
                            <TableCell align="left">{displayStatus(row)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    );
}

export default BasicTable;