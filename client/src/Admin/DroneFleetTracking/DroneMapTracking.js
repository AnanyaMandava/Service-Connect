import { Typography, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import img from '../../Assets/drone.png'
import { Map, Marker } from 'pigeon-maps'
import axios from "axios";

function DroneFleetData() {

    const rows = [['Drone ID#','1','DJI Mini SE','Active','120 Meters','10 Minutes','(37.558,-122.048,100)','10m/s','10 meters','10:45am','1144','Data Collection','3671 Old Toll Road, Maiposa, CA 95338','West Plot A - Crop','Andy palmer','Half Day 10:00 AM','0','1'],
                  ['Drone ID#','2','DJI Mini SE','Registered','100 Meters','15 Minutes','(37.456,-122.345,120)','12m/s','8 meters','6:00 pm','567','Data Collection','1186 Roseville Pkwy, Roseville, CA 95678','East Plot B - Crop','Andy palmer','Half Day 12:00 AM','0','2'],
                  ['Drone ID#','3','DJI Mini SE','Stopped','80 Meters','13 Minutes','(37.234,-122.432,100)','9m/s','12 meters','12:45pm','1346','Data Collection','2435 Fair Oaks Blvd, Sacramento, CA 95825','North Plot D - Crop','Andy palmer','Half Day 9:00 PM','0','3'],
                  ['Drone ID#','4','DJI Phantom','Connected','150 Meters','10 Minutes','(37.658,-122.748,100)','15m/s','10 meters','9:30am','789','Data Serveillance','575 Market St , San Fransico, CA 94105','South Plot A - Crop','Andy palmer','Half Day 5:00 AM','1','4']]
    
    const chooseColor = (status) =>{
        if(status == 'Stopped'){
            return 'red'
        }
        else if(status == 'Active'){
            return 'green'
        }
        else if(status == 'Registered'){
            return 'blue'
        }
        else if(status == 'Connected'){
            return 'yellow'
        }
    }

    const [data, setData] = useState('')

    const datahandle=(val)=>{
        setData(val)
    }
    const center = [37.3387, -121.8853]

    return <>
    <Box display='flex' flexDirection='column'>
        <Box display='flex' justifyContent='flex-start'>
            <Typography>4 Drones Found</Typography>
        </Box>
        
        <Box display='flex' flexDirection='row' marginTop='1%'>
            
            {rows.map((row)=>(
            <Button display='flex' onClick={()=> datahandle(row)}>
                <Box border='1px solid blue' borderRadius={2} display='flex' flexDirection='row' p={2} color='black' width='100%' height='100%'>
                
                    <Box display='flex' flexDirection='column' width='60%'>
                        <Typography>{row[0]}</Typography>
                        <Typography>{row[1]}</Typography>
                        <Typography>{row[2]}</Typography>
                        <Typography p={0.5} border='1px solid red' borderRadius={1} backgroundColor='#FCCDCC' color={()=>chooseColor(row[3])}>{row[3]}</Typography>
                    </Box>
                    <Box display='flex' justifyContent='flex-end' width='40%'>
                        <img src={img} width='70%' height='70%'/>
                    </Box>
                </Box>
            </Button>
            ))}
        </Box>
        { data &&
        <Box width='100%' display='flex' flexDirection='column' marginTop={6} marginLeft={2}>
            <Typography variant="h4" textAlign='start'>Drone ID #{data[1]}</Typography>
            <Box display='flex' flexDirection='row'>
            <Box width='50%' display='flex' flexDirection='column' justifyContent='flex-start'>
                <Typography textAlign='start' marginTop={1} fontWeight='bold'>Tracking Details</Typography>
                <Typography textAlign='start' >Status: {data[3]}</Typography>
                <Typography textAlign='start'  marginTop={2}>Total Distance Traveled: {data[4]}</Typography>
                <Typography textAlign='start'>Total Time Traveled: {data[5]}</Typography>
                <Typography textAlign='start'  marginTop={2}>Location(Latitude, Longitude, Altitude)</Typography>
                <Typography textAlign='start'>{data[6]}</Typography>
                <Typography textAlign='start'  marginTop={2}>Speed: {data[7]}</Typography>
                <Typography textAlign='start'  marginTop={2}>Distance to destination: {data[8]}</Typography>
                <Typography textAlign='start'>Estimated Time to destination: {data[9]}</Typography>
            </Box>
            <Box width='50%' display='flex' flexDirection='column'>
                <Box display='flex' flexDirection='row' justifyContent='flex-start'>
                    <Box display='flex' justifyContent='flex-start' flexDirection='column'>
                        <Typography textAlign='start'  fontWeight='bold'>Drone</Typography>
                        <Typography textAlign='start'>Drone ID #{data[1]}</Typography>
                        <Typography textAlign='start'>Drone Model: {data[2]}</Typography>
                    </Box>
                    <Box display='flex' justifyContent='flex-end' marginLeft={7}>
                        <img src={img} width='80%' height='100%'/>
                    </Box>
                </Box>
                <Typography textAlign='start' fontWeight='bold' marginTop={2}>Service Details</Typography>
                <Typography textAlign='start'>Assigned Service ID #: {data[10]}</Typography>
                <Typography textAlign='start'>Service Type: {data[11]}</Typography>
                <Typography textAlign='start'>Farm: {data[12]}</Typography>
                <Typography textAlign='start'>Land: {data[13]}</Typography>
                <Typography textAlign='start'>Farmer: {data[14]}</Typography>
                <Typography textAlign='start'>Service Time: {data[15]}</Typography>
                <Typography textAlign='start'>Mission Plan ID #{data[16]}</Typography>
                <Typography textAlign='start'>Flight ID #{data[17]}</Typography>
            </Box>
            </Box>
        </Box>}
    </Box>
    </>
}

export default DroneFleetData;