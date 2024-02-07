import React, { Component,useEffect, useState } from "react";
import "./Profile.css";
import profileImage from "./../Assets/profile1.png";
import Fields from "./Fields";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [response,setResponse]=useState();
    useEffect((props) => {
      const auth = JSON.parse(localStorage.getItem("auth"));
        // createData("customer1@gmail.com", "+1 619 234 1235", "San Jose, CA", "Visa ending in 1246", "Not Set ","password") 
        axios.get('http://localhost:8080/api/auth/getUserDetails/'+auth.loginjson[0].userName+'?role=farmer').then((res)=>{
          setResponse(res.data)
          console.log(response)
        })
      }, []);

      


  return (
    <>
      <div className="container-fluid">
        <div className="row profile">
          <div className="col-sm-6 profile-column">
            {/* profile heading  */}
            <div className="row profile-heading">
              <h3>Profile</h3>
            </div>

            {/* image profile and name */}
            <div className="row image">
              <div className="col-sm-4">
                <img
                  src={profileImage}
                  alt="Logo"
                  width={"110px"}
                  height={"120px"}
                />
              </div>
              <div
                className="col-sm-8 "
                style={{ paddingTop: "20px", textAlign: "left" }}
              >
                <div className="row">
                  <h3 style={{ color: "#434343" }}>{response && response.username}</h3>
                </div>
                <div className="row">
                  <h6 style={{ color: "#434343" }}>{response && response.phone_number}</h6>
                </div>
              </div>
            </div>

            <Fields rowName={"Email"} rowValue={response && response.email}/>
            <Fields rowName={"Phone"} rowValue={response && response.phone_number}/>
            <Fields rowName={"Address"} rowValue={response &&(response.unit_no+","+response.address+","+response.city)}/>
            <Fields rowName={"Credit Cards"} rowValue={response && response.payment_details}/>
            <Fields rowName={"Paypal"} rowValue={"Not Set"}/>
            <Fields rowName={"Password"} rowValue={"*******"}/>

          </div>
          <div className="col-sm">
            <div className="row farmProfile"><button className="farmProfileButton"><Link class="nav-link" to="/farmProfile">Farm Profile</Link></button></div>
            <div className="row farmProfile"><button className="farmProfileButton">Farm Verification</button></div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
