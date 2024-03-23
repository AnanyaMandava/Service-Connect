import React, { Component, useState } from "react";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import { color } from "@mui/system";
// import MenuItem from "@mui/material/MenuItem";
import SignUp from "./SignUp";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
// import { DatePicker } from "@mui/x-date-pickers";
function Login(props) {
  const [openSnack, setOpenSnack] = useState(false);
  const vertical = "top";
  const horizontal = "center";
  const [severity, setSeverity] = useState();

  const [message, setMessage] = useState();

  const handleClickSnack = () => {
    setOpenSnack(true);
    console.log(openSnack);
  };

  const [gender, setGender] = useState('');

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };
  const [data, setData] = useState();
  const roles = [
    {
      value: "Customer",
      label: "Customer",
    },
    {
      value: "SP",
      label: "SP",
    },
  ];
  const [signup, setSignUp] = useState(false);
  const [proceedSignUp, setproceedSignUp] = useState(false);

  const sendSignUpToDb = (dataR) => {
    // signup data to be sent to the dataabse
    // axios.post("http://localhost:8080/api/auth/signup",{
    //   username: "sp3",
    //   email: "sp3@gmail.com",
    //   password: "12345678",
    //   phone_number: 98765432,
    //   role : "customer",
    //   gender : "male",
    //   date_of_birth : "1998-12-20",
    //   address: "Fountain Plaza",
    //   driver_license: "FAED23RW1",
    //   farm_utility:"crop",
    //   payment_method: "card",
    //   payment_details : "1245 2345 1256",
    //   streetno: 2,
    //   unit_no:902,
    //   city:"san jose",
    //   state:"california",
    //   zipcode: 95113
    //   }
    //   )

    console.log("save to db for signup");
    console.log(data);
    console.log(dataR);
    if (data.role === "Customer") {
      axios.post("http://localhost:8080/api/auth/signup", {
        username: dataR.Name,
        email: data.email,
        password: data.password,
        phone_number: data.phone,
        role: data.role,
        gender: data.gender,
        date_of_birth: data.dob,
        address: dataR.Address,
        driver_license: dataR.DriversLicense,
        farm_utility: dataR.land,
        payment_method: "card",
        payment_details: dataR.CardNumber,
        streetno: 2,
        unit_no: 902,
        city: dataR.City,
        state: "California",
        zipcode: dataR.ZipCode,
      });
    } else if (data.role === "SP") {
      console.log("inside sp");
      axios.post("http://localhost:8080/api/auth/signup", {
        username: dataR.Name,
        email: data.email,
        password: data.password,
        phone_number: data.phone,
        role: data.role,
        gender: data.gender,
        date_of_birth: data.dob,
        address: dataR.Address,
        sp_license: dataR.DriversLicense,
        farm_utility: "none",
        payment_method: "card",
        payment_details: "000",
        streetno: 2,
        unit_no: 902,
        city: dataR.City,
        state: "California",
        zipcode: dataR.ZipCode,
      });
    }

    setproceedSignUp(false);
    setSignUp(!signup);
  };

  const changeSignUp = () => {
    setSignUp(!signup);
  };

  const createData = (name, phone, email, password, role, gender, dob) => {
    return { name, phone, email, password, role, gender, dob };
  };
  const handleSignUp = () => {
    setproceedSignUp(true);
    setData(
      createData(
        document.getElementById("Name").value,
        document.getElementById("Phone").value,
        document.getElementById("Email").value,
        document.getElementById("Password").value,
        document.getElementById("role").value,
        document.getElementById("gender").value,
        document.getElementById("dob").value
      )
    );
  };

  const validateLogin = (e) => {
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    const currentUserRole=document.getElementById("role").value;
    let role = null;
    console.log(currentUserRole);
    if (email === "") {
      console.log("inside null");
      setSeverity("error");
      setMessage("Invalid Credentials - or no details entered");
      handleClickSnack();
    } else {
      // if (currentUserRole === "SP") {
       
      // axios.post('http://localhost:3001/api/auth/spSignIn',{
      //     email:email,
      //     password:password,
      //   }).then((res)=>{
      //     role = "sp";
      //     props.changeLoginStatus(true, currentUserRole.toLowerCase(),email);
      //   }).catch((e)=>{
      //     console.log("inside sp error");
      //     role=null;
      //     setSeverity("error");
      //     setMessage("Invalid sp login credentials ");
      //     handleClickSnack();
      //   })}
      if (currentUserRole === "SP") {role = "sp";props.changeLoginStatus(true, currentUserRole.toLowerCase(),email);}
      
      // else if (currentUserRole === "Customer") {
      //   axios.post('http://localhost:8080/api/auth/customerSignIn',{
      //     email:email,
      //     password:password,
      //   }).then((res)=>{
      //     role = "customer";
      //     props.changeLoginStatus(true, currentUserRole.toLowerCase(),email);
      //   }).catch((e)=>{
      //     console.log("inside customer null");
      //     role=null;
      //     setSeverity("error");
      //     setMessage("Invalid customer login credentials ");
      //     handleClickSnack();
      //   })
      // }
      else if (currentUserRole === "Customer"){
          role = "customer";
          props.changeLoginStatus(true, currentUserRole.toLowerCase(),email);
         }
      else if (email === "admin") {role = "admin"; props.changeLoginStatus(true, currentUserRole.toLowerCase());};
      
      console.log(email + " " + password);
      
       
      
      
    }
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnack}
        onClose={handleCloseSnack}
        key={vertical + horizontal}
        autoHideDuration={6000}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
      {proceedSignUp === false ? (
        <div className="container-fluid login-container">
          {signup === false ? (
            <div className="row">
              <div className="col-sm-6 image-width">
                <img
                  className="login"
                  src={require("./../Assets/login-serviceconnect.webp")}
                  alt="mySvgImage"
                />
              </div>
              <div className="col-sm form">
                <Box
                  sx={{
                    paddingTop: "100px",
                    width: "60%",
                    maxWidth: "100%",
                    color: "#1A3447",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    id="Email"
                    type="email"
                    sx={{ color: "#1A3447" }}
                    required
                  />
                  <br />
                  <br />
                  <TextField
                    fullWidth
                    label="Password"
                    id="Password"
                    type="password"
                    required
                  />
                  <br />

                  <br></br>
                  <select
                    id="role"
                    select
                    label="Select"
                    helperText="Please select your role"
                    className="roleDropdown"
                    style={{ width: "100px" }}
                    onChange={(e) => {
                      console.log(e.value);
                    }}
                  >
                    {[
                      ...roles,
                      {
                        value: "Admin",
                        label: "Admin",
                      },
                    ].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    className="button-login"
                    onClick={(e) => {
                      validateLogin(e);
                    }}
                  >
                    Login
                  </button>
                  <br />
                  <div class="divider d-flex align-items-center my-4">
                    <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                  </div>
                  <button
                    className="button-signup"
                    onClick={() => changeSignUp()}
                  >
                    Sign Up
                  </button>
                </Box>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-sm-6 image-width">
                <img
                  className="login"
                  src={require("./../Assets/Login.svg").default}
                  alt="mySvgImage"
                />
              </div>
              <div className="col-sm form">
                <Box
                  sx={{
                    paddingTop: "0px",
                    width: "60%",
                    maxWidth: "100%",
                    color: "#1A3447",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    helperText = "Enter Full Name "
                    id="Name"
                    sx={{ color: "#1A3447" }}
                  />
                  <br />
                  <br />
                  <TextField
                    fullWidth 
                    helperText = "Enter Phone in 10 digits "
                    label="Phone" 
                    id="Phone" />
                  <br />
                  <br />
                  <TextField fullWidth label="Email" helperText = "Enter Valid Email address " id="Email" type="email" />
                  <br />
                  <br />
                  <TextField
                    fullWidth
                    label="Password"
                    helperText = "Use 8 characters or more for your password"
                    id="Password"
                    type="password"
                  />

                  <br />
                  <br />
                  <TextField
                    fullWidth
                    helperText = "Date of Birth"
                    id="dob"
                    type="Date"
                  />

                  <br />
                  <br />
                
                  <TextField
                      fullWidth
                      id="gender"
                      select
                      label="Gender"
                      value={gender}
                      onChange={handleChange}
                      helperText="Please select your gender"
                    >
                      <MenuItem key="Male" value="Male">
                        Male
                      </MenuItem>
                      <MenuItem key="Female" value="Female">
                        Female
                      </MenuItem>
                      {/* Add more options as needed */}
                  </TextField>
                    
                  <br />
                  <br />
                    <TextField fullWidth
                      id="role"
                      select
                      label="Role"
                      helperText="Please select your role"
                      // onChange={(e) => {
                      //   console.log(e.value);
                      // }}
                    >
                      {/* {roles.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))} */}
                      <option key="CUST" value="CUST">
                        Customer
                      </option>
                      <option key="SP" value="SP">
                        SP
                      </option>
                    </TextField>
                  <button
                    className="button-login"
                    onClick={() => {
                      handleSignUp();
                    }}
                  >
                    Sign Up
                  </button>
                  <br />
                  <div class="divider d-flex align-items-center my-4">
                    <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                  </div>
                  <button
                    className="button-signup"
                    onClick={() => changeSignUp()}
                  >
                    Login{" "}
                  </button>
                </Box>
              </div>
            </div>
          )}
        </div>
      ) : (
        <SignUp sendSignUpToDb={sendSignUpToDb} data={data} />
      )}
    </>
  );
}

export default Login;
