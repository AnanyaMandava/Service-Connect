import React, { useEffect, useState } from "react";
import { Box, Autocomplete, TextField } from "@mui/material";
import SelectedDroneDetails from "../DroneDetailed/droneDetailed";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../../MyBookings/DetailedBooking.css";
import axios from "axios";
import * as moment from 'moment';

const priceOptions = ["< $50", "< $100", "< $200", "< $300"];
const statusOptions = ["Available", "UnAvailable"];

function DroneCatelog(props) {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [providerMatched, setproviderMatched] = useState([]);
  const [providerSelected, setProviderSelected] = useState(null);
  const [showProviders, setShowProviders] = useState(false);
  const { title } = props.selectedService;

  useEffect(() => {
    axios.get(`http://localhost:3001/all/getservicetype/${title}`).then((res) => {
      setServiceTypes(res.data);
    });
  }, [title]);

  const searchDrones = () => {
    if (selectedServiceType && selectedPrice) {
      setShowProviders(true);
      const priceLimit = Number(selectedPrice.split('< $')[1]);
      console.log("Price Limit:", priceLimit);
  
      // Fetch the serviceTypeId based on the selected service type name
      axios.get(`http://localhost:3001/all/getservicetypeid`, {
        params: {
          serviceTypeName: selectedServiceType // If serviceTypes contains objects, use selectedServiceType.serviceType
        }
      }).then((response) => {
        const serviceTypeId = response.data._id;
        console.log("Service Type Id:", serviceTypeId);
  
        // Now fetch service providers based on the serviceTypeId and price range
        axios.get(`http://localhost:3001/all/getspsearchrecords`, {
          params: {
            serviceTypeId: serviceTypeId,
            maxPrice: priceLimit
          }
        }).then((res) => {
          setproviderMatched(res.data);
          console.log("Service Provider List", res.data);
        }).catch((error) => {
          console.error("Error fetching service providers:", error);
        });
      }).catch((error) => {
        console.error("Error fetching service type ID:", error);
      });
    } else {
      setShowProviders(false);
    }
  };
  
  const handleSelectProvider = (value) => {
    console.log(props);
    console.log("Value:", value);
    setProviderSelected(value);
    props.setProviderSelected(value);
    setShowProviders(false);
    console.log("ProviderSelected:", providerSelected);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, border: "1.5px solid black", padding: "15px", color: "blue", backgroundColor: "#F3F3F5", borderRadius: 4 }}>
        <Autocomplete
          disablePortal
          options={serviceTypes}
          onChange={(event, value) => setSelectedServiceType(value)}
          renderInput={(params) => <TextField {...params} label="Service Type" />}
        />
        <Autocomplete
          disablePortal
          options={priceOptions}
          onChange={(event, value) => setSelectedPrice(value)}
          renderInput={(params) => <TextField {...params} label="Price" />}
        />
        <Autocomplete
          disablePortal
          options={statusOptions}
          onChange={(event, value) => setSelectedStatus(value)}
          renderInput={(params) => <TextField {...params} label="Status" />}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={<b className="dateclass">Date</b>}
            className="datepickerclass"
            value={selectedDate}
            minDate={new Date()}
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <button className="SearchButton"
        style={{
          icon: "search",
          marginLeft: "10px",
          borderRadius: "7px",
          color: "white",
          width: "100px",
          padding: "5px",
          display: "inline-block",
          backgroundColor: "#0096FF",
          alignItems: "center",
          align: "center",
          // marginTop: "20px",
        }} onClick={searchDrones} >
        Search
      </button>
      <div className="container-fluid">
      {showProviders && providerMatched.length > 0 && (
        <div className="row">
        {providerMatched.map((value, index) => (
            <Box key={index} mt={3} ml={5} className="col-sm">
                <div className="row"
                    style={{
                      border: "1px solid gray",
                      width: "650px",
                      padding: "20px",
                      borderRadius: "5px",
                      textAlign: "left"
                    }}>
                    <div className="row"
                        style={{ fontWeight: "600", color: "grey", display: "flex", alignItems: "center" }}><strong>Service: {value.service.serviceName} </strong></div>
                    <div className="row"
                        style={{ fontWeight: "600", color: "grey", display: "flex", alignItems: "center"  }}><strong>Service Type: {value.serviceType.serviceType} </strong></div>
                    <div className="row"
                      style={{
                        fontWeight: "600",
                        color: "grey" , display: "flex", alignItems: "center" 
                      }}><span><b>Price:</b> ${value.price} /hr </span></div>
                    <div className="row"
                        style={{ fontWeight: "600", color: "grey", display: "flex", alignItems: "center"  }}><strong>Provider: {value.serviceProvider.fullname}</strong></div>
                    <div className="row"
                        style={{ fontWeight: "600", color: "grey", display: "flex", alignItems: "center"  }}><strong>Email: {value.serviceProvider.email}</strong></div>
                    <div className="row"
                        style={{ fontWeight: "600", color: "grey", display: "flex", alignItems: "center"  }}><strong>Mobile: {value.serviceProvider.mobile}</strong></div>
                    <div className="row"
                        style={{ fontWeight: "600", color: "grey", display: "flex", alignItems: "center"  }}><strong>Address: {`${value.serviceProvider.address}, ${value.serviceProvider.city}, ${value.serviceProvider.state} ${value.serviceProvider.zipcode}`}</strong></div>
                    <button style={{
                        borderRadius: "7px",
                        color: "white",
                        width: "100px",
                        padding: "5px",
                        display: "inline-block",
                        backgroundColor: "#0096FF",
                      }} onClick={() => handleSelectProvider(value)}>Select {">"}</button>
                </div>
            </Box>
        ))}
        </div>
      )}

        {!showProviders && providerSelected && (
          <SelectedDroneDetails
            provider={providerSelected}
            service={props.selectedService}
            handleDateRange={props.handleDateRange}
          />
        )}
        {showProviders && providerMatched.length === 0 && "No services found"}
      </div>
    </Box>
  );
}

export default DroneCatelog;
