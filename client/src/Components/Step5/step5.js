// import { Box } from "@mui/system";
import React, { useState ,useEffect} from "react";
import { Typography } from "@mui/material";
// import SelectedDroneDetails from "../DroneDetailed/droneDetailed";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import SearchIcon from "@mui/icons-material/Search";
import "./step5.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { format } from 'date-fns';

const Step5 = (props) => {
  // here we will have all the data in props to display in the page
  // need to add th html tags
  // refer to the stepCoreContent.js file for the props name used.
  const { providerSelected, selectedService, dateRange } = props;
  const navigate = useNavigate();

  console.log("Provider Data:", providerSelected);
  console.log("Service Data:", selectedService);
  console.log("dateRange Data:", dateRange);


  const [bookingData,setBookingData]=useState();
  useEffect(() => {
    console.log(localStorage.getItem('userId'), providerSelected.serviceProvider._id, selectedService._id, providerSelected.serviceType._id, dateRange[0], providerSelected.price);
    const bookingPayload = {
      userId: localStorage.getItem('userId'), // Assuming _id is available in auth.loginjson[0]
      serviceProviderId: providerSelected.serviceProvider._id,
      serviceId: providerSelected.service._id,
      serviceTypeId: providerSelected.serviceType._id,
      bookedDateTime: dateRange[0].toISOString(),
      totalAmount: providerSelected.price + (providerSelected.price * 0.10),
    };

    axios
      .post("http://localhost:3001/all/bookService", bookingPayload)
      .then((res) => {
        setBookingData(res.data);
        console.log("Booking Data:", res.data);
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
      });
  }, [providerSelected, selectedService, dateRange]);
  return (
    <div>
      

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" mr={"60%"}>
          Summary
        </Typography>
        <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "16%" }}
        >
          <div
            style={{
              display: "inline-block",
              //marginTop: "100px",
            }}
          >
          </div>
        </div>
      </div>
      <div style={{ marginTop: "-20px" }}>
        <div className="row billTable">
          <div className="col-sm-2"></div>
          {/* column 1 */}
          <div
            className="col-sm-4"
            style={{ backgroundColor: "#E7E9EB", paddingTop: "20px" }}
          >
            {/* Drone based cost */}
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service Name
              </div>
              <div className="col-sm columnBillsub">{bookingData && providerSelected.service.serviceName}</div>
              {/* <img src={require("../../Assets/Line.svg").default} /> */}
            </div>
            {/* Drone based cost */}

            {/* Flights per day */}
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service Type
              </div>
              <div className="col-sm columnBillsub">{bookingData && providerSelected.serviceType.serviceType} </div>
            </div>
            {/* Flights per day */}

            {/* Hourly Service Operations Per Day */}

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service Provider 
              </div>
              <div className="col-sm columnBillsub">{bookingData && providerSelected.serviceProvider.fullname} </div>
            </div>

            {/* Hourly Service Operations Per Day */}

            {/* Service Duration */}

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Phone Number 
              </div>
              <div className="col-sm columnBillsub">+1 {bookingData && providerSelected.serviceProvider.mobile} </div>
            </div>

            {/* Service Duration */}

            {/* Total */}

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Address
              </div>
              <div className="col-sm columnBillsub">{bookingData && providerSelected.serviceProvider.address}, {providerSelected.serviceProvider.city}, {providerSelected.serviceProvider.state}, {providerSelected.serviceProvider.zipcode} </div>
            </div>

            {/* total*/}
          </div>
          {/* column 2 */}
          <div
            className="col-sm-4"
            style={{ backgroundColor: "#E7E9EB", paddingTop: "20px" }}
          >
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service Base Cost
              </div>
              <div className="col-sm columnBillsub">{bookingData && providerSelected.price} USD</div>
            </div>

            {/* Materials */}

            {/* Equipment */}

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service Date and Time
              </div>
              <div className="col-sm columnBillsub">{bookingData && dateRange[0].toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })} </div>
            </div>

            {/* Equipment */}

            {/* SP Charge */}

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service Duration
              </div>
              <div className="col-sm columnBillsub">{bookingData && providerSelected.serviceType.duration} Hours</div>
            </div>

            {/* SP Charge */}

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service Provider Charges (10% of Base Charge)
              </div>
              <div className="col-sm columnBillsub">{bookingData && (providerSelected.price * 0.10)} USD</div>
            </div>

            {/* Total Amount */}
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Total Amount
              </div>
              <div className="col-sm columnBillsub">{bookingData && (providerSelected.price + (providerSelected.price * 0.10))} USD</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row buttonRow">
        <button className="buttonPayment" onClick={() => navigate("/")}>
          Return To Dashboard
        </button>
      </div>
    </div>
  );
};

export default Step5;
