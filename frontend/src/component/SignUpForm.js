import axios from "axios";
import React, { Component } from "react";
import { NavLink,Link ,Navigate} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      confirmPassword:"",
      name: "",
      speciality:"",
      gender:"",
      // hasAgreed: false,
      first_name:"",
      last_name:"",
      redirect:false,
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

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.password !== this.state.confirmPassword){
      toast.error("Password fields Not Matching")
      return
    }
    console.log("The form was submitted with the following data:");
    console.log(this.state);
 const post = {
  username:this.state.name,
  email:this.state.email,
 password:this.state.password,
  password2:this.state.confirmPassword,
  speciality:this.state.speciality,
  gender:this.state.gender,
  first_name:this.state.first_name,
  last_name:this.state.last_name

 }
   axios.post("http://127.0.0.1:8000/auth/api/register/",post).then(res => {
     console.log(res)
     this.setState({
       redirect:true
     })
     toast.success("You are successfully registered.Please sign!")
   }).catch(err => {
     console.log(err.response);
     const err_user = err.response.data
     if(err_user.username){
     toast.error(err_user.username[0])

     }
     else if(err_user.non_field_errors){
     toast.error(err_user.non_field_errors[0])


     }
    //  toast.error("Please enter correct details !")

   })

  //  this.setState({
  //   username:"",
  //   email:"",
  //  password:"",
  //   confirmPassword:"",
  //   speciality:"",
  //   gender:"",
  //   first_name:"",
  //   last_name:"",
  //   // redirect:true

  //  })


  }

  render() {

    if(this.state.redirect){
      return <Navigate to="/sign-in" />
    }
    return (
      
      <div className="App">
      <ToastContainer />
        <div className="appAside" />
          <div className="appForm">
          <div className="formCenter">
        <div className="pageSwitcher">
              <Link
                to="/"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem btn-success"
              >
                Home
              </Link>
              <NavLink
                exact
                to="/sign-in"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem  btn-info"
              >
                Sign in
              </NavLink>
            </div>

            <div className="formTitle">
              <h2>Register Yourself</h2>
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
        <form onSubmit={this.handleSubmit} className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="name">
              User Name
            </label>
            <input
              type="text"
              id="name"
              className="formFieldInput"
              placeholder="Enter your full name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="name">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              className="formFieldInput"
              placeholder="Enter your first name"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="name">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              className="formFieldInput"
              placeholder="Enter your last name"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Speciality
            </label>
            <input
              type="text"
              id="speciality"
              className="formFieldInput"
              placeholder="Enter your Speciality"
              name="speciality"
              value={this.state.speciality}
              onChange={this.handleChange}
              required
            />
          </div>
          
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              minlength="8"
              maxlength="100"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
             Confirm Password
            </label>
            <input
              type="password"
              id="password"
              minlength="8"
              maxlength="100"
              className="formFieldInput"
              placeholder="Enter your password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="col-md-3">
        <label htmlFor="validationCustom04" className="form-label">
          Gender
        </label>
        <div className="formField">

        <select className="form-select"
         id="validationCustom04"
         name="gender"
         value={this.state.gender}
         onChange={this.handleChange}
          required>
          <option selected disabled value="">
            Select
          </option>
          <option value="Male">Male</option>

          <option value="Female">Female</option>
          {/* <option value="T">Others</option> */}
        </select>
        </div>
        <div className="invalid-feedback">Please select a valid Gender.</div>
      </div>
{/* 
          <div className="formField">
            <label className="formFieldCheckboxLabel">
              <input
                className="formFieldCheckbox"
                type="checkbox"
                name="hasAgreed"
                value={this.state.hasAgreed}
                onChange={this.handleChange}
              />{" "}
              I agree all statements in{" "}
              <a href="null" className="formFieldTermsLink">
                terms of service
              </a>
            </label>
          </div> */}
         

          <div className="formField">
            <button className="formFieldButton">Sign Up</button>{" "}
            <Link to="/sign-in" className="formFieldLink">
              I'm already member
            </Link>
          </div>
        </form>
      </div>
          </div>
      </div>
      
    );
  }
}
export default SignUpForm;
