import { Box } from "@mui/system";
import React, { useState } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";
import SelectedDroneDetails from "../DroneDetailed/droneDetailed";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SearchIcon from "@mui/icons-material/Search";
import "../../MyBookings/DetailedBooking.css";
import * as moment from 'moment';

const Step3 = (props) => {
  // here we will have all the data in props to display in the page
  // need to add th html tags
  // refer to the stepCoreContent.js file for the props name used.
  console.log(props.droneSelected, props.selectedFarmLand);
  const value = props.droneSelected;
  const farmLand = props.selectedFarmLand;
  return (
    <div>
      <Box mt={2} ml={5}>
        <div
          className="row"
          style={{
            border: "1px solid gray",
            width: "340px",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <div
            className="col-sm-4"
            style={{ display: "inline-block", float: "left", width: "150px" }}
          >
            <div className="row" style={{ fontWeight: "600", color: "grey" }}>
              {value.line1}
            </div>
            <div className="row" style={{ fontWeight: "600", color: "grey" }}>
              {value.service}
            </div>
            <div className="row" style={{ fontWeight: "600", color: "grey" }}>
              {value.equipment}
            </div>
            <div className="row" style={{ fontWeight: "600", color: "grey" }}>
              {value.line6}
            </div>
            <div className="row" style={{ fontWeight: "300", color: "grey" }}>
              {value.line7}
            </div>
            <div className="row" style={{ fontWeight: "300", color: "grey" }}>
              {value.line8}
            </div>
          </div>
          <div
            className="col-sm-2"
            style={{ display: "inline-block", marginLeft: "1px" }}
          >
            <img src={require("../../Assets/drone.svg").default} />
          </div>
          <div
            className="row"
            style={{
              fontWeight: "300",
              color: "grey",
              marginLeft: "-104px",
              marginTop: "10px",
            }}
          >
            <span>
              <b>${value.price}</b> / per hour{" "}
            </span>
          </div>
          {/* <ListItemButton role={undefined} style={{ borderRadius: '8px', color: 'white', width: '80px', padding: '2px', display: 'inline-block', backgroundColor: '#0096FF' }}>
                                                    <ListItemText primary="Select" />
                                                </ListItemButton> */}
          <button
            style={{
              borderRadius: "7px",
              color: "white",
              width: "100px",
              padding: "5px",
              display: "inline-block",
              backgroundColor: "#0096FF",
            }}
            // onClick={() => handleSelect(value)}
          >
            Selected {">"}
          </button>
          {/* <Typography fontWeight={3} mt={2} ml={-12}> <b>$80</b> / per hour</Typography> */}
        </div>
        <Typography fontWeight={3} mt={2} ml={"-80.5%"}>
          {console.log(new Date(props.dateRange[0]))}
          <b>Start Date & Time :</b> {(new Date(props.dateRange[0]) +" ").replace("00:00:00 GMT-0800 (Pacific Standard Time)","")}
         <br></br> <b>End Date & Time :</b> {(new Date(props.dateRange[1]) +" ").replace("00:00:00 GMT-0800 (Pacific Standard Time)","")}
        </Typography>

        <div className="loc-s3">
          <table>
            <tr>
              <td>
                <Typography fontWeight={3} mt={-3} ml={0} align="top">
                  {" "}
                  <b>Location : </b>{" "}
                </Typography>
              </td>

              <td>
                <Typography align="bottom" ml="5px" mt={0.2}>
                  {farmLand.location}
                </Typography>
                <Typography align=" left" ml="5px">
                  {farmLand.title} : {farmLand.category}{" "}
                </Typography>
              </td>
            </tr>
            {/* <div className="loc">{farmLand.location}</div>
          <div>
            {farmLand.title} : {farmLand.category} */}
          </table>
        </div>
      </Box>
    </div>
  );
};

export default Step3;
