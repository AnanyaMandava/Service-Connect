import { TextField, Stack, Typography, Button,Snackbar, Alert } from "@mui/material";
import { Box } from "@mui/system";
import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


function AdmineditDrone() {

    const navigate = useNavigate()
    const location = useLocation();
    const droneValues = {
        drone_id:location.state.drone_id,
        device_type:location.state.drone_type,
        drone_model:location.state.drone_model,
        drone_maker:location.state.drone_maker,
        service_type:location.state.service_type
    }

    const [dronedata, setDroneData] = useState(droneValues);
    const [open, setOpen] = React.useState(false);
    //console.log(droneValues, dronedata)

    const handleInput = (e) => {
        const {name, value} = e.target;
        
        setDroneData({
            ...dronedata,
            [name] : value
        })
    }

    var url = process.env.REACT_APP_MISSION_PLANNER_URL;

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const handleAction = (action, drone_id) =>{

        var bodyFormData = new FormData();
        bodyFormData.append('device_id',drone_id);
        console.log(bodyFormData)
        if(action == 'Delete'){

            url = url + 'flight_data_collect/delete-drone/'

            axios.post(url, bodyFormData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res)=>{
                if(res.status == 200){
                    navigate('/adminhome/dronemngt', {state:{type:"success", body:"Deleted Successfully"}})
                }
            })
            .catch(function(err){
                console.log(err)
            })
        }
        else if(action == 'Edit'){


            url = url + 'flight_data_collect/update-drone/'

            bodyFormData.append('device_model',dronedata.drone_model)
            bodyFormData.append('service_type', dronedata.service_type)
            bodyFormData.append('device_maker', dronedata.drone_maker)

            axios.post(url, bodyFormData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res)=>{
                if(res.status == 200){
                    setOpen(true)
                    timeout(5000);
                    navigate('/adminhome/dronemngt', {state:{type:"success", body:"Updated Successfully"}})
                }
            })
            .catch(function(err){
                console.log(err)
            })
            
        }
    }

    return <>
    <Box mt = {20}  spacing={2} ml={5} width='80%' backgroundColor='white' borderRadius={4} p={4} height='60%'>
        <Snackbar >
            <Alert >
                Drone Details Updated Successfully
            </Alert>
        </Snackbar>

        <Typography variant="h4" textAlign='left'>{location.state.type} Drone</Typography>
        <Typography textAlign='left'>Edit details of selected drone</Typography>
        <Box sx={{p:4, width:'100%' ,border: '1px solid grey', backgroundColor:'white'}}>
            <Typography sx={{textAlign:'left', marginBottom:'2%'}}>Drone Information</Typography>
            <Stack spacing={2}>
            <TextField required label='Dorne Id' name="drone_id" value = {dronedata.drone_id}  onChange={handleInput}/>
            <TextField label='Model' name="drone_model" value = {dronedata.drone_model}  onChange={handleInput}/>
            <TextField label='Service' name="service_type" value = {dronedata.service_type}  onChange={handleInput}/>
            <TextField label='Brand' name="drone_maker" value = {dronedata.drone_maker} onChange={handleInput}/>
            </Stack>
            <Button sx={{marginLeft:'0%', marginTop:'5%'}} variant="outlined" onClick={()=>{ navigate("/adminhome/dronemngt")}}>Back</Button>
            <Button sx={{marginLeft:'80%', marginTop:'5%'}} variant="outlined" onClick={()=> handleAction(location.state.type, location.state.drone_id) }>{location.state.type}</Button>
        </Box>
    </Box>
    </>
}

export default AdmineditDrone;