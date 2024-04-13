import * as React from "react";
import { Typography, Button, TextField, Box } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "./droneDetailed.css";
import img1 from "../../Assets/plus.png";

const SelectedDroneDetails = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(() => {
    let time = new Date();
    time.setHours(time.getHours() + 2); // Default to two hours later
    return time;
  });

  //Handler for changing date
  const handleDateChange = (newDate) => {
    const updatedDate = new Date(newDate.$d);
    // Use the same day but keep the existing time of the day from startTime
    const startDateTime = new Date(updatedDate.setHours(startTime.getHours(), startTime.getMinutes()));
    const endDateTime = new Date(startDateTime.getTime() + 2 * 3600 * 1000); // +2 hours

    setSelectedDate(updatedDate);
    setStartTime(startDateTime);
    setEndTime(endDateTime);

    props.handleDateRange([startDateTime, endDateTime]);
  };

  // Handler for changing start time
  const handleStartTimeChange = (newTime) => {
    const updatedStartTime = new Date(newTime.$d);
    // Ensure the date part is still the selected date but time is updated
    const adjustedStartTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      updatedStartTime.getHours(),
      updatedStartTime.getMinutes()
    );
    const adjustedEndTime = new Date(adjustedStartTime.getTime() + 2 * 3600 * 1000); // +2 hours

    setStartTime(adjustedStartTime);
    setEndTime(adjustedEndTime);

    props.handleDateRange([adjustedStartTime, adjustedEndTime]);
  };

  return (
    <div className="roDrone">
      <Box className="daterangecal">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ mb: 2 }}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={handleStartTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              readOnly
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </LocalizationProvider>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4 }}>
        <Typography variant="h6">Service Details:</Typography>
        <Typography>{`Location: ${props.provider.serviceProvider.address}`}</Typography>
        <Typography>{`Service: ${props.provider.service.serviceName} - ${props.provider.serviceType.serviceType}`}</Typography>
        <Typography>{`Provider: ${props.provider.serviceProvider.fullname}`}</Typography>
        <Typography>{`Date: ${selectedDate.toLocaleDateString()}`}</Typography>
        <Typography>{`Time: ${startTime.toLocaleTimeString()} to ${endTime.toLocaleTimeString()}`}</Typography>
        {/* <Button variant="outlined" startIcon={<img src={img1} alt="Add" />}>
          Add a Flight Time
        </Button> */}
      </Box>
    </div>
  );
};

export default SelectedDroneDetails;
