import React, { Component,useState,useEffect } from 'react';
import BasicTable from '../Table'
import './MyBookings.css';
import DetailedBooking from './DetailedBooking';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function MyBookings() {
    const [bookingData,setBookingData]=useState();
    function createData(id, plot, type, service, time,status) {
        return { id, plot, type, service, time,status };
      }
    useEffect(()=>{
        const auth = JSON.parse(localStorage.getItem("auth"));
        const url='http://localhost:8080/agriDrone/getAllFarmerBookings/'+auth.loginjson[0].userName
        axios.get(url).then((res)=>{
            setBookingData(res.data);
            setShowSpinner(false);
        })
      },[])
      
      
    //   const bookingData = [
    //     createData('#1001', "West Plot A","Crop","Rental:Data Collection", "09/30/22","Active"),
    //     createData('#1011', "North Plot B","Nursery","Rental:Payload", "09/23/22","Complete"),
    //     createData('#1021', "East Plot A","Crop","Rental:Data Collection", "09/22/22","Complete"),
    //     createData('#1031', "West Plot A","Crop","Rental:Data Collection", "09/20/22","Complete"),
    //     createData('#1041', "South Plot D","Crop","Rental:Data Collection", "09/12/22","Complete"),
    //     createData('#1051', "East Plot B","Crop","Rental:Data Collection", "09/11/22","Complete"),
    //     createData('#1061', "West Plot A","Crop","Rental:Data Collection", "09/10/22","Complete"),
    //     createData('#1071', "East Plot B","Crop","Rental:Data Collection", "09/11/22","Complete"),
    //     createData('#1081', "West Plot A","Crop","Rental:Data Collection", "09/10/22","Complete"),
    //     createData('#1091', "East Plot B","Crop","Rental:Data Collection", "09/11/22","Complete"),
    //     createData('#1101', "West Plot A","Crop","Rental:Data Collection", "09/10/22","Complete"),
    //     createData('#1111', "East Plot B","Crop","Rental:Data Collection", "09/11/22","Complete"),
    //     createData('#1161', "West Plot A","Crop","Rental:Data Collection", "09/10/22","Complete"),
    //   ];
      const [showSpinner,setShowSpinner]=useState(true);
    const [showDetails,setShowDetails]=useState(false);
    const [rowId,setRowId]=useState(null);
    const [row,setRow]=useState(null);
    const [search,setSearch]=useState(null)
    const handleSearch=(e)=>{
            setSearch(e.target.value)
    }
    const detailedBooking=(row)=>{
        setShowDetails(true);
        setRowId(row.id)
        setRow(row)
    }
    const closeDetailedBooking=()=>{
        setShowDetails(false);
    }
    return <><div className='container-fluid bookDrone'>
    <div className='row welcomeHeadingRow'>
    {showSpinner && <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>}
    
    {(!showDetails && !showSpinner)&& <div className='col-sm-4 welcomeHeading'>
            <h3>Welcome to Bookings!</h3>
            <p>Check the status of your drone booking here</p>
        </div>}
   
    </div>
   <div className='row bookDroneTable'>
   {(!showDetails && !showSpinner) &&  <div className='col-sm'>
            <div className='row searchRow'>
                
                <div className='col-sm-2 searchCol'>
                
                <input type="text" placeholder='Search' onChange={(e)=>handleSearch(e)}></input>
                </div>
            </div>
        </div>}
       { (!showDetails && !showSpinner ) && <BasicTable detailedBooking={detailedBooking} rows={bookingData} search={search}/>}
       { showDetails && <DetailedBooking rowId={rowId} row={row} closeDetailedBooking={closeDetailedBooking}/>}

        

    </div>
    </div></>;
}

export default MyBookings;