import axios from "axios";
import React, { useState } from "react";
import { Fragment,useEffect } from "react";
import { Link,Navigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Doctordashboard = ({ setTitle }) => {

    const[login,setLogin] = useState(true)
    const[name,setName] = useState()


    

    useEffect(() => {
       const token = localStorage.getItem("token")
       const doctor_id = localStorage.getItem("doc_id");
       const header = {
           "Authorization":"Bearer " + token
         }
      axios.get(`http://127.0.0.1:8000/api/doctors/${doctor_id}/me`,{
        headers:header
      }).then(res => {
        setName(res.data.doctor_name)
        console.log(res.data.doctor_name,"doc");
      })
      

    })
    const token = localStorage.getItem("token");

    if(token == null){
      return <Navigate to="/sign-in" />
    }
  return (
      
    <Fragment>
       
      <Navbar />
      <div>
        <div className="header-content" id="header">
          <h1 style={{ fontSize: "5rem" }} className="mt-2">Improving Lives Together</h1>
          <h2 >Taking Healthcare Innovation into High Gear</h2>

          <h1 style={{ paddingTop: "50px" }}>Welcome  {name}</h1>
          <div style={{ marginTop: "20px",marginBottom: "20px" }}>
            <Link to="/addpatient">
              <button class="btn btn-danger btn-outline-light btn-lg mr-5">Add Patient</button>
            </Link>
            <Link to="/patientlist" >
              <button class="btn btn-danger btn-outline-light btn-lg ml-5 mr-5">
                Patients List
              </button>
            </Link>
            <Link to="/me" >
              <button class="btn btn-danger btn-outline-light btn-lg ml-5">
                My Details
              </button>
            </Link>
          </div>
        </div>

        <div class="box2">
          <div class="part-container">
            <div class="participation" id="zen-participation" role="article">
              <h2>Get Started</h2>
              <p>
              For the past century, health care measurement and delivery have been centered in hospitals and clinics. That is beginning to change as health measures and increasingly care delivery are migrating to homes and mobile devices. The COVID-19 pandemic has only accelerated this transition. While increasing access to care and improving convenience, this move toward platforms operated by for-profit firms raises concerns about privacy, equity, and duty that will have to be addressed. In addition, this change in measuring health and delivering health care will create opportunities for educators to expand the settings for training, researchers to conduct studies at enormous scale, payors to embrace lower-cost clinical settings, and patients to make their voices heard.
              </p>
            </div>
            <div class="part-image-container">
              <img
                src="https://cdn0.iconfinder.com/data/icons/shopping-mall-2/300/20-06-05-Shopping-mall-icons-svg-20-512.png"
                alt="part-image"
                class="part-image"
              />
            </div>
          </div>
          {/* <div class='hr'><hr></div> */}
          <div class="beni-container">
            <div class="benefits" id="zen-benefits" role="article">
              <h2>Benefits</h2>
              <p>
              These developments are part of a broader migration of care from hospitals and clinics to home and mobile devices. Everything from acute stroke care (mobile stroke units) to hospitalizations for pneumonia (hospital at home) are moving toward the home. This transition mirrors what has already occurred in other industries, such as entertainment, banking, and retail. Underlying these transitions are mobile devices, which are amazingly young. The smartphone, first released in 2007, is still a teenager.
              </p>
            </div>
            <div class="beni-image-container">
              <img
                src="https://i.pinimg.com/236x/d0/43/74/d0437437130a3d48e00862360171b6c7.jpg"
                alt="part-image"
                class="beni-image"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Doctordashboard;
