import React, { Component ,useEffect,useState} from "react";
import TextField from "@mui/material/TextField";
import { textAlign } from "@mui/system";
import axios from "axios";
function FarmProfile() {
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
      <div className="farmProfilePage container-fluid">
        <div className="row">
            <h3 style={{color:"#1A3447",textAlign:"left"}}>Farm Profile</h3>
        </div>
        <div className="row row-farmProfile">
        
          <div className="col-sm" style={{padding:"20px"}}>
            <div className="row innerrow"> Farm Address</div>
            <div className="row innerrow">
              {" "}
              <TextField
                required
                id="standard"
                floatingfloatingLabelTextText="Name"
                value={response &&(response.username)}
              />
            </div>
            <div className="row innerrow">
              {" "}
              <TextField
                required
                id="outlined-required"
                floatingLabelText="Address"
                value={response &&(response.unit_no+","+response.address)}
              />
            </div>
            <div className="row innerrow">
              {" "}
              <TextField
                required
                id="outlined-required"
                floatingLabelText="City"
                value={response &&(response.city)}
              />
            </div>
            <div className="row innerrow">
                <div className="col-sm"><TextField
                required
                id="outlined-required"
                floatingLabelText="Country"
                value={response &&(response.state)}
              /></div>
              <div className="col-sm"><TextField
                required
                id="outlined-required"
                floatingLabelText="Zip Code"
                value={response &&(response.zipcode)}
              /></div>
             
              
            </div>
            <div className="row innerrow" style={{justifyContent:"center"}}> <button className="farmProfileButton-Save"> Save</button></div>
          </div>
          <div className="col-sm-6"><button className="farmProfileButton-Farmland">Farmland</button></div>
        </div>
      </div>
    </>
  );
}

export default FarmProfile;
