// import { React } from 'react';

import { Button, Typography } from "@mui/material";
// import { Box } from "@mui/system";
import StepOneImageListBlock from "../StepOneImageListBlock/StepOneImageListBlock";
import DroneCatelog from "../DroneCatelog/droneCatelog";
import * as React from "react";
import * as moment from 'moment';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro";
// import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
// import DroneCalendarDetails from "./droneCalendar";
import SelectedDroneDetailsFlight from "./SelectedDroneDetailsFlight";
import "./droneDetailed.css";
import img1 from "../../Assets/plus.png";
import { blue } from "@mui/material/colors";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file 
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
const SelectedDroneDetails = (props) => {
  const [value, setValue] = React.useState([null, null]);
  const [duration, setDuration] = React.useState(0);
  console.log("Drone:", props.drone);
  console.log("farmLand:", props.farmLand);
  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      
      key: 'selection'
    }
  ]);
  //   console.log(value[1].$D - value[0].$D);
  const handleDuration = (item) => {
   
    console.log("start date "+item.startDate);
    console.log("end date "+item.endDate);
    // if (value[1]) {
    //   const temp = value[1].$D - value[0].$D;
    //   setDuration(temp);
    //   console.log(temp);
    // }
    if(item && item.startDate && item.endDate)
    {setValue([item.startDate,item.endDate]);
      
      var start = moment(item.startDate, "YYYY-MM-DD");
      var end = moment(item.endDate, "YYYY-MM-DD");
      props.handleDateRange([item.startDate,item.endDate])
        //Difference in number of days
        setDuration(moment.duration(end.diff(start)).asDays()+1);
    }
  };
  return (
    <div className="roDrone">
      <div className="daterangecal">
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{ start: "Start", end: "End" }}
        >
          {/* <StaticDateRangePicker
            value={value}
            onChange={(newValue) => {
              handleDuration(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2, backgroundColor: blue }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          /> */}
          <DateRangePicker
  onChange={item => {setState([item.selection]);handleDuration(item.selection)}}
  showSelectionPreview={true}
  moveRangeOnFirstSelection={false}
  months={1}
  ranges={state}
  minDate={new Date()}
  direction="horizontal"
/>;
        </LocalizationProvider>
      </div>

      <div>
        {/* <table className="dronedetails">
          {/* <tr>
            <td>
              <Typography /*fontWeight={3} mt={-3} ml={0} align="top">
                {" "}
                <b>Location : </b>{" "}
              </Typography>
            </td>
          </tr>
          <tr>
            <td style={{align:"top"}}>
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
        {/*</table> */}
        <Box
          display="flex"
          border="1px solid grey"
          borderRadius={1}
          marginTop={10}
          marginLeft={10}
          flexDirection="column"
          padding={2}
        >
          <Typography align="left" fontWeight="lightweight">
            <b>Farm : </b> {props.farmLand.location}
          </Typography>
          <Typography align="left">
            {" "}
            <b>FarmLand : </b>
            {props.farmLand.title} - {props.farmLand.category}{" "}
          </Typography>
          <Typography align="left">
            {" "}
            <b>Service : </b>
            {props.drone.service}
          </Typography>
          <Typography align="left">
            {" "}
            <b>Rental : </b>by date
          </Typography>
          <Typography align="left">
            {" "}
            <b>Duration : </b>
            {duration}
          </Typography>
          <Box flexDirection={"column"}>
            <Typography align="left">
              {" "}
              <b>Flight times per day :</b>
            </Typography>
            <Box display="flex" flexDirection="row">
              <TextField sx={{ mt: "12px" }} label="Time" />
              <Button>Delete</Button>
              <Button>
                <Box
                  display="flex"
                  border="1px solid grey"
                  borderRadius={1}
                  p={1}
                  backgroungColor="white"
                  flexDirection="column"
                  width={170}
                  //   marginTop={}
                >
                  <Typography align="start">Add a flight Time</Typography>
                  <img src={img1} width="20%" height="20%" align="center" />
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default SelectedDroneDetails;
