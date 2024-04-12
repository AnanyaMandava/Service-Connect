import { Box } from "@mui/system";
import React, { useState ,useEffect} from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";
import SelectedDroneDetails from "../DroneDetailed/droneDetailed";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SearchIcon from "@mui/icons-material/Search";
import "./step5.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';

const Step5 = (props) => {
  // here we will have all the data in props to display in the page
  // need to add th html tags
  // refer to the stepCoreContent.js file for the props name used.
  const { providerSelected, selectedService, dateRange } = props;
  const navigate = useNavigate();
  const convertDate=(str)=> {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      console.log("inside converter")
    return [date.getFullYear(), mnth, day].join("-");
  }

  const [bookingData,setBookingData]=useState();
  useEffect(() => {
    console.log(localStorage.getItem('userId'), providerSelected.serviceProvider._id, selectedService._id, providerSelected.serviceType._id, dateRange[0], providerSelected.price);
    const bookingPayload = {
      userId: localStorage.getItem('userId'), // Assuming _id is available in auth.loginjson[0]
      serviceProviderId: providerSelected.serviceProvider._id,
      serviceId: providerSelected.service._id,
      serviceTypeId: providerSelected.serviceType._id,
      bookedDate: dateRange[0],
      startTime: "10:00", // Replace with actual start time
      endTime: "17:00", // Replace with actual end time
      TotalAmount: providerSelected.price,
      status: "Upcoming",
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
            <table style={{ position: "top" }}>
              {/* <th>
              <td>
                <Typography variant="h6">Summary</Typography>
              </td>
            </th> */}
              <tr>
                <td>
                  {/* <img
                    src={require("../../Assets/drone.svg").default}
                    style={{
                      border: "1px solid grey",
                      borderRadius: "5px",
                      marginRight: "20px",
                    }}
                  ></img> */}
                </td>
                <Typography align="left">
                  Service ID #{bookingData && bookingData.bookingId}, Booking ID #1{" "}
                </Typography>
                <Typography align="left">{bookingData &&  bookingData.brand}</Typography>
                <tr>
                  <td>
                    <Typography align="right"> </Typography>
                    <p
                      style={{
                        position: "left",
                        marginTop: "0px",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      {selectedService.serviceName}
                    </p>
                    <p
                      style={{
                        position: "left",
                        marginTop: "0px",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      {providerSelected.address}
                    </p>
                    <p
                      style={{
                        position: "left",
                        marginTop: "0px",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      {providerSelected.serviceType.serviceType}
                    </p>
                  </td>
                </tr>
              </tr>
            </table>
          </div>

          <div
            style={{
              display: "inline-block",
              // marginTop: "1px",
            }}
          >
            <table>
              <tr>
                <td>
                  {/* <img
                    src={require("../../Assets/mypilot.png")}
                    style={{
                      border: "1px solid grey",
                      borderRadius: "5px",
                      marginLeft: "20px",
                      marginRight: "20px",
                      width: "120px",
                      marginTop: "10px",
                    }}
                  ></img> */}
                </td>
                <tr>
                  <td style={{ marginRight: "200px" }}>
                    <Typography align="left"> Service Provider</Typography>
                    <p
                      style={{
                        position: "left",
                        marginTop: "0px",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      {bookingData && bookingData.spName}
                    </p>
                    <p
                      style={{
                        position: "left",
                        marginTop: "0px",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      Lisence Number : {bookingData && bookingData.spLicense}
                    </p>
                    <p
                      style={{
                        position: "left",
                        marginTop: "0px",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      Phone : {bookingData && bookingData.phoneNumber}
                    </p>
                    <p
                      style={{
                        position: "left",
                        marginTop: "0px",
                        marginLeft: "0px",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                     
                    </p>
                  </td>
                </tr>
              </tr>
            </table>
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
                Service Base Cost
              </div>
              <div className="col-sm-2 columnBillsub">{bookingData && bookingData.droneBaseCost}</div>
              {/* <img src={require("../../Assets/Line.svg").default} /> */}
            </div>
            {/* Drone based cost */}

            {/* Flights per day */}
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service date and time
              </div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                1x 10:00 AM - 5:00 PM PST 
              </div>
              <div className="col-sm-2 columnBillsub">20</div>
              {/* <img src={require("../..Assets/Line.svg").default} /> */}
            </div>
            {/* Flights per day */}

            {/* Hourly Service Operations Per Day */}

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Hourly Service Operations Per Day
              </div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                1x {bookingData && bookingData.serviceType}
              </div>
              <div className="col-sm-2 columnBillsub">20</div>
              {/* <img src={require("../../Assets/Line.svg").default} /> */}
            </div>

            {/* Hourly Service Operations Per Day */}

            {/* Service Duration */}

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Service Duration
              </div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
              {bookingData && bookingData.serviceDuration} Day - On-Demand
              </div>
              <div className="col-sm-2 columnBillsub">20</div>
              {/* <img src={require("../../Assets/Line.svg").default} /> */}
            </div>

            {/* Service Duration */}

            {/* Total */}

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                Total Amount
              </div>
            </div>

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                Payment Method
              </div>
              <div className="col-sm-2 columnBillsub">#4000</div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">Price</div>
              <div className="col-sm-2 columnBillsub">{bookingData && bookingData.totalPrice}</div>
              {/* <img src={require("../../Assets/Line.svg").default} /> */}
            </div>

            {/* total*/}
          </div>
          {/* column 2 */}
          <div
            className="col-sm-4"
            style={{ backgroundColor: "#E7E9EB", paddingTop: "20px" }}
          >
            <div className="row billtableRow">
              {/* Materials */}

              <div className="col-sm columnBill columnBillBold">Materials</div>
            </div>
            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">(None)</div>
              <div className="col-sm-2 columnBillsub">20</div>
              {/* <img src={require("../../Assets/Line.svg").default} /> */}
            </div>

            {/* Materials */}

            {/* Equipment */}

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">Equipment</div>
            </div>

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">1x {bookingData && bookingData.equipment} </div>
              <div className="col-sm-2 columnBillsub">20</div>
              {/* <img src={require("../../Assets/Line.svg").default} /> */}
            </div>

            {/* Equipment */}

            {/* SP Charge */}

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillBold">
                SP Charge
              </div>
            </div>

            <div className="row billtableRow">
              <div className="col-sm columnBill columnBillsub">
                
              </div>
              <div className="col-sm-2 columnBillsub">{bookingData && bookingData.spCharge}</div>
              {/* <img src={require("../../Assets/Line.svg").default} /> */}
            </div>

            {/* SP Charge */}
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
