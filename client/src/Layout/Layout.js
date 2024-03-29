import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet, Link } from "react-router-dom";

import './Layout.css'
function Layout(props) {
    return <>
    <Navbar role={props.role}  changeLoginStatus={props.changeLoginStatus}/>
    <div className='container-fluid layoutContainer'>
    {props.role!="sp" && <Sidebar role={props.role} changeLoginStatus={props.changeLoginStatus}/>}

    <div className={props.role=="sp"?'Main-SP':'Main'}>

    <Outlet />
    </div>

    </div>
    </>;
}

export default Layout;