import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function AdmineditDroneCatalog (){

    const navigate = useNavigate()
    const location = useLocation()


    return <>
    <Box display='flex' backgroundColor='white' width='100%'>
        <Box width='80%' display='flex' marginTop={15} marginLeft={10} flexDirection='column' justifyContent='flex-start' >
            <Typography textAlign='start' variant='h4'>Edit Drone</Typography>
            <Typography textAlign='start' variant='h5' marginTop={2}>Edit details of selected drone</Typography>
            <Box display='flex' flexDirection='column' border='1px solid grey' borderRadius={2} p={2} width='100%'>
                <Typography textAlign='start'>Drone Information</Typography>
                <Stack spacing={4} marginTop={4}>
                    <TextField label='Name' value = {location.state.dronename}/>
                    <TextField label='Brand' value = {location.state.brand}/>
                    <TextField label='Product Page URL' value = {location.state.productpageurl}/>
                    <TextField label='Price of Service' value = {location.state.price}/>
                </Stack>
                <Box display='flex' flexDirection='row' justifyContent='space-between' marginTop={5}>
                    <Button variant='contained' onClick={()=>navigate('/adminhome/dronecatalog')}>Back</Button>
                    <Button variant='contained' onClick={()=>navigate('/adminhome/dronecatalog')}>Submit</Button>
                </Box>
            </Box>
        </Box>
    </Box>
    </>
}

export default AdmineditDroneCatalog;