import React, { useState, useEffect } from 'react';
import BasicTable from '../Table';
import './MyBookings.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function MyBookings() {
    const [bookingData, setBookingData] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/all/getallcustbookings`).then((res) => {
            setBookingData(res.data);
            setShowSpinner(false);
        });
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <div className='container-fluid bookDrone'>
                <div className='row welcomeHeadingRow'>
                    {showSpinner && (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {!showSpinner && (
                        <div className='col-sm-4 welcomeHeading'>
                            <h3>Welcome to Bookings!</h3>
                            <p>Check the status of your service bookings here</p>
                        </div>
                    )}
                </div>
                <div className='row bookDroneTable'>
                    {!showSpinner && (
                        <div className='col-sm'>
                            <div className='row searchRow'>
                                <div className='col-sm-2 searchCol'>
                                    <input type='text' placeholder='Search' onChange={(e) => handleSearch(e)} />
                                </div>
                            </div>
                            <BasicTable rows={bookingData} search={search} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MyBookings;
