import React, { Component , useState} from 'react';
import './Sidebar.css'
//import { ReactComponent as DashSvg } from './../Assets/Vector/svg1.svg';
import { Outlet, Link } from "react-router-dom";

function Sidebar(props) {
    const [tab,setTab]=useState(null);
    const changeColor=(id)=>{
        setTab(id)
    }
    return <>
    <div className="sidenav">
        <div className='sidenav-heading'>
        <img src={require('./../Assets/dashsvgg.svg').default} alt='mySvgImage' /> <span className='sidenav-heading-span'>Dashboard</span>
        </div>

        <div className='sidenav-ul'>
            <ul style={{listStyle: "none",marginLeft:"-40px"}}>
                <span className={tab=="maintanance"?'span-li span-li-colored':'span-li '} id="maintanance" onClick={()=>{changeColor("maintanance")}}>
                <li className='li-dashboard'><img src={require('./../Assets/maintain.svg').default} alt='mySvgImage' />
                    <span className='li-span'><Link class="nav-link" to="/maintanance">
                    Maintanance
                  </Link></span>
                </li>
                <img src={require('./../Assets/arrow.svg').default} alt='mySvgImage' />
                </span>
                <span className={tab=="bookdrone"?'span-li span-li-colored':'span-li '} id="bookdrone" onClick={()=>{changeColor("bookdrone")}}>
                <li className='li-dashboard'><img src={require('./../Assets/maintain.svg').default} alt='mySvgImage' />
                    <span className='li-span'><Link class="nav-link" to="/bookdrone">Book Drone Service</Link></span>

                </li>
                <img src={require('./../Assets/arrow.svg').default} alt='mySvgImage' />

                </span>

                <span className={tab=="mybookings"?'span-li span-li-colored':'span-li '} id="mybookings" onClick={()=>{changeColor("mybookings")}}>

                <li className='li-dashboard'><img src={require('./../Assets/maintain.svg').default} alt='mySvgImage' />
                    <span className='li-span'><Link class="nav-link" to="/mybookings">My Bookings</Link></span>

                </li>
                <img src={require('./../Assets/arrow.svg').default} alt='mySvgImage' />
                </span>

                <span className={tab=="service"?'span-li span-li-colored':'span-li '} id="service" onClick={()=>{changeColor("service")}}>

                <li className='li-dashboard'><img src={require('./../Assets/maintain.svg').default} alt='mySvgImage' />
                    <span className='li-span'><Link class="nav-link" to="/service">Service Report</Link></span>

                </li>
                <img src={require('./../Assets/arrow.svg').default} alt='mySvgImage' />
                </span>
                <span className={tab=="profile"?'span-li span-li-colored':'span-li '} id="profile" onClick={()=>{changeColor("profile")}}>

                <li className='li-dashboard'><img src={require('./../Assets/maintain.svg').default} alt='mySvgImage' />
                    <span className='li-span'><Link class="nav-link" to="/profile">Profile</Link></span>

                </li>
                <img src={require('./../Assets/arrow.svg').default} alt='mySvgImage' />
                </span>

                {/* <span className={tab=="simulation"?'span-li span-li-colored':'span-li '} id="simulation" onClick={()=>{changeColor("simulation")}}>

                <li className='li-dashboard'><img src={require('./../Assets/maintain.svg').default} alt='mySvgImage' />
                    <span className='li-span'><Link class="nav-link" to="/simulation">Simulation Management</Link></span>

                </li>
                <img src={require('./../Assets/arrow.svg').default} alt='mySvgImage' />
                </span> */}
                <span className='span-li'>

                <li className='li-dashboard'><img src={require('./../Assets/maintain.svg').default} alt='mySvgImage' />
                    <span className='li-span' onClick={()=>{props.changeLoginStatus(false)}}  ><Link class="nav-link" to="/">Logout</Link></span>

                </li>
                {/* <img src={require('./../Assets/arrow.svg').default} alt='mySvgImage' /> */}
                </span>
            </ul>
        </div>
    </div>
    </>;
}

export default Sidebar;