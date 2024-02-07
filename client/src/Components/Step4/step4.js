import { Box } from "@mui/system";
import React, { useState } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";
import SelectedDroneDetails from "../DroneDetailed/droneDetailed";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SearchIcon from "@mui/icons-material/Search";
import "./step4.css";

const Step4 = (props) => {
  // here we will have all the data in props to display in the page
  // need to add th html tags
  // refer to the stepCoreContent.js file for the props name used.
  const value = props.droneSelected;
  const farmLand = props.selectedFarmLand;
  return (
    <div>
     {console.log(new Date(props.dateRange[0])+"inside step 4")}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" mr={"60%"}>
          Summary Proceed to next page
        </Typography>
        {/* <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "16%" }}
        >
          <div
            style={{
              display: "inline-block",
              //marginTop: "100px",
            }}
          >
            <table style={{ position: "top" }}>
              <th>
              <td>
                <Typography variant="h6">Summary</Typography>
              </td>
            </th> 
              <tr>
                <td>
                  <img
                    src={require("../../Assets/drone.svg").default}
                    style={{
                      border: "1px solid grey",
                      borderRadius: "5px",
                      marginRight: "20px",
                    }}
                  ></img>
                </td>
                <Typography align="left">{value.line1}</Typography>
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
                      {value.service}
                    </p>
                    <p
                      style={{
                        position: "left",
                        marginTop: "0px",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      {farmLand.location}
                    </p>
                    <p
                      style={{
                        position: "left",
                        marginTop: "0px",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      {farmLand.title} : {farmLand.category}
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
                  <img
                    src={require("../../Assets/mypilot.png")}
                    style={{
                      border: "1px solid grey",
                      borderRadius: "5px",
                      marginLeft: "20px",
                      marginRight: "20px",
                      width: "120px",
                      marginTop: "-19px",
                    }}
                  ></img>
                </td>
                <tr>
                  <td style={{ marginRight: "200px" }}>
                    <Typography align="left"> Drone Pilot</Typography>
                    <p
                      style={{
                        position: "left",
                        marginTop: "0px",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      
                    </p>
                    <p
                      style={{
                        position: "left",
                        marginTop: "0px",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      Lisence Number : 
                    </p>
                    <p
                      style={{
                        position: "left",
                        marginTop: "0px",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      Phone : 
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
                      Address : 
                    </p>
                  </td>
                </tr>
              </tr>
            </table>
          </div>
        </div> */}
      </div>
      {/*  */}
    </div>
  );
};

export default Step4;
