import React, { useEffect, useState } from "react";
import {TableBody, TableContainer, TableHead, Table, TableRow,TableCell, Box, Typography, Paper, Button, requirePropFactory, Snackbar, Alert, AlertTitle} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
//require('dotenv').config()

function AdminDroneManagement () {
    const navigate = useNavigate();

    const location = useLocation();

    const [dronedata, setDroneData] = useState('')

    const [open, setOpen] = useState(location.state ? true : false);

    if(open == true){
        var body = location.state.body
    }

    console.log(location)

    const handleClose = () => {
        setOpen(false)
    }

    // const rows = [['ID# 1', 'DJI Mini SE', 'Data Collection', 'Deployed'],
    //     ['ID# 2', 'DJI Mini SE', 'Data Collection', 'Available'],
    //     ['ID# 3', 'DJI Mini SE', 'Data Collection', 'Booked'],
    //     ['ID# 4', 'DJI Phantom Pro', 'Serveillance', 'Deployed']];

    const passEditParam = (row, type) => {
        console.log('passEditParam',row);

        navigate("/adminhome/admineditdeletedrone", {state:{drone_id: row.drone_id, 
                                                            drone_model: row.drone_model,
                                                            service_type: row.service_type,
                                                            drone_maker: row.drone_maker, 
                                                            dronedata: row.drone_type,
                                                            type:type }});

    };

    useEffect(()=>{

        var url = process.env.REACT_APP_MISSION_PLANNER_URL + 'flight_data_collect/get-drones/';

        //var url = "http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/get-drones/";
    
        axios.get(url)
        .then((res)=>{
            setDroneData(res.data)
        })
    },[])


    return <>
    <Box mt={15} ml={5} display='flex' flexDirection='column' backgroundColor='white' p={4} height={650} borderRadius={4}>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                {body}
            </Alert>
        </Snackbar>
        <Typography sx={{textAlign:'left'}} variant="h3">Drone Management</Typography>
        {/* <Button sx={{marginRight:'86%', marginTop:'2%'}} variant="contained">Drone List</Button> */}
        <Box display='flex' flexDirection='row' justifyContent='space-between' marginTop={10}>
            <Typography  variant="h4" >Add, Edit and Update Drone</Typography>
            {/* Do not use href for navigation inside react application it causes refresh of the entire application */}
            <Button   variant="contained" onClick={()=>{ navigate("/adminhome/Adminadddrone")}}>Add Drone</Button>
        </Box>
        <TableContainer sx={{marginTop:"4%"}} component={Paper}>
            <Table aria-label="simple table" stickyHeader>
                <TableHead>
                    <TableRow >
                        <TableCell sx={{fontWeight:'bold'}}>Drone Id#</TableCell>
                        <TableCell sx={{fontWeight:'bold'}}>Drone Model</TableCell>
                        <TableCell sx={{fontWeight:'bold'}}>Drone Service</TableCell>
                        <TableCell sx={{fontWeight:'bold'}}>Available, Booked or Deployed Status</TableCell>
                        <TableCell sx={{fontWeight:'bold'}}>Delete</TableCell>
                        <TableCell sx={{fontWeight:'bold'}}>Modify</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {dronedata && dronedata.map((row)=>(
                        <TableRow rows>
                            <TableCell>{row.drone_id}</TableCell>
                            <TableCell>{row.drone_model}</TableCell>
                            <TableCell>{row.service_type}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell><Button sx={{backgroundColor: "#e05c53", '&:hover': {backgroundColor: '#e05c53'}}} variant="contained" onClick={()=>passEditParam(row,'Delete')}>Delete</Button></TableCell>
                            <TableCell><Button sx={{backgroundColor: "#e05c53", '&:hover': {backgroundColor: '#e05c53'}}} variant="contained" onClick={()=>passEditParam(row,'Edit')}>Edit</Button></TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
    </>

}


export default AdminDroneManagement;