import React, { useState } from "react";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import { color } from "@mui/system";
// import MenuItem from "@mui/material/MenuItem";
import SignUp from "./SignUp";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
// import user from "../../../service-connect-backend/Models/userSchema";
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

  const gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];

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
      label: "Service Provider",
    },
  ];
  const [signup, setSignUp] = useState(false);
  const [proceedSignUp, setproceedSignUp] = useState(false);

  const sendSignUpToDb = (dataR) => {

    console.log("save to db for signup");
    console.log(data);
    console.log(dataR);
      axios.post("${process.env.REACT_APP_F_URL}all/signup", {
        email: data.email,
        mobile: data.mobile,
        fullname: data.fullname,
        sex: data.sex,
        role: data.role,
        password: data.password,
        address: dataR.address,
        city: dataR.city,
        state: dataR.state,
        zipcode: dataR.zipcode,
      }).then(response => {
        console.log("Signup successful:", response.data);
      }).catch(error => {
        console.error("Error signing up:", error);
      });

    setproceedSignUp(false);
    setSignUp(!signup);
  };

  const changeSignUp = () => {
    setSignUp(!signup);
  };

  const createData = (fullname, mobile, email, password, role, sex) => {
    return { fullname, mobile, email, password, role, sex };
  };
  const handleSignUp = () => {
    setproceedSignUp(true);
    console.log(document.getElementById("fullname").value);
    setData(
      createData(
        document.getElementById("fullname").value,
        document.getElementById("mobile").value,
        document.getElementById("email").value,
        document.getElementById("password").value,
        document.getElementById("role").value,
        document.getElementById("sex").value
      )
    );
  };

  const validateLogin = (e) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const currentUserRole=document.getElementById("role").value;
    let role = null;
    console.log(currentUserRole);
    if (email === "") {
      console.log("inside null");
      setSeverity("error");
      setMessage("Invalid Credentials - or no details entered");
      handleClickSnack();
    } else {
      if (currentUserRole === "SP") {
       
      axios.post('${process.env.REACT_APP_F_URL}all/login',{
          email:email,
          password:password,
          role: currentUserRole,
        }).then((res)=>{
          role = "sp";
          console.log("Login successful for the user:", res);
          localStorage.setItem('userId', res.data.userId);
          props.changeLoginStatus(true, currentUserRole.toLowerCase(),email);
          console.log("inside sp success");
        }).catch((e)=>{
          console.log("inside sp error");
          role=null;
          setSeverity("error");
          setMessage("Invalid sp login credentials ");
          handleClickSnack();
        })}
      // if (currentUserRole === "SP") 
      //     {
      //       role = "sp";
      //       props.changeLoginStatus(true, currentUserRole.toLowerCase(),email);
      //     }
      
      else if (currentUserRole === "Customer") {
        axios.post('${process.env.REACT_APP_F_URL}all/login',{
          email:email,
          password:password,
          role: currentUserRole,
        }).then((res)=>{
          role = "customer";
          localStorage.setItem('userId', res.data.userId);
          props.changeLoginStatus(true, currentUserRole.toLowerCase(),email);
          console.log("inside customer success");
        }).catch((e)=>{
          console.log("inside customer null");
          role=null;
          setSeverity("error");
          setMessage("Invalid customer login credentials ");
          handleClickSnack();
        })
      }
      // else if (currentUserRole === "Customer"){
      //     role = "customer";
      //     props.changeLoginStatus(true, currentUserRole.toLowerCase(),email);
      //    }
      // else if (email === "admin") {role = "admin"; props.changeLoginStatus(true, currentUserRole.toLowerCase());};  
      // console.log(email + " " + password);
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
                    id="email"
                    type="email"
                    sx={{ color: "#1A3447" }}
                    required
                  />
                  <br />
                  <br />
                  <TextField
                    fullWidth
                    label="Password"
                    id="password"
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
                  src={require("./../Assets/login-serviceconnect.webp")}
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
                    label="FullName"
                    helperText = "Enter Full Name "
                    id="fullname"
                    sx={{ color: "#1A3447" }}
                  />
                  <br />
                  <br />
                  <TextField
                    fullWidth 
                    helperText = "Enter Mobile Number in 10 digits "
                    label="Mobile" 
                    id="mobile" />
                  <br />
                  <br />
                  <TextField fullWidth label="Email" helperText = "Enter Valid Email address " id="email" type="email" />
                  <br />
                  <br />
                  <TextField
                    fullWidth
                    label="Password"
                    helperText = "Use 8 characters or more for your password"
                    id="password"
                    type="password"
                  />
                  <br />
                  <br />    
                  <select
                    id="sex"
                    select
                    label="Select"
                    helperText="Please select your gender"
                    className="roleDropdown"
                    style={{ width: "100px" }}
                    onChange={(e) => {
                      console.log(e.value);
                    }}
                  >
                    {[
                      ...gender,
                    ].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                    
                  <br />
                  <br />
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
                    ].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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