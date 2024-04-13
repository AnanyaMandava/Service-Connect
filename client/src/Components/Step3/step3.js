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
import { LocalizationProvider, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const Step3 = (props) => {
  // here we will have all the data in props to display in the page
  // need to add th html tags
  // refer to the stepCoreContent.js file for the props name used.

  console.log("Step3: Props:", props);
  // console.log("Date Range in Step3:", dateRange);  // Check what is actually being received

  console.log(props.providerSelected, props.selectedService);
  const { providerSelected, dateRange } = props;

  const value = props.providerSelected;
   const startDate = new Date(dateRange[0]).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  const endDate = new Date(dateRange[1]).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });

  // const farmLand = props.selectedService;
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
              {value.service.serviceName}
            </div>
            <div className="row" style={{ fontWeight: "600", color: "grey" }}>
              {value.serviceProvider.fullname}
            </div>
            <div className="row" style={{ fontWeight: "600", color: "grey" }}>
              {value.serviceType.serviceType}
            </div>
            <div className="row" style={{ fontWeight: "600", color: "grey" }}>
              {value.serviceProvider.address}
            </div>
            <div className="row" style={{ fontWeight: "300", color: "grey" }}>
              {value.serviceProvider.city}
            </div>
            <div className="row" style={{ fontWeight: "300", color: "grey" }}>
              {value.serviceProvider.state}
            </div>
            <div className="row" style={{ fontWeight: "300", color: "grey" }}>
              {value.serviceProvider.zipcode}
            </div>
            <div className="row" style={{ fontWeight: "300", color: "grey" }}>
              {value.serviceProvider.mobile}
            </div>
          </div>
          <div
            className="col-sm-2"
            style={{ display: "inline-block", marginLeft: "1px" }}
          >
            {/* <img src={require("../../Assets/drone.svg").default} /> */}
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
          <b>Start Date & Time :</b> {startDate}
         <br></br> <b>End Date & Time :</b> {endDate}
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
                  {value.serviceProvider.address}
                </Typography>
                <Typography align=" left" ml="5px">
                  {value.service.serviceName} : {value.serviceType.serviceType}{" "}
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
