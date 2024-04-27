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
    time.setHours(time.getHours() + (props.provider.serviceType.duration)); // Default to two hours later
    return time;
  });

  //Handler for changing date
  const handleDateChange = (newDate) => {
    const updatedDate = new Date(newDate.$d);
    // Use the same day but keep the existing time of the day from startTime
    const startDateTime = new Date(updatedDate.setHours(startTime.getHours(), startTime.getMinutes()));
    const endDateTime = new Date(startDateTime.getTime() + (props.provider.serviceType.duration) * 3600 * 1000); // +2 hours

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
    const adjustedEndTime = new Date(adjustedStartTime.getTime() + (props.provider.serviceType.duration) * 3600 * 1000); // +2 hours

    setStartTime(adjustedStartTime);
    setEndTime(adjustedEndTime);

    props.handleDateRange([adjustedStartTime, adjustedEndTime]);
  };

  return (
    <Box className="roDrone" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: 4 }}>
      <Box className="daterangecal" sx={{ flexBasis: '50%', padding: 2 }}>
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
      {/* <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4 }}> */}
      <Box className="dronedetails" sx={{ flexBasis: '50%', padding: 2, marginLeft: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Service Details:</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
    <Typography sx={{ fontWeight: 'bold' }}>Location:</Typography>
    <Typography sx={{ width: '85%', textAlign: 'left' }}>{props.provider.serviceProvider.address}</Typography>
  </Box>
  
  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
    <Typography sx={{ fontWeight: 'bold' }}>Service:</Typography>
    <Typography sx={{ width: '85%', textAlign: 'left' }}>{`${props.provider.service.serviceName} - ${props.provider.serviceType.serviceType}`}</Typography>
  </Box>
  
  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
    <Typography sx={{ fontWeight: 'bold' }}>Provider:</Typography>
    <Typography sx={{ width: '85%', textAlign: 'left' }}>{props.provider.serviceProvider.fullname}</Typography>
  </Box>
  
  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
    <Typography sx={{ fontWeight: 'bold' }}>Date:</Typography>
    <Typography sx={{ width: '85%', textAlign: 'left' }}>{selectedDate.toLocaleDateString()}</Typography>
  </Box>
  
  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
    <Typography sx={{ fontWeight: 'bold' }}>Time:</Typography>
    <Typography sx={{ width: '85%', textAlign: 'left' }}>{`${startTime.toLocaleTimeString()} to ${endTime.toLocaleTimeString()}`}</Typography>
  </Box>
  
  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
    <Typography sx={{ fontWeight: 'bold' }}>Duration:</Typography>
    <Typography sx={{ width: '85%', textAlign: 'left' }}>{`${props.provider.serviceType.duration} hours`}</Typography>
  </Box>

        </Box>
        {/* <Button variant="outlined" startIcon={<img src={img1} alt="Add" />}>
          Add a Flight Time
        </Button> */}
      {/* </Box> */}
    </Box>
  );
};

export default SelectedDroneDetails;
