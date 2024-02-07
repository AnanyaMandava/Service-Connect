import React, { Component } from 'react';
import Cards from "./Cards";
import Chart from "./Chart.js";
import Chips from "./Chips";
import './Pilot.css'
import { useNavigate } from "react-router-dom";
import PilotBooking from './PilotBookings';
function Pilot() {
  const navigate = useNavigate();

    return <div >
     <div className="row home " style={{ marginLeft: "10px" }}>
        <Cards />
      </div>
      <div className="row home graph" style={{ marginLeft: "10px" }}>
        <div className="col-sm-4">
          {" "}
          <Chart />
        </div>
        <div className="col-sm-2"></div>
        <div className="col-sm-3 chips">
          <div className="row chips-row">
            <Chips title={"Upcoming Service"} date={"06/12/2022"} serviceType={"Data Collection"}/>
          </div>
          <div className="row">
            <Chips title={"Upcoming Service"} date={"06/12/2022"} serviceType={"Data Collection"}/>
          </div>
        </div>
        <div className="col-sm chips">
          <div className="row chips-row">
     
            <div className='col-sm'><button className='button' onClick={()=>{ navigate("/Schedule")}}>Edit Schedule</button></div>
            <div className='col-sm'><button className='button' onClick={()=>{ navigate("/PilotBooking")}} >View Active Bookings</button></div>
            <div className='col-sm'><button className='button' onClick={()=>{ navigate("/PilotBooking?Status=completed")}} >View Completed Bookings</button></div>
            <div className='col-sm'><button className='button' >Edit Profile</button></div>
            
          </div>
          
        </div>
      </div>
    </div>;
}

export default Pilot;