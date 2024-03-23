import React from 'react';
import { Button, Grow, Typography,Box,Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { Stack } from '@mui/system';
import img from '../../Assets/drone.png';
import DroneMapTracking from './DroneMapTracking'
import { ClassNames } from '@emotion/react';
import { useState } from 'react';
import DroneFleetStatistics from './DroneFleetStatistics';
import DroneARVR  from './DroneARVR'


const AnyReactComponent = ({ text }) => <div>{text}</div>;

function DroneFleet (){

    const [option, setOption] = useState('');

    

    return <>
        <Box display='flex' marginTop={13} width='100%' flexDirection='column' marginLeft={4} backgroundColor='white' borderRadius={5}>
            <Box marginLeft='2%' marginTop='2%'>
                <Box width='100%' flexDirection='column' display='flex' justifyContent='center'>
                    <Box display='flex'>
                        { option === '' && <Typography variant="h4">Drone Map</Typography>}
                        { option === '' && <Typography variant="h4" marginLeft='60%'>Welcome Admin</Typography> }
                        { option === 'DroneMap' && <Typography variant='h4'>Drone Tracking</Typography>}
                        { option === 'FleetStatistics' && <Typography variant='h4'>Drone Cloud Tracking Statistics</Typography>}
                        { option === 'AR/VR' && <Typography variant='h4'>AR/VR Tracking</Typography>}
                    </Box>
                    <Box width='60%' display='flex' flexDirection='row' justifyContent='space-evenly' marginTop='2%' borderRadius={3} border='1px solid grey' p={2} backgroundColor='#AAA4A3' >
                        <Button variant="contained" onClick={()=>setOption('FleetStatistics')} sx={{borderRadius:2}}>Fleet  Statistics</Button>
                        <Button variant="contained" onClick={()=>setOption('DroneMap')} sx={{borderRadius:2}}>Drone Map Tracking</Button>
                        <Button variant="contained" onClick={()=>setOption('AR/VR')} sx={{borderRadius:2}}>AR/VR Tracking</Button>
                    </Box>
                </Box>
            </Box>
            <Box width='98%' marginTop='3%'  marginLeft='2%'>
                <Box>
                    {option === 'DroneMap' &&   <DroneMapTracking/> }
                    {option === 'FleetStatistics' &&   <DroneFleetStatistics/> }
                    {option === 'AR/VR' &&   <DroneARVR/> }
                </Box>
            </Box>
        </Box>
    </>
}

export default DroneFleet;