import React, { Component,useState } from "react";
import { NavLink, Link, Redirect,Router,withRouter,Navigate } from "react-router-dom";
import "../App.css"
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
  FacebookLoginButton,
  InstagramLoginButton
} from "react-social-login-buttons";

const PatientLogin = () => {
   
  const [id, setId] = useState("")

  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp1 = await axios.get(`api/patient/${id}/me`);
      if(resp1.data.name){
        console.log(resp1.data.id)
        setSuccess(true)
        // return <Navigate to="/doctor" />
      }else{
        console.log(id)
        toast("Patient Not Found")
      }
    } catch (error) {
      console.log(error)
      toast("Invalid Id")
    }
  } 
  if(success){
    return <Navigate to={`/patient-dashboard/${id}`} />
  }

    return (
      <div className="App">
        <ToastContainer />
        <div className="appAside" />
          <div className="appForm">
          <div className="formCenter pageSwitcher">
          <NavLink
                to="/"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem btn-success"
              >
                Home
              </NavLink>
          </div>
      
      <div className="formCenter">
        <form className="formFields" onSubmit={handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" >
              Patient Id
            </label>
            <input
              type="text"
              id="patient_id"
              className="formFieldInput"
              placeholder="Enter Patient Id"
              name="patient_id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          

          <div className="formField">
            <button className="formFieldButton">Sign In</button>{" "}
            <Link to="/" className="formFieldLink">
              
            </Link>
          </div>

        </form>
        
      </div>
      </div>
      </div>
    );
  }

export default PatientLogin;
