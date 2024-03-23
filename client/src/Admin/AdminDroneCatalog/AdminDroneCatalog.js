import { MenuItem, Select, Stack, Box, TextField, Typography, Button, Modal } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import React from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';
import "./AdminDroneCatalog.css";
import img from '../../Assets/drone.png'
import img1 from '../../Assets/plus.png'
import { useNavigate } from 'react-router-dom';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function AdminDroneCatalog () {

    const [value, setValue] = React.useState(null);
    const [common, setCommon] = useState('');
    const handleCommon = (e) => {
        setCommon(e.target.value)
    }
    const navigate = useNavigate();
    const rows = [['DJI Mini SE','Data Collection', '3-Axil Gimbal', '2.7K Camera', '30 Minutes Flight Time','8m/s Flight Speed','249 Grams','$80/hour'],
    ['DJI Phantom Pro 4', 'Surveillance', '3-Axil Gimbal', '4K Camera', '30 Minutes Flight Time','13m/s Flight Speed','1375 grams','$100/hour'],
    ['DJI Agras T20', 'Payload','20L Spray Tank', '6 L/min Spray Rate', '15 Minutes Flight Time','7 m/s Flight Speed','42.6 kilograms','$180/hour']];
    
    const [addDrone, setaddDrone] = useState('');
    const handleOpen = (val) => {
        console.log(val)
        if(val == 1){
            setaddDrone('1')
        }
        else{
            setaddDrone('2')
        }
    }
    const handleClose = () => setaddDrone(false)

    const passEditParam = (row) => {
        navigate("/adminhome/editdronecatalog", {state:{dronename: row[0], brand: 'DJI',productpageurl: 'https://www.dji.com',price: row[6] }});

    };

    return <>
    <Box display='flex' width='100%' backgroundColor='white'>
        <div className='container-fluid main'>
            <h3>Drone Catalog</h3>
            <p>Add, Update, or edit Drones in catalog</p>
            <Box width='100%' sx={{marginTop:'4%' ,border:'1px solid grey',p:2, display:'flex',flexDirection: 'row', borderRadius: 3, color:'white'}}>
                <TextField label='Service' select value ={common} onChange={handleCommon} fullWidth p={2}>
                    <MenuItem value={1}>Data Collection</MenuItem>
                    <MenuItem value={2}>Payload</MenuItem>
                    <MenuItem value={3}>Surveillance</MenuItem>
                </TextField>  
                <TextField label='Price' select value ={common} onChange={handleCommon} fullWidth>
                    <MenuItem value={80}>80</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={120}>180</MenuItem>
                </TextField> 
                <TextField label='Equipment' select value ={common} onChange={handleCommon} fullWidth>
                    <MenuItem value='ThermalCamera'>Thermal Camera</MenuItem>
                </TextField>
                <TextField label='Brand' select value ={common} onChange={handleCommon} fullWidth>
                    <MenuItem value='DJI'>DJI</MenuItem>
                </TextField>
                <TextField label='Status' select value ={common} onChange={handleCommon} fullWidth>
                    <MenuItem value='Available'>Available</MenuItem>
                </TextField>
                <LocalizationProvider
                    sx={{ width: "10%" }}
                    dateAdapter={AdapterDayjs}
                    >
                    <DatePicker
                    label="Date"
                    width="10"
                    marginLeft="10px"
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                     }}
                renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>
            <Box>
                <Typography>3 Drones Found</Typography>
                <Box sx={{p:2, display:'flex',flexDirection: 'row', backgroundColor:'white'}}>
                    {rows.map((row)=>(
                        <Box width ='100%' sx={{border:'1px solid grey', p:1, borderRadius:3, display:'flex', flexDirection:'row',marginRight:'8px'}}>
                            <Box>
                                <Typography>{row[0]}</Typography>
                                <Typography>{row[1]}</Typography>
                                <Typography>{row[2]}</Typography>
                                <Typography>{row[3]}</Typography>
                                <Typography>{row[4]}</Typography>
                                <Typography>{row[5]}</Typography>
                                <Typography>{row[6]}</Typography>
                            </Box>
                            <Box width='40%'>
                                <img src={img}/>
                                <Button variant='contained' borderRadius={5} sx={{ marginTop:'100%', marginLeft:'40%'}} onClick={()=>passEditParam(row)}>Edit</Button>
                            </Box>
                        </Box>
                    ))}
                    <Button width='60%'sx={{border:'1px solid grey', borderRadius:3}} onClick={()=>handleOpen(1)}>
                        <Box> 
                            <Typography>Add a New Drone</Typography>
                            <img src={img1} width="50"/>
                        </Box>
                    </Button>
                    <Modal  open={addDrone === '1'} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <Box width='77%' sx={{marginLeft:'20%', marginTop:'4%', position:'absolute',border:'1px solid #000',backgroundColor:'white', borderRadius:'1%',p:4}}>
                            <Typography variant='h3' sx={{marginTop:'2%'}}>Add a New Drone</Typography>
                            <Typography sx={{marginTop:'2%'}}>Enter details to find correct Information</Typography>
                            <Box sx={{border:'1px solid grey', flexDirection:'column', display:'flex',p:2, borderRadius:'1%'}}>
                                <Typography variant='h4' sx={{marginTop:'2%'}}>Drone Information</Typography>
                                <TextField sx={{marginTop:'2%'}} label='Name'/>
                                <TextField sx={{marginTop:'2%'}} label='Brand'/>
                                <TextField sx={{marginTop:'2%'}} label='Product Page URL'/>
                                <TextField sx={{marginTop:'2%'}} label='Price of the Service'/>
                                <Box sx={{display:'flex', flexDirection:'row', marginTop:'2%', width:'100%'}}>
                                    <Button variant='contained' sx={{ width:'10%'}} onClick={handleClose}>Back</Button>
                                    <Button variant='contained' sx={{width:'10%',marginLeft:'80%'}} onClick={()=>handleOpen(2)}>Next</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                    <Modal open={addDrone === '2'}>
                        <Box width='77%' sx={{marginLeft:'20%', marginTop:'4%', position:'absolute',border:'1px solid #000',backgroundColor:'white', borderRadius:'1%',p:4}}>
                            <Typography variant='h4'>Add a New Drone</Typography>
                            <Typography variant='h6' marginTop={2}>Finalize Details for the new drone</Typography>
                            <Box display='flex' flexDirection='row' marginTop={4} width='100%'>
                                <Box display='flex' flexDirection='column' border='1px solid grey' borderRadius={2} height='50%' p={2}>
                                    <Box display='flex' flexDirection='row'>
                                        <Box>
                                        <Typography fontWeight='bold'>DJI Phantom 4 Pro</Typography>
                                        <Typography>Sureillance</Typography>
                                        <Typography>3-Axis Gimbal</Typography>
                                        <Typography>4K Camera</Typography>
                                        <Typography>30 Minutes Flight Time</Typography>
                                        <Typography>13m/s Flight Speed</Typography>
                                        <Typography>1374 grams</Typography>
                                        </Box>
                                        <Box>
                                        <img src={img}/>
                                        </Box>
                                    </Box>
                                    <Typography marginTop={2} marginLeft={15} fontWeight='bold' variant='h5'>$100/ Hour</Typography>
                                </Box>
                                <Box display='flex' flexDirection='column' marginLeft={4}>
                                    <Typography variant='h6'>Flight Parameter Specs</Typography>
                                    <Box display='flex' flexDirection='row' marginTop={0.5}>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>Flight Time</Typography>
                                            <Typography>30 Minutes</Typography>
                                        </Box>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>Max Speed</Typography>
                                            <Typography>P-mode:31 mph</Typography>
                                        </Box>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>Max Service Ceiling</Typography>
                                            <Typography>19685 feet(6000 m)</Typography>
                                        </Box>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>Wind Resistance</Typography>
                                            <Typography>10m/s</Typography>
                                        </Box>
                                    </Box>
                                    <Typography marginTop={2} variant='h6'>Camera Specs</Typography>
                                    <Box display='flex' flexDirection='row' marginTop={0.5}>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column' >
                                            <Typography fontWeight='bold'>Sensor</Typography>
                                            <Typography>1-inch CMOS</Typography>
                                        </Box>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>Lens</Typography>
                                            <Typography>FOV 84° 8.8 mm/24 mm</Typography>
                                        </Box>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>Operating Range</Typography>
                                            <Typography>100-3200</Typography>
                                        </Box>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>Shutter Speed</Typography>
                                            <Typography>8-1/2000s</Typography>
                                        </Box>
                                    </Box>
                                    <Typography marginTop={2} variant='h6'>Image/Video Specs</Typography>
                                    <Box display='flex' flexDirection='row' marginTop={0.5}>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>Image Resolution</Typography>
                                            <Typography>4K 4096×2160</Typography>
                                        </Box>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>Video Resolution</Typography>
                                            <Typography>4k 4096×2160</Typography>
                                        </Box>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>Recording Rate</Typography>
                                            <Typography>30 fps</Typography>
                                        </Box>
                                    </Box>
                                    <Typography marginTop={2} variant='h6'>Thermal Sensing System Specs</Typography>
                                    <Box display='flex' flexDirection='row'>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>Sensory Range</Typography>
                                            <Typography>0-10m</Typography>
                                        </Box>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>FOV</Typography>
                                            <Typography>60°(Horizontal), ±27°(Vertical)</Typography>
                                        </Box>
                                        <Box display='flex' border='1px solid grey' borderRadius={2} p={1} flexDirection='column'>
                                            <Typography fontWeight='bold'>Measuring Freq</Typography>
                                            <Typography>10 HZ</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box display='flex' flexDirection='row' marginTop={5} justifyContent='space-between'>
                                <Button variant='contained' onClick={()=> handleOpen(1)}>Back</Button>
                                <Button variant='contained' onClick={handleClose}>Confirm</Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </div>     
    </Box>
    </>
}

export default AdminDroneCatalog;