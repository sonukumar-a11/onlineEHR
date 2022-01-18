import React, { Component } from "react";
import {NavLink,Navigate, Link } from "react-router-dom";
import "../App.css"
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      password: "",
      login:false
   
    };

   

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    const token = localStorage.getItem("token")
    if(token){
      window.location.href = "/docdash"
    }
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
    const post = {
      email:this.state.name,
      password:this.state.password
     }
       axios.post("http://127.0.0.1:8000/auth/api/login/",post).then(res => {
         console.log(res.data.token.access)
         console.log(res.data.profile.id)
         localStorage.setItem("token",res.data.token.access);
         localStorage.setItem("doc_id",res.data.profile.id)
         this.setState({
           login:true
         })

         toast.success("Login successful")
       }).catch(err => {
         toast.error("Please enter correct details !")
         console.log(err.response.data);
       })

      
  
   

  }
 

  render() {

    if(this.state.login){
      return <Navigate to="/docdash" />
    }

   
    return (
      
      <div className="App">
        <ToastContainer />
        <div className="appAside" />
          <div className="appForm">
          
      <div className="formCenter">
        <div className="pageSwitcher">
              <NavLink
                to="/"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem btn-success "
              >
                Home
              </NavLink>
              {/* <NavLink
                exact
                to="/sign-up"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign Up
              </NavLink> */}
            </div>

            <div className="formTitle">
              <h2>Log In</h2>
              {/* <NavLink
                to="/sign-in"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/sign-up"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </NavLink> */}
            </div>
        <form className="formFields" onSubmit={this.handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              User email
            </label>
            <input
              type="email"
              id="name"
              className="formFieldInput"
              placeholder="Enter your email address"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <button  onClick={() => this.handleSubmit} className="formFieldButton">Sign In</button>{" "}
            <Link to="/sign-up" className="formFieldLink">
             Not registered ? click here
            </Link>
          </div>

         
        </form>
      </div>
      </div>
      </div>
    );
  }
}

export default SignInForm;
