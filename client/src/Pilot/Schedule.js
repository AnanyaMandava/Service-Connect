import * as React from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "./demo/demo";
import Cards from "./Cards";
import Chart from "./Chart.js";
import Chips from "./Chips";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Schedule() {
  

    const navigate=useNavigate();
    

    return <div className='row' style={{backgroundColor:"white"}}>
        <button onClick={()=>{navigate('/pilot') }}>Back to dashboard</button>
    <div className='col-sm-10' style={{width:"700px"}}><Scheduler  events={EVENTS} /></div>
    <div className='col-sm-2'></div>
    <div className='col-sm' style={{width:"700px"}}>
    <div className="row chips-row" style={{paddingTop:"30px"}}>
            <Chips title={"Upcoming Service"} date={"29/12/2022"} serviceType={"Data Collection"}/>
          </div>
          <div className="row">
            <Chips title={"Upcoming Service"} date={"29/10/2022"} serviceType={"Data Collection"}/>
          </div>

    </div>

    </div>
  }

