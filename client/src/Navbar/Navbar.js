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
            <Link class="nav-link" to={props.role == "sp" ? "/pilot" : "/"}>
              Home
            </Link>
          </span>{" "}
          <span className="navLinks">Contact</span>{" "}
          <span className="navLinks">
            <Link class="nav-link" to="/Profile">
              Profile
            </Link>
          </span>
          {(props.role == "sp" || props.role == "admin" )&& <span className="navLinks">
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
