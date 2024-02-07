import React, { Component,useState,useEffect } from 'react';
import BasicTable from '../Table'
import './PilotBookings.css';
import DetailedBooking from './DetailedBooking';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function PilotBookings() {
  const navigate = useNavigate();

    function createData(id, plot, type, service, time,status) {
        return { id, plot, type, service, time,status };
      }
    const [bookingData,setBookingData]=useState();
    const [CompletedBookingData,setCompletedBookingData]=useState();
    const [bookingStatus,setBookingStatus]=useState();  
      useEffect(()=>{
        const search = window.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const status = params.get('Status');
        const auth = JSON.parse(localStorage.getItem("auth"));
        const url='http://localhost:8080/agriDrone/getAllPilotBookings/'+auth.loginjson[0].userName
        axios.get(url).then((res)=>{
          const data=res.data.filter(x=>{if(x.status=="active") return x;})
          const inactiveData=res.data.filter(x=>{if(!(x.status=="active")) return x;})
          if(status=="completed") {
          setBookingData(inactiveData);
          setBookingStatus("completed")
          }
          else{
          setBookingData(data);
          setBookingStatus("active")
          }
            setCompletedBookingData(inactiveData);
            setShowSpinner(false);
        })
      },[])
      
      // const bookingData = [
      //   createData('#1001', "West Plot A","Crop","Rental:Data Collection", "09/30/22","Active"),
      //   createData('#1011', "North Plot B","Nursery","Rental:Payload", "09/23/22","Complete"),
      //   createData('#1021', "East Plot A","Crop","Rental:Data Collection", "09/22/22","Complete"),
      //   createData('#1031', "West Plot A","Crop","Rental:Data Collection", "09/20/22","Complete"),
      //   createData('#1041', "South Plot D","Crop","Rental:Data Collection", "09/12/22","Complete"),
      //   createData('#1051', "East Plot B","Crop","Rental:Data Collection", "09/11/22","Complete"),
      //   createData('#1061', "West Plot A","Crop","Rental:Data Collection", "09/10/22","Complete"),
      //   createData('#1051', "East Plot B","Crop","Rental:Data Collection", "09/11/22","Complete"),
      //   createData('#1061', "West Plot A","Crop","Rental:Data Collection", "09/10/22","Complete"),
      //   createData('#1051', "East Plot B","Crop","Rental:Data Collection", "09/11/22","Complete"),
      //   createData('#1061', "West Plot A","Crop","Rental:Data Collection", "09/10/22","Complete"),
      //   createData('#1051', "East Plot B","Crop","Rental:Data Collection", "09/11/22","Complete"),
      //   createData('#1061', "West Plot A","Crop","Rental:Data Collection", "09/10/22","Complete"),
      // ];
      const [showSpinner,setShowSpinner]=useState(true);

    const [showDetails,setShowDetails]=useState(false);
    const [rowId,setRowId]=useState(null);
    const [row,setRow]=useState(null);

    const detailedBooking=(row)=>{
        setShowDetails(true);
        setRowId(row.id)
        setRow(row)
    }
    const closeDetailedBooking=()=>{
        setShowDetails(false);
    }
    return <><div className='container-fluid bookDrone'>
    
   <div className='row bookDroneTable'>
   {showSpinner && <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>}
   {(!showDetails && !showSpinner) &&  <div className='col-sm'>
            <div className='row searchRow'>
                
                <div className='col-sm-2 searchCol'>
                
                <input type="text" placeholder='Search'></input>
                </div>
            </div>
        </div>}
       { (!showDetails && !showSpinner) && <BasicTable detailedBooking={detailedBooking} rows={bookingData} completed={CompletedBookingData}/>}
       { showDetails && <DetailedBooking bookingStatus={bookingStatus} rowId={rowId} row={row} closeDetailedBooking={closeDetailedBooking}/>}

        

    </div>
    <div className='row'><button onClick={()=>navigate('/Pilot')} className="buttonPayment" style={{marginLeft:"20px",marginTop:"10px"}}>Back to dashboard</button></div>
    </div></>;
}

export default PilotBookings;