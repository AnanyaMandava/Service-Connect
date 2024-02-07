import React, { Component, useRef ,useState} from "react";
import "./DetailedBooking.css";
import { useNavigate } from "react-router-dom";
import profileImage from "./../Assets/profile1.png";
import { Button } from "@progress/kendo-react-buttons";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import axios from "axios";
import StartService from "./StartService/StartService";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


function DetailedBooking(props) {
  const navigate = useNavigate();
  const pdfExportComponent = useRef(null);
  const [startService,setStartService]=useState(false)
  const [alertMessage,setAlertMessage]=useState();
  const [showAlert,setShowAlert]=useState(false);
  const markCompleted = ()=>{
    //api call
    axios.patch('http://localhost:8080/agriDrone/updateStatus',{
    bookingId:props.row.bookingId,
    status:"completed"

    })
     setAlertMessage("Succesfully marked as complete");
     setShowAlert(true);
     setTimeout(() => {
       setShowAlert(false);
     }, 2000);
   }

  const startServiceCall = (bool) => {
  //   window.open('http://3.90.218.152/flightmonitor/','_blank')
    
  var nav='/StartService?id='+props.row.bookingId
  nav=nav.replace('#','')
  navigate(nav)
}


  return (
    <>
      {/* <button onClick={()=>{pdfExportComponent.current.save();}}>save pdf</button> */}
      {/* <PDFExport  ref={pdfExportComponent}> */}
      {showAlert && <Stack sx={{ width: '140%',zIndex:'10',marginTop:"-10px" }} spacing={2}>
        <Alert severity="success">
        
        {alertMessage}
      </Alert>
      </Stack>}
      <div style={{ backgroundColor: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {" "}
          <button
            onClick={() => props.closeDetailedBooking()}
            className="BackButton"
          >
            {" "}
            Return Back to Listing
          </button>
          <button
            onClick={() => {
              pdfExportComponent.current.save();
            }}
            className="BackButton"
          >
            {" "}
            Save as PDF
          </button>
        </div>
        <div
          className="row"
          style={{
            backgroundColor: "white",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <div className="col-sm headingDetails">
            <h3 style={{ float: "left" }}>Service {props.row.bookingId}</h3>
          </div>
        </div>

        <div
          className="row "
          style={{
            backgroundColor: "white",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <p
            style={{
              float: "left",
              display: "flex",
              padding: "10px",
              color: "grey",
            }}
          >
            Your total bill is below
          </p>
        </div>

        <div
          className="row "
          style={{
            backgroundColor: "white",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <p style={{ float: "left", display: "flex", padding: "10px" }}>
            Summary
          </p>
          <div className="row">
            <div className="col-sm-2">
              <img src={require("./../Assets/drone.svg").default} />
            </div>

            <div className="col-sm-4" style={{ float: "left" }}>
              <div className="row" style={{ fontWeight: "600", color: "grey" }}>
                Drone Name : {props.row.brand}
              </div>
              <div className="row" style={{ fontWeight: "600", color: "grey" }}>
                {/* Drone Id : {props.row.bookingId} */}
              </div>
              <div className="row" style={{ fontWeight: "600", color: "grey" }}>
                Location{" "}
              </div>
              <div className="row" style={{ fontWeight: "300", color: "grey" }}>
                360 South Market Street{" "}
              </div>
              <div className="row" style={{ fontWeight: "300", color: "grey" }}>
                Date{" "}
              </div>
            </div>

            <div className="col-sm-2">
              <img
                src={profileImage}
                alt="Logo"
                width={"110px"}
                height={"120px"}
              />
            </div>
            <div className="col-sm-4" style={{ float: "left" }}>
              <div className="row" style={{ fontWeight: "600", color: "grey" }}>
                Drone Pilot{" "}
              </div>
              <div className="row" style={{ fontWeight: "600", color: "grey" }}>
                {props.row.pilotName}
              </div>
              <div className="row" style={{ fontWeight: "600", color: "grey" }}>
                {props.row.pilotLicense}
              </div>
              <div className="row" style={{ fontWeight: "300", color: "grey" }}>
                360 South Market Street{" "}
              </div>
              <div className="row" style={{ fontWeight: "300", color: "grey" }}>
               
              </div>
            </div>
          </div>
          <div className="row billTable">
            <div className="col-sm-4">
              <div className="row buttonRow">
                <button className={props.bookingStatus!="active"?"noButtonPayment":"buttonPayment"}  disabled={props.bookingStatus!="active"?true:false} onClick={() => startServiceCall(true)}  >
                  Start service
                </button>
              </div>
              <div className="row buttonRow">
                <button className={props.bookingStatus!="active"?"noButtonPayment":"buttonPayment"} disabled={props.bookingStatus!="active"?true:false} onClick={()=> markCompleted()} >
                  Mark as completed
                </button>
              </div>
              <div className="row buttonRow">
                <button className="buttonPayment" onClick={()=>navigate('/Pilot')} >
                  Back to dashboard
                </button>
              </div>
              {startService==true?<div className="row buttonRow">
                <button className="buttonPayment" >
                  Close mission planner
                </button>
              </div>:""}
            </div>
            <div className="col-sm-8">
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service details
              </div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Service Id
              </div>
              <div className="col-sm-2 columnBillsub">{props.row.bookingId}</div>
              {/* <img src={require("./../Assets/Line.svg").default}  style={{paddingTop:"5px"}}/> */}
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Duration
              </div>
              <div className="col-sm-2 columnBillsub">{props.row.serviceDuration} Days</div>
              {/* <img src={require("./../Assets/Line.svg").default} /> */}
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Farm Land 
              </div>
              <div className="col-sm-2 columnBillsub">{props.row.farmLand}</div>
              {/* <img src={require("./../Assets/Line.svg").default} /> */}
            </div>
            
            </div>
            
          </div>
        </div>

        {/* Bill table */}
        {/* <div className="row billTable">
          <div className="col-sm-2"></div> */}
        {/* column 1 */}
        {/* <div
            className="col-sm-4"
            style={{ backgroundColor: "#E7E9EB", paddingTop: "20px" }}
          > */}
        {/* Drone based cost */}
        {/* <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Drone Base Cost
              </div>
              <div className="col-sm-2 columnBillsub">20</div>
              <img src={require("./../Assets/Line.svg").default} />
            </div> */}
        {/* Drone based cost */}

        {/* Flights per day */}
        {/* <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Flights per day
              </div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                1x 10:00 AM - 5:00 PM PST Flight: Full Day
              </div>
              <div className="col-sm-2 columnBillsub">20</div>
              <img src={require("./../Assets/Line.svg").default} />
            </div> */}
        {/* Flights per day */}

        {/* Hourly Service Operations Per Day */}

        {/* <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Hourly Service Operations Per Day
              </div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                1x Data Collection - Crop Health
              </div>
              <div className="col-sm-2 columnBillsub">20</div>
              <img src={require("./../Assets/Line.svg").default} />
            </div> */}

        {/* Hourly Service Operations Per Day */}

        {/* Service Duration */}

        {/* <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service Duration
              </div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                1 Day - On-Demand
              </div>
              <div className="col-sm-2 columnBillsub">20</div>
              <img src={require("./../Assets/Line.svg").default} />
            </div> */}

        {/* Service Duration */}

        {/* Total */}

        {/* <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Total Amount
              </div>
            </div>

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Payment Method
              </div>
              <div className="col-sm-2 columnBillsub">#4000</div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">Price</div>
              <div className="col-sm-2 columnBillsub">20</div>
              <img src={require("./../Assets/Line.svg").default} />
            </div> */}

        {/* total*/}
      </div>
      {/* column 2 */}
      {/* <div
            className="col-sm-4"
            style={{ backgroundColor: "#E7E9EB", paddingTop: "20px" }}
          >
            <div className="row billtableRow"> */}
      {/* Materials */}

      {/* <div className="col-sm columnBill columnBillBold">Materials</div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">(None)</div>
              <div className="col-sm-2 columnBillsub">20</div>
              <img src={require("./../Assets/Line.svg").default} />
            </div> */}

      {/* Materials */}

      {/* Equipment */}

      {/* <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">Equipment</div>
            </div>

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">1x Camera </div>
              <div className="col-sm-2 columnBillsub">20</div>
              <img src={require("./../Assets/Line.svg").default} />
            </div> */}

      {/* Equipment */}

      {/* Pilot Charge */}

      {/* <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Pilot Charge
              </div>
            </div>

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Drone setup and labor
              </div>
              <div className="col-sm-2 columnBillsub">20</div>
              <img src={require("./../Assets/Line.svg").default} />
            </div> */}

      {/* Pilot Charge */}
      {/* </div>
        </div> */}

      {/* </PDFExport> */}
    </>
  );
}

export default DetailedBooking;
