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

function DroneCalendarDetails(props) {
  const [value, setValue] = React.useState([null, null]);
  console.log("Drone:", props.drone);
  console.log("farmLand:", props.farmLand);
  return (
    <div style={{ width: "150px" }}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: "Start", end: "End" }}
      >
        <StaticDateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DroneCalendarDetails;
