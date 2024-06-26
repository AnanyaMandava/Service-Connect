
import Layout from './Layout/Layout'
import './App.css';
import { Routes, Route } from "react-router-dom";

import Maintenance from "./Maintenance/Maintenance";
import BookDrone from "./BookDrone/BookDrone";
import Profile from "./Profile/Profile";
import ServiceReport from "./ServiceReport/ServiceReport"
import Home from "./Home/Home"
import MyBookings from "./MyBookings/MyBookings"
import AdminLayout from './Admin/AdminLayout/AdminLayout';
import AdminHome from './Admin/AdminHome/Adminhome';
import DroneFleet from './Admin/DroneFleetTracking/dronefleetTracking';
import Simulation from './Simulation/Simulation';
import {useState,useEffect} from 'react';
import Login from './Login/Login'
import FarmProfile from './Profile/FarmProfile';
import Pilot from './Pilot/Pilot'
import { useNavigate } from "react-router-dom";
import Schedule from './Pilot/Schedule';
import AdmineditdeleteDrone from './Admin/AdminDroneManagement/Admineditdeletedrone';
import AdmindroneManagement from './Admin/AdminDroneManagement/Admindronemanagement';
import PilotBooking from './Pilot/PilotBookings';
import StartService from './Pilot/StartService/StartService'
import AdminaddDrone from './Admin/AdminDroneManagement/Adminadddrone';
import AdminDroneCatalog from './Admin/AdminDroneCatalog/AdminDroneCatalog';
import AdmineditdroneCatalog from './Admin/AdminDroneCatalog/AdmineditdroneCatalog';
import CompleteBooking from './Pilot/CompletedBookings';
import AddServiceComponent from './Pilot/AddService';

function App() {
  const navigate = useNavigate();
  const [role,setRole]=useState();
  const [login,setLogin]=useState(false);
  var loginDetails = {};
  var loginjson = [];
  loginDetails.loginjson = loginjson;

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    console.log(auth);
    if (auth && auth.loginjson[0].isLogged) {
      setRole(auth.loginjson[0].userRole)
      navigateToRole(auth.loginjson[0].userRole);
    }
  }, []);

  const navigateToRole=(role)=>{
    if(role=="sp"){
      setLogin(true)
      setRole("sp")
      navigate("/pilot");
    }
    else if( role=="customer"){
      setLogin(true)
      setRole("customer")
      navigate("/");
    }
    else if( role=="admin"){
      setLogin(true)
      setRole("admin")
      navigate("/adminhome");
    }
  }

  const changeLoginStatus=(bool,role,email)=>{
    setLogin(bool)
    //need to be changed based on the provided parameter
    if(bool && role=="sp")
    {

      var loginjson = {
        userName: email,
        userRole: role,
        isLogged: true,
      };
      loginDetails.loginjson.push(loginjson);
      localStorage.setItem("auth", JSON.stringify(loginDetails));
      setRole("sp")
      navigate("/pilot");
    }
    else if(bool && role=="customer"){
      console.log("inside app js role customer")
      var loginjson = {
        userName: email,
        userRole: role,
        isLogged: true,
      };
      loginDetails.loginjson.push(loginjson);
      localStorage.setItem("auth", JSON.stringify(loginDetails));
      setRole("customer")
      navigate("/")
    }
    else if(bool && role=="admin"){
      var loginjson = {
        userName: "",
        userRole: role,
        isLogged: true,
      };
      loginDetails.loginjson.push(loginjson);
      localStorage.setItem("auth", JSON.stringify(loginDetails));
      setRole("admin")
      navigate("/adminhome")
    }
    if(!bool){
      setRole(null)
      localStorage.removeItem("auth");
    }

  }
  return (
    <div className="App">
      {login==false ? <Login changeLoginStatus={changeLoginStatus}/>:
      
      <Routes>
        <Route path="/" element={<Layout role={role} changeLoginStatus={changeLoginStatus}/>}>
          <Route index element={<Home />} />
          <Route path="mybookings" element={<MyBookings />} />
          <Route path="service" element={<ServiceReport/>} />
          <Route path="profile" element={<Profile />} />
          <Route path="bookservice" element={<BookDrone />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="simulation" element={<Simulation />} />
          <Route path="farmProfile" element={<FarmProfile/>}/>
          <Route path="pilot" element={<Pilot/>}/>
          <Route path="Schedule" element={<Schedule/>}/>
          <Route path="PilotBooking" element={<PilotBooking/>}/>
          <Route path="CompleteBooking" element={<CompleteBooking/>}/>
          <Route path="AddServiceComponent" element={<AddServiceComponent/>}/>
          <Route path="StartService" element={<StartService/>}/>
          
        </Route>
        <Route path = "/adminhome" element = {<AdminLayout role={role} changeLoginStatus={changeLoginStatus}/>} >
          <Route index element = {<AdminHome/>} />
          <Route path = "dronecatalog"  element={<AdminDroneCatalog/>}/>
          <Route path = "dronemngt" element={<AdmindroneManagement/>}/>
          <Route path = "dronebook" />
          <Route path = "dronefleet" element = {<DroneFleet/>} />
          <Route path = "droneservice" />
          <Route path = "dronedata" />
          <Route path = "droneAI" />
          <Route path = "adminadddrone" element={<AdminaddDrone/>}/>
          <Route path = "admineditdeletedrone" element={<AdmineditdeleteDrone/>}/>
          <Route path = "editdronecatalog" element={<AdmineditdroneCatalog/>}/>
        </Route>
      </Routes>
    
  }    </div>
  );
}

export default App;
