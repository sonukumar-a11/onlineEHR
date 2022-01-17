import React from "react";
import { Link } from "react-router-dom";
import "../Dasboard.css"

const PatientsNavbar = () => {
  
  return (
      <div className="nav-bar">
    <nav className="navbar navbar-expand-lg navbar-dark" >
      <Link className="navbar-brand" to="#">
       <h2>Online eHR</h2>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end "
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link style={{fontSize:'20px',fontWeight:'bolder'}} className="nav-link btn-danger rounded text-white" to="/">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </div>
  );
};

export default PatientsNavbar;
