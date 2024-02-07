// import { React } from 'react';

import { Typography } from "@mui/material";
// import { Box } from "@mui/system";
import StepOneImageListBlock from "../StepOneImageListBlock/StepOneImageListBlock";
import DroneCatelog from "../DroneCatelog/droneCatelog";
import * as React from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";

function SelectedDroneDetailsFlight(props) {
  const [value, setValue] = React.useState([null, null]);
  console.log("Drone:", props.drone);
  console.log("farmLand:", props.farmLand);
  return (
    <div style={{ width: "100px" }}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: "From", end: "Until" }}
      >
        <div>
          <table style={{ columnWidth: "100px", rowGap: "100px" }}>
            <tr>
              <td>
                <Typography fontWeight={3} mt={-3} ml={0} align="top">
                  {" "}
                  <b>Location : </b>{" "}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <b>farm:</b>
              </td>
              <td>
                <Typography align="bottom" ml="5px" mt={0.2}>
                  {props.farmLand.location}
                </Typography>
                <Typography align=" left" ml="5px">
                  {props.farmLand.title} : {props.farmLand.category}{" "}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <b> Service : </b>
              </td>
              <td>
                <Typography align="bottom" ml="5px" mt={0.2}>
                  {props.drone.service}
                </Typography>
              </td>
            </tr>
            {/* <div className="loc">{farmLand.location}</div>
          <div>
            {farmLand.title} : {farmLand.category} */}
          </table>
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default SelectedDroneDetailsFlight;
