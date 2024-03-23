import { TextField, Stack, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminaddDrone(){
    const navigate = useNavigate()

    const droneValues = {
        device_id:'',
        device_type:'',
        device_model:'',
        device_maker:'',
        service_type:''
    }

    const [dronedata, setDroneData] = useState(droneValues);

    const handleInput = (e) => {
        const {name, value} = e.target;
    
        setDroneData({
            ...dronedata,
            [name] : value
        })
    }

    const handleAction = () => {

        var url = process.env.REACT_APP_MISSION_PLANNER_URL + 'flight_data_collect/register-drone/';

        var bodyFormData = new FormData();
        bodyFormData.append('device_id', dronedata.device_id)
        bodyFormData.append('device_type','drone')
        bodyFormData.append('device_model', dronedata.device_model)
        bodyFormData.append('device_maker', dronedata.device_maker)
        bodyFormData.append('service_type', dronedata.service_type)

        console.log(bodyFormData)

        axios.post(url, bodyFormData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then((res)=>{
            if(res.status == 200){
                navigate('/adminhome/dronemngt',{state:{type:'success',body:'Drone has been added Successfully'}})
            }
        })
        .catch(function(err){
            console.log(err)
        })
    }


    return <>
    
    <Box mt = {20}  spacing={2} ml={5} width='80%' backgroundColor='white' p ={4} borderRadius={4} height='60%'>
        <Typography variant="h4" textAlign='left'>Add a New Drone</Typography>
        <Typography textAlign='left'>Register this drone into the cloud system so he drone is Available to book</Typography>
        <Box sx={{p:4, width:'100%' ,border: '1px solid grey', backgroundColor:'white'}}>
            <Typography sx={{textAlign:'left', marginBottom:'2%'}}>Drone Information</Typography>
            <Stack spacing={2}>
                <TextField required type='number' label='Dorne Id' name='device_id' value={dronedata.device_id} onChange={handleInput}/>
                <TextField required label='Model' name="device_model" value={dronedata.device_model} onChange={handleInput}/>
                <TextField required label='Service' name="service_type" value={dronedata.service_type} onChange={handleInput}/>
                <TextField required label='Brand' name='device_maker' value={dronedata.device_maker} onChange={handleInput}/>
            </Stack>
            <Button sx={{marginLeft:'0%', marginTop:'5%'}} variant="outlined" onClick={()=>{ navigate("/adminhome/dronemngt")}}>Back</Button>
            <Button sx={{marginLeft:'70%', marginTop:'5%'}} variant="outlined" onClick={()=> handleAction()}>Register Drone</Button>
        </Box>
    </Box>
    
    </>
}

export default AdminaddDrone;