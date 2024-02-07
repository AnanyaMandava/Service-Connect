import { Typography, Box, Badge, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chart, registerables } from 'chart.js';
// import Map from "./components/Map";
Chart.register(...registerables);


export default function DroneFleetStatistics (){

    const data = {
        labels:['12/4','12/5','12/6','12/7','12/8','12/9','12/10','12/11','12/12','12/13','12/14','12/15'],
        datasets: [
          {
            data: [0.2],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };
      
    return <>
        <Box width='100%' display='flex' flexDirection='column' marginTop='5%' justifyContent='flex-start'>
            <Typography textAlign='start' marginLeft='5%' variant="h5">Number of Drones By Status</Typography>
            <Box width='50%' display='flex' flexDirection='row' justifyContent='space-evenly' marginTop='3%' borderColor='grey' backgroundColor='#FDFDFD' borderRadius={3} p={2}>
                <Box>
                    <Typography>Active</Typography>
                    <Typography color='#85F24F' fontSize={35}>1</Typography>
                </Box>
                <Box>
                    <Typography>Stopped</Typography>
                    <Typography color='#EE5A56' fontSize={35}>1</Typography>
                </Box>
                <Box>
                    <Typography>Connected</Typography>
                    <Typography color='#E5D83F' fontSize={35}>1</Typography>
                </Box>
                <Box>
                    <Typography>Registered</Typography>
                    <Typography color='#6F56EE' fontSize={35}>4</Typography>
                </Box>
            </Box>
            <Typography textAlign='start' marginLeft='5%' variant="h5" marginTop='5%'>Number of Drones by Service</Typography>
            <Box width={600} display='flex' flexDirection='row' justifyContent='space-evenly' marginTop={4} marginLeft='2%'>
                <Box component='span' sx={{ bgcolor:'green', width: 20, height: 20, borderRadius:'50%' }}></Box>
                <Typography>Data Collected</Typography>
                <Box component='span' sx={{ bgcolor:'blue', width: 20, height: 20, borderRadius:'50%' }}></Box>
                <Typography>Payload</Typography>
                <Box component='span' sx={{ bgcolor:'red', width: 20, height: 20, borderRadius:'50%' }}></Box>
                <Typography>Surveillance</Typography>
            </Box>
            <Box width={600} height={100} display='flex' flexDirection='row' justifyContent='space-evenly' marginTop={5} marginLeft='1%'>
                <CircularProgressbar value={67} text={`${67}%`} background={true} styles={buildStyles( { trailColor:['rgba(178, 231, 166, 0.8)'] ,textColor:'black' ,pathColor: `rgba(76, 207, 11, 0.8)`, backgroundColor:['rgba(178, 231, 166, 0.8)']})}/>
                <CircularProgressbar value={46} text={`${46}%`} background={true} styles={buildStyles( { trailColor:['rgba(189, 171, 248, 0.8)'],textColor:'black' ,pathColor: `rgba(6, 42, 221, 0.8)`, backgroundColor:['rgba(189, 171, 248, 0.8)']})}/>
                <CircularProgressbar value={15} text={`${15}%`} background={true} styles={buildStyles( {  trailColor: 'rgba(244, 186, 160, 0.8)', textColor:'black' ,pathColor: `rgba(213, 23, 15, 0.8)`, backgroundColor:'rgba(244, 186, 160, 0.8)'})}/>
            </Box>
            <Box display='flex' marginTop={4} flexDirection='column' width='80%' marginLeft={4}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                        <Typography>Total Number of Flights: 82</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Bar data={data} />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Flights Per Service Type: 4 avg</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Bar data={data} />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Flights Per Booked Service: 2 avg</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Bar data={data} />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Flight Distance: 50km avg</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Bar data={data} />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Flight Time: 3h avg</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Bar data={data} />
                    </AccordionDetails>
                </Accordion>
            </Box>
          
        </Box>
    </>
}