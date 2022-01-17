import { Navigate } from "react-router-dom";
import {useEffect } from "react";


const logout = () => {
  localStorage.clear();
  window.location.href = "/sign-in"

}
const Navbar = ({title}) => {

  // useEffect(() => {

  //   const token = localStorage.getItem("token");

  //   if(token == null){
  //     return <Navigate to="/sign-in" />
  //   }

  // })
 
  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <a className="navbar-brand text-white" href="/docdash">
          <h2>Online eHR</h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
          
            <li  className="nav-item ">
              <button style={{fontSize:'20px'}} onClick={logout} className="nav-link btn-danger text-white rounded font-weight-bold">
                Logout
              </button>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                Sign Up
              </a>
            </li> */}
           
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
