import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink,Routes } from "react-router-dom";
import { useState } from 'react';
// import './App.css';
import Footer from './component/Footer';
import Home from './component/Home';
import Navbar from './component/Navbar';
import SignUpForm from "./component/SignUpForm";
import SignInForm from "./component/SignInForm";
import PatientLogin from "./component/Patientlogin";
import Doctor from "./component/AddPatient";
import Modals from "./component/Modals";
import PatientDashboard2 from "./component/PatientDashboard2";
import Me2 from "./component/Me2";

import Doctordashboard from "./component/Doctor-Dashboard";
import ViewPatient from "./component/ViewPatients";
import PatientDashboard from './component/PatientDashboard'
import ProblemDetails from "./component/patient/ProblemDetails";
import Prescriptions from "./component/patient/Prescriptions";
import EditDetails from "./component/EditDetails"
// import Home from "./component/Home"

// function App() {
//   const [title, setTitle] = useState("Healthcare")
//   return (
//     <Router>
//     <div className="app">
//       <Navbar title={title} />
//       <Home setTitle={setTitle} />
//       <Footer />
//     </div>
//     <div>
//       <Switch>
//         <Route path="/sign-up">

//         </Route>
//       </Switch>
//     </div>
    

//     </Router>
//   );
// }
class App extends Component {
  render() {
    return (
      <Router >
        <div className="">
          
            
            
            <Routes>
              <Route path="/" element={<Home />} ></Route>
              {/* <div className="App"> */}
              <Route path="/sign-up" element={<SignUpForm />} ></Route>
              <Route path="/sign-in" element={<SignInForm />} />
              <Route path="/addpatient" element={<Doctor />} />
              <Route path="/modals" element={<Modals />} />

        
            <Route  path="/docdash" element={<Doctordashboard />} ></Route>
            <Route  path="/patientlist" element={<ViewPatient />} ></Route>

            <Route path="/patient-login" element={<PatientLogin />} />
              <Route path="/patient-dashboard/:id" element={<PatientDashboard />} />

              <Route path="/problem-details" element={<ProblemDetails />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route  path="/me" element={<Me2/>} ></Route>
              <Route  path="/viewdetails" element={<PatientDashboard2 />} ></Route>
              <Route  path="/editdetails" element={<EditDetails />} ></Route>



              {/* </div> */}
              
            </Routes>
          </div>
        
      </Router>
    );
  }
}

export default App;


