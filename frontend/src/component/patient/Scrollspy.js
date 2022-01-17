import React from "react";
import "../Dasboard.css";


const Scrollspy = ({num,selected}) => {
    
  return (
    <div className="nav-bar">
      <nav className="navbar bg-dark d-flex justify-content-around">
      {/* <button
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
       <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo03"> */}
        <ul className="nav nav-pills" style={{alignItems:" stretch", justifyContent: "space-between"}}>
          <li className="nav-item" >
            <button style={{borderBottom: selected ===1 ? "2px solid white" : "none"}} className="nav-link scroll" onClick={()=>num(1)}>
              Patient Details
              <span class="sr-only">(current)</span></button>
          </li>
          <li className="nav-item">
            <button style={{borderBottom: selected ===2 ? "2px solid white" : "none"}} className="nav-link scroll" onClick={()=>num(2)}>
              Problem Details<span className="sr-only">(current)</span>
            </button>
          </li>
          <li className="nav-item">
            <button style={{borderBottom: selected ===3 ? "2px solid white" : "none"}} className="nav-link scroll"  onClick={()=>num(3)}>
              Prescriptions
            </button>
          </li>
        </ul>
        {/* </div> */}
        
      </nav>
    </div>
  );
};

export default Scrollspy;
