import { TableRow } from "@mui/material";
import React, { Component, useState,useEffect } from "react";
import './DetailedServiceReport.css'
import TitlebarImageList from "./TitlebarImageList"
import profileImage from './../Assets/profile1.png'
import { useSearchParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from "axios";


function DetailedServiceReport(props) {
  const [farmerSign, setfarmerSign] = useState(false);
  const [pilotSign, setPilotSign] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [urlId,setUrlId]=useState();
  const [currBookingDetails,setCurrBookingDetails]=useState();


  useEffect(() => {
    let rowid=props.row.bookingId;
    if(searchParams.get("rowid")){
      rowid=searchParams.get("rowid")
    }
    
    axios.get('http://localhost:8080/agriDrone/getBooking/'+rowid).then((res)=>{
      setCurrBookingDetails(res.data)
    })
    setUrlId(searchParams.get("rowid"))
    console.log(searchParams.get("rowid"))
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
    <>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pilot for the service
          </Typography>
          <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Pilot details
              </div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Pilot Id
              </div>
              <div className="col-sm-4 columnBillsub">{currBookingDetails && currBookingDetails.pilotLicense}</div>
              {/* <img src={require("./../Assets/Line.svg").default}  style={{paddingTop:"5px"}}/> */}
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Contact
              </div>
              <div className="col-sm-4 columnBillsub">{currBookingDetails && currBookingDetails.phoneNumber}</div>
              {/* <img src={require("./../Assets/Line.svg").default} /> */}
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Location
              </div>
              <div className="col-sm-4 columnBillsub">{currBookingDetails && currBookingDetails.farmLand.split('$')[0]}</div>
              {/* <img src={require("./../Assets/Line.svg").default} /> */}
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                
              </div>
              <div className="col-sm-4 columnBillsub"></div>
              {/* <img src={require("./../Assets/Line.svg").default} /> */}
            </div>
            
            
        </Box>
        </Modal>
      <div className="container-fluid detailedServiceReport">
        
        <div className="row">
            <div className="col-sm-2"><button onClick={()=>props.closeDetailedBooking()} className="BackButton"> Back</button></div>
            <div className="col-sm"> <h2 style={{float:"left"}}>Service Report for : {urlId!=null ? urlId : props.row.id}</h2></div>


        </div>
        <div className="row ServiceReportDetailsRow">
          <div className="col-sm-6 column1">
            {" "}
            <div className="row">
              <h4>Service Details : </h4>
            </div>
            <div className="row serviceText">
              <h6>Service ID {currBookingDetails && currBookingDetails.bookingId}</h6>
            </div>
            <div className="row serviceText">
              <h6>Status : {currBookingDetails && currBookingDetails.status}</h6>
            </div>
            <div className="row serviceText">
              <h6>Service Details :{currBookingDetails && currBookingDetails.serviceType}</h6>
            </div>
            <div className="row serviceText">
              <h6>Time :{currBookingDetails && currBookingDetails.fromDate} to {currBookingDetails && currBookingDetails.toDate}</h6>
            </div>
            <div className="row serviceText">
              <h6>Land :{currBookingDetails && currBookingDetails.farmLand.replace('$',', ')}</h6>
            </div>
            <div className="row serviceText">
              <h6>Price :{currBookingDetails && currBookingDetails.totalPrice}</h6>
            </div>
          </div>
          <div className="col-sm"> 
            <div className="row SignatureRow">
              <div className="col-sm-8"><h5 className="SignatureHead">Farmer Signature</h5></div>
              <div className="col-sm-4"><button className="SignatureText SignatureButton" onClick={()=>{setfarmerSign(true)}}>Sign</button></div>
              <h6 className="SignatureText">{farmerSign ==true ? "Signed" :"Not Signed"}</h6>
            </div>
            <div className="row SignatureRow">
              <div className="col-sm-8"><h5 className="SignatureHead">Pilot Signature</h5></div>
              {/* <div className="col-sm-4"><button className="SignatureText SignatureButton" onClick={()=>{}}>Sign</button></div> */}
              <h6 className="SignatureText">Signed</h6>
            </div>
          </div>
          <div className="col-sm">

          <img src={profileImage} alt="Logo"  width={"110px"} height={"120px"}/>
          </div>
        </div>
        <div className="row imageRow">
            <div className="col-sm"><TitlebarImageList time={currBookingDetails && currBookingDetails.fromDate}/></div>
            <div className="col-sm pilot-div">
                <div className="row">
                    <h3>Pilot details</h3>
                </div>
                <div className="row">
                    <h6>Pilot Name : {currBookingDetails && currBookingDetails.pilotName}</h6>
                </div>
                <div className="row">
                    <h6>Pilot ID :{currBookingDetails && currBookingDetails.pilotLicense}</h6>
                </div>
                <div className="row">
                    <h6>Contact : {currBookingDetails && currBookingDetails.phoneNumber}</h6>
                </div>

                <div className="row button-div">
                    <button className="viewMore" onClick={() => handleOpen() }>View more</button>
                </div>
            </div>
        
        </div>
        
      </div>
    </>
  );
}

export default DetailedServiceReport;
