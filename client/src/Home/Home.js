import React, { Component } from "react";
import Cards from "./Cards.js";
import Chart from "./Chart.js";
import Chips from "./Chips";
import "./Home.css";
function Home() {
  return (
    <>
      <div className="row home " style={{ marginLeft: "10px" }}>
        <Cards />
      </div>
      <div className="row home graph" style={{ marginLeft: "10px" }}>
        <div className="col-sm-4">
          {" "}
          <Chart />
        </div>
        <div className="col-sm-3"></div>
        <div className="col-sm-4 chips">
          <div className="row chips-row">
            <Chips title={"Upcoming Service"} date={"9/12/2022"} serviceType={"Data Collection"}/>
          </div>
          <div className="row">
            <Chips title={"Completed Service"} date={"12/12/2022"} serviceType={"Data Collection"}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
