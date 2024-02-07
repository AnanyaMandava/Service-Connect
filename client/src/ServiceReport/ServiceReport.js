import axios from 'axios';
import React, { Component ,useState,useEffect} from 'react';
import BasicTable from '../Table'
import DetailedServiceReport from './DetailedServiceReport';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

//import DetailedBooking from './DetailedBooking';
function ServiceReport() {
    const [showDetails,setShowDetails]=useState(false);
    const [rowId,setRowId]=useState(null);
    const [row,setRow]=useState(null);
    const [bookingData,setBookingData]=useState();
    const [showSpinner,setShowSpinner]=useState(true);
    const [search,setSearch]=useState(null)


    const handleSearch=(e)=>{
        setSearch(e.target.value)
}
    useEffect(()=>{
        const auth = JSON.parse(localStorage.getItem("auth"));
        const url='http://localhost:8080/agriDrone/getAllFarmerBookings/'+auth.loginjson[0].userName
        axios.get(url).then((res)=>{
            const data=res.data.filter(x=>{if(x.status=="completed") return x;})
            setBookingData(data);
            setShowSpinner(false);
        })
      },[])

    useEffect((props) => {
        const search = window.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const rowid = params.get('rowid');
       // console.log(createData('#1001', "West Plot A","Crop","Rental:Data Collection", "09/30/22","Finished"),)
        if(rowid!=null){
            
            detailedReport(createData('#1001', "West Plot A","Crop","Rental:Data Collection", "09/30/22","Finished"))
        }

      }, []);

    function createData(id, plot, type, service, time,status) {
        return { id, plot, type, service, time,status };
      }
      
      
      
    //   const bookingData = [
    //     createData('#1001', "West Plot A","Crop","Rental:Data Collection", "09/30/22","Finished"),
    //     createData('#1011', "North Plot B","Nursery","Rental:Payload", "09/23/22","Finished"),
    //     createData('#1021', "East Plot A","Crop","Rental:Data Collection", "09/22/22","Finished"),
    //     createData('#1031', "West Plot A","Crop","Rental:Data Collection", "09/20/22","Finished"),
    //     createData('#1041', "South Plot D","Crop","Rental:Data Collection", "09/12/22","Finished"),
    //     createData('#1051', "East Plot B","Crop","Rental:Data Collection", "09/11/22","Finished"),
    //     createData('#1061', "West Plot A","Crop","Rental:Data Collection", "09/10/22","Finished"),
    //     createData('#1051', "East Plot B","Crop","Rental:Data Collection", "09/11/22","Finished"),
    //     createData('#1061', "West Plot A","Crop","Rental:Data Collection", "09/10/22","Finished"),
    //     createData('#1051', "East Plot B","Crop","Rental:Data Collection", "09/11/22","Finished"),
    //     createData('#1061', "West Plot A","Crop","Rental:Data Collection", "09/10/22","Finished"),
    //     createData('#1051', "East Plot B","Crop","Rental:Data Collection", "09/11/22","Finished"),
    //     createData('#1061', "West Plot A","Crop","Rental:Data Collection", "09/10/22","Finished"),
    //   ];

    

    const detailedReport=(row)=>{
        setShowDetails(true);
        setRowId(row.id)
        setRow(row)
    }
    const closeDetailedBooking=()=>{
        setShowDetails(false);
    }
    return <><div className='container-fluid bookDrone'>
        {showSpinner && <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>}
    <div className='row welcomeHeadingRow'>
    {(!showDetails && !showSpinner) && <div className='col-sm-4 welcomeHeading'>
            <h3>Service Report</h3>
            <p>You can check your completed service report here</p>
        </div>}
   
    </div>
   <div className='row bookDroneTable'>
   {(!showDetails && !showSpinner)&&  <div className='col-sm'>
            <div className='row searchRow'>
                
                <div className='col-sm-2 searchCol'>
                
                <input type="text" placeholder='Search' onChange={(e)=>handleSearch(e)}></input>
                </div>
            </div>
        </div>}
       { (!showDetails && !showSpinner) && <BasicTable detailedBooking={detailedReport} rows={bookingData} filter={true} search={search}/>}
       { showDetails && <DetailedServiceReport row={row} closeDetailedBooking={closeDetailedBooking}/>}

        

    </div>
    </div></>;
}
export default ServiceReport;