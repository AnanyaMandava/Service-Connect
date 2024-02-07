import React, { Component, useState ,useEffect} from "react";
import "./../DetailedBooking.css";
import Box from '@mui/material/Box';
import { useSearchParams } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import axios from 'axios';

function StartService(props) {
    const [open, setOpen] = useState(false);
    const ip="54.145.25.210"
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [alertMessage,setAlertMessage]=useState();
  const [showAlert,setShowAlert]=useState(false);
  const [role,setRole]=useState();
  const markCompleted=()=>{
   //api call
    setAlertMessage("Succesfully marked as complete");
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    setRole(auth.loginjson[0].userRole);
    axios.get("http://"+ip+"/flight_data_collect/connect/14550/").then((res) => {
      console.log(res);
    });
    setTimeout(() => {
      axios.get(" http://"+ip+"/flight_data_collect/control/setmode/14550/GUIDED/").then((res) => {

        axios.get("http://"+ip+"/flight_data_collect/control/disarm/14550/").then((res) => {

          axios.get("http://"+ip+"/flight_data_collect/control/setaltitude/14550/15/").then((res) => {
            console.log(res);
          });
          
          // setTimeout(()=>{
          //   axios.get("http://54.197.113.104/flight_data_collect/control/land/14550/")
            
          // },(60*4));
          
        });
      });
      
   },10000);
    setTimeout(()=>{
      axios.get("http://"+ip+"/flight_data_collect/control/setwaypointdelay/14550/37.55875800000001,-122.046862,15.000000000572049,37.55723799999999,-122.046304,14.99999999791995,37.55716799999999,-122.045671,15.000000001000425,37.558848,-122.04635100000004,14.999999997766839,37.559009,-122.045813,14.999999998201456,37.557152999999985,-122.044989,15.000000000338579,37.557475000000004,-122.04453100000002,14.999999997868418,37.559178999999986,-122.045286,14.999999998069553,37.559326,-122.04485699999998,14.999999999418508,37.55787899999999,-122.044179,15.000000000605636/0,0,0,0,0,0,0,0,0,0/")
      .then(()=>{
        axios.get('http://' +ip+'/flight_data_collect/control/setmode/14550/AUTO/');
      })
    },15000);
    setTimeout(()=>{
      axios.get(axios.get('http://'+ip+'/flight_data_collect/control/land/14550/')).then(()=>{
        console.log("landed succesfully")
      })
      
    },370000);
    console.log(searchParams.get("id"))
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="container-fluid" style={{backgroundColor:"white",marginTop:"-7px",padding:"20px"}}>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Service
          </Typography>
          <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service details
              </div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Service Id
              </div>
              <div className="col-sm-2 columnBillsub">{searchParams.get("id")}</div>
              {/* <img src={require("./../Assets/Line.svg").default}  style={{paddingTop:"5px"}}/> */}
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Duration
              </div>
              <div className="col-sm-2 columnBillsub">2 Hrs</div>
              {/* <img src={require("./../Assets/Line.svg").default} /> */}
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Location
              </div>
              <div className="col-sm-2 columnBillsub">367 Old Toll Road, Mariposa, CA</div>
              {/* <img src={require("./../Assets/Line.svg").default} /> */}
            </div>
            
            
        </Box>
        </Modal>
      
      
       {showAlert && <Stack sx={{ width: '120%',zIndex:'10',marginTop:"-10px" }} spacing={2}>
        <Alert severity="success">
        
        {alertMessage}
      </Alert>
      </Stack>}


      <div className="row">
       { role=="pilot" && <div className="col-sm-2">
        <div className="row buttonRow">
                <button className="buttonPayment" style={{height:"100px"}} onClick={()=>markCompleted()}>
                  Mark as completed
                </button>
              </div>
              <div className="row buttonRow">
                <button className="buttonPayment" style={{height:"100px"}}  onClick={() => navigate('/Pilot')}>
                  Back to dashboard
                </button>
              </div>
              <div className="row buttonRow">
                <button className="buttonPayment"  style={{height:"100px"}} onClick={() => test(false)}>
                  Close mission planner
                </button>
              </div>
              <div className="row buttonRow">
                <button className="buttonPayment"  style={{height:"100px"}} onClick={() => handleOpen()}>
                  view service details
                </button>
              </div>
            </div>}
        
        <div className="col-sm" style={{marginRight:"-90px",marginLeft:"-20px"}}>
          {/* <iframe is="x-frame-bypass" src="http://ec2-52-203-10-77.compute-1.amazonaws.com/flightmonitor/"></iframe> */}
          <iframe
            id="scale-frame"
            src={"http://"+ip+"/flightmonitor/"}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            target="_blank"
            width="1250px"
            height="1000px"
            
          />
          ;
        </div>
        </div>
      </div>
    
  );
}

export default StartService;
