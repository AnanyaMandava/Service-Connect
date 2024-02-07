import React, { Component } from "react";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";

function Navbar(props) {
  return (
    <>
      <div className="navBar">
        <div className="navContent">
          {" "}
          <span className="navLinks">
            <Link class="nav-link" to={props.role == "pilot" ? "/pilot" : "/"}>
              Home
            </Link>
          </span>{" "}
          <span className="navLinks">Contact</span>{" "}
          <span className="navLinks">
            <Link class="nav-link" to="/PilotProfile">
              Profile
            </Link>
          </span>
          {(props.role == "pilot" || props.role == "admin" )&& <span className="navLinks">
            <span onClick={()=>{props.changeLoginStatus(false)}}><Link class="nav-link" to="/">
              Logout
            </Link></span>
          </span>}
        </div>
      </div>
    </>
  );
}

export default Navbar;
