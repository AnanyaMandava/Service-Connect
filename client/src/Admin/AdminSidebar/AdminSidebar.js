import React, {Component} from "react";
import './AdminSidebar.css'
import { Outlet, Link } from "react-router-dom";
import { TabsListUnstyled } from "@mui/base";


function AdminSidebar () {
    return <>
    <div className="sidenav">
        <div className="sidenav-heading">
            <img src = { require('..//..//Assets/dashsvgg.svg').default } />
            <span className="sidenav-heading-span">Dashboard</span>
        </div>
        <div className="sidenav-ul">
            <ul style={{listStyle:"none"}}>

                <span className='span-li'> 
                <li>
                    <Link className="nav-link" to='/adminhome/dronecatalog'>Drone Catalog</Link>
                </li>
                <img src={ require('../../Assets/arrow.svg').default}  alt = "mySVgImage"/>
                </span>

                <span className="span-li">
                <li>
                    <Link className="nav-link" to='/adminhome/dronemngt'>Drone Management</Link>
                </li>
                <img src={ require('../../Assets/arrow.svg').default}  alt = "mySVgImage"/>
                </span>
                
                <span className="span-li">
                <li>
                    <Link className="nav-link" to='/adminhome/dronebook'>Drone Booking</Link>
                </li>
                <img src={ require('../../Assets/arrow.svg').default}  alt = "mySVgImage"/>
                </span>
                
                <span className="span-li">
                <li>
                    <Link className="nav-link" to='/adminhome/dronefleet'>Drone Fleet Tracking</Link>
                </li>
                <img src={ require('../../Assets/arrow.svg').default}  alt = "mySVgImage"/>
                </span>
                
                <span className="span-li">
                <li>
                    <Link className="nav-link" to='/adminhome/droneservice'>Service History</Link>
                </li>
                <img src={ require('../../Assets/arrow.svg').default}  alt = "mySVgImage"/>
                </span>
                
                <span className="span-li">
                <li>
                    <Link className="nav-link" to='/adminhome/dronedata'>Drone Data</Link>
                </li>
                <img src={ require('../../Assets/arrow.svg').default}  alt = "mySVgImage"/>
                </span>
                
                <span className="span-li">
                <li>
                    <Link className="nav-link" to='/adminhome/droneAI'>Drone AI</Link>
                </li>
                <img src={ require('../../Assets/arrow.svg').default}  alt = "mySVgImage"/>
                </span>
                
            </ul>
        </div>
    </div>
    </>;
}

export default AdminSidebar;