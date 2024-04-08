import React, { useEffect, useState } from "react";
import "./Profile.css";
import profileImage from "./../Assets/profile1.png";
import Fields from "./Fields";
// import { Link } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [userData, setUserData] = useState();
  // function Profile() {
  //   const [response,setResponse]=useState();
  //     useEffect((props) => {
  //       const auth = JSON.parse(localStorage.getItem("auth"));
  //         // createData("customer1@gmail.com", "+1 619 234 1235", "San Jose, CA", "Visa ending in 1246", "Not Set ","password") 
  //         axios.get('http://localhost:8080/api/auth/getUserDetails/'+auth.loginjson[0].userName+'?role=customer').then((res)=>{
  //           setResponse(res.data)
  //           console.log(response)
  //         })
  //       }, []);

  useEffect(() => {
    const email = "test2@gmail.com"; // Assuming email is stored in loginjson[0].userName
    console.log(email);

    if (email) {
      axios.get(`http://localhost:3001/all/userdetails/${email}`)
        .then((res) => {
        setUserData(res.data.user);
    })
    .catch((error) => {
        console.error("Error fetching user details:", error);
    });

    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row profile">
        <div className="col-sm-6 profile-column">
          <div className="row profile-heading">
            <h3>Profile</h3>
          </div>

          <div className="row image">
            <div className="col-sm-4">
              <img
                src={profileImage}
                alt="Profile"
                width="110px"
                height="120px"
              />
            </div>
            <div className="col-sm-8" style={{ paddingTop: "20px", textAlign: "left" }}>
              <div className="row">
                <h3 style={{ color: "#434343" }}>{userData?.fullname}</h3>
              </div>
              <div className="row">
                <h6 style={{ color: "#434343" }}>{userData?.mobile}</h6>
              </div>
            </div>
          </div>

          <Fields rowName="Email" rowValue={userData?.email} />
          <Fields rowName="Phone" rowValue={userData?.mobile} />
          <Fields rowName="Fullname" rowValue={userData?.fullname} />
          <Fields rowName="Sex" rowValue={userData?.sex} />
          <Fields rowName="Address" rowValue={`${userData?.address}, ${userData?.city}, ${userData?.state}, ${userData?.zipcode}`} />
          <Fields rowName="Password" rowValue="*******" />
        </div>
        {/* <div className="col-sm">
          <div className="row farmProfile">
            <button className="farmProfileButton">
              <Link className="nav-link" to="/farmProfile">Customer Address</Link>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Profile;
