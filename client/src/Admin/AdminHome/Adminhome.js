import { Box, Typography } from '@mui/material';
import React, {Component} from 'react';
import img from '../../Assets/drone1.png'
import { Outlet, Link } from 'react-router-dom';

function AdminHome() {
    return <>
    <Box display='flex' marginTop={10} flexDirection='column' width='100%' backgroundColor='white'>
        <Typography variant='h4' marginTop={5}>Welcome, Admin </Typography>
        <Typography variant='h2' marginTop={10}>A AGDroneCloud System Dashboard</Typography>
        <Box display='flex' marginLeft={60}>
            <img src={img} width='40%' height='100%'/>
        </Box>
    </Box>
    </>
}

export default AdminHome;