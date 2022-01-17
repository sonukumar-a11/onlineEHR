import React, { Component } from 'react'
import axios from 'axios';
import background from '../background.jpeg'


import Navbar from './Navbar';
import { toast, ToastContainer } from 'react-toastify';
class PatientDetails extends Component {
  constructor() {
    super();
    // this.setState({
    //   doc_id:doc_id
    // })
    this.state = {
      name: "",
      phoneno:"",
      gender:"",
      email:"",
      address:"",
      dob:"",
      height:null,
      weight:null,
      s_date:"",
      bp:"",
      bp2:"80",
      temp:null,
      pulse:null,
      smoking_status:"",
      drinking_status:"",
      login:false,
      show:false,
      doc_id:"",
      err:false
      
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const token = localStorage.getItem("token");
   if(token == null){
     window.alert("Please log in !")
     window.location.href = "/"
   }
  

  }
  async componentDidMount(){
   
    const token = localStorage.getItem("token")
    const pat_id = localStorage.getItem("pat_id")
    const header = {
      "Authorization":"Bearer " + token
    }
    const res2 = await axios.get(`http://127.0.0.1:8000/api/patients/${pat_id}/vitaldetails`,{
      headers:header
    })
    console.log(res2.data)
    this.setState({
      weight:res2.data.weight,
      height:res2.data.height,
      pulse:res2.data.pulse,
      bp:res2.data.blood_pressure,
      s_date:res2.data.date_added,
      temp:res2.data.temperature

    })

  const res3 = await axios.get(`http://127.0.0.1:8000/api/doctors/${pat_id}/socialhistory`,{
    headers:header
  })
  console.log(res3)
  this.setState({
    smoking_status:res3.data.tobacco,
    drinking_status:res3.data.alcohol
  })
  console.log(res3);

  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state)
  }

 async handleSubmit(event) {
    event.preventDefault();
    this.setState({
      checkSubmit:true,
      show:true
    })
    console.log("The form was submitted with the following data:");
    console.log(this.state);
    const doc_id = localStorage.getItem("doc_id");
    const token = localStorage.getItem("token");
    console.log("+91" + this.state.phoneno);
    const header = {
      "Authorization":"Bearer " + token
    }


     const vitail = {
       weight:this.state.weight,
       height:this.state.height,
       blood_pressure:parseFloat(this.state.bp),
       pulse:this.state.pulse,
       date_added:this.state.s_date,
       temperature:this.state.temp
     }

     const social = {
       tobacco:this.state.smoking_status,
       alcohol:this.state.drinking_status
     }


 

    const pat_id = localStorage.getItem("pat_id")
  const res2 = await axios.post(`http://127.0.0.1:8000/api/patients/${pat_id}/vitaldetails`,vitail,{
    headers:header
  })
  console.log(res2);

  const res3 = await axios.post(`http://127.0.0.1:8000/api/doctors/${pat_id}/socialhistory`,social,{
    headers:header

  })
  console.log(res3);
  
  toast.success("Data Updated Successfully")
  setTimeout(() => {
    window.location.reload()
  },1000)
  
    
  }


   
    render() {
        
        return (
          <div>
            <ToastContainer />
            <Navbar />
         <div className="d-flex justify-content-evenly align-items-center" style={{backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>

<form className="row g-3 needs-validation mx-4 my-4" onSubmit={this.handleSubmit} style={{minHeight:"84vh"}} >
  <h1 className="text-center my-3 " style={{fontWeight:"bolder", color:"#040914"}} >Patient Details</h1>
  <div className="row g-3"  >
   
      <div className="col-md-3">
        <label style={{fontSize:"20px",fontWeight:"bolder", color:"#040914"}} htmlFor="validationCustom01" className="form-label">
          Weight (kg)
        </label>
        <input
          type="number"
          name="weight"
          value={this.state.weight}
          onChange={this.handleChange}
          className="form-control"
          id="validationCustom01"
          min={1}
          required
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
      <div className="col-md-3">
        <label style={{fontSize:"20px",fontWeight:"bolder", color:"#040914"}} htmlFor="validationCustom01" className="form-label">
          Height (Cm)
        </label>
        <input
          type="number"
          name='height'
          value={this.state.height}
          onChange={this.handleChange}
          className="form-control"
          min={1}
          id="validationCustom01"
          required
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
      
      <div className="col-md-3">
        <label style={{fontSize:"20px",fontWeight:"bolder", color:"#040914"}} htmlFor="validationCustom01" className="form-label">
          BP(systolic)
        </label>
        <input
          type="number"
          name="bp"
          min={1}
          max={300}
          value={this.state.bp}
          onChange={this.handleChange}
          placeholder='mmHg'
          className="form-control"
          id="validationCustom01"
          required
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
      <div className="col-md-3">
        <label style={{fontSize:"20px",fontWeight:"bolder", color:"#040914"}} htmlFor="validationCustom01" className="form-label">
          BP(diastolic)
        </label>
        <input
          type="number"
          name="bp2"
          value={this.state.bp2}

          min={1}
          max={300}
    
          placeholder='mmHg'
          className="form-control"
          id="validationCu1"
          required
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
      <div className="col-md-3">
        <label  style={{fontSize:"20px",fontWeight:"bolder", color:"#040914"}} htmlFor="validationCustom01" className="form-label">
          Temperature (F)
        </label>
        <input
          type="number"
          name="temp"
          value={this.state.temp}
          onChange={this.handleChange}
          className="form-control"
          id="validationCustom01"
          min={92}
          required
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
      <div className="col-md-3">
        <label style={{fontSize:"20px",fontWeight:"bolder", color:"#040914"}} htmlFor="validationCustom01" className="form-label">
          Pulse
        </label>
        <input
          type="number"
          name="pulse"
          value={this.state.pulse}
          onChange={this.handleChange}
          className="form-control"
          id="validationCustom01"
          placeholder='bpm'
          min={50}
          max={220}
          required
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
      <div className="col-md-3">
        <label style={{fontSize:"20px",fontWeight:"bolder", color:"#040914"}} htmlFor="validationCustom04" className="form-label">
        Smoking Status
        </label>
        <select className="form-select" id="validationCustom04" name='smoking_status'
        value={this.state.smoking_status} onChange={this.handleChange} required>
          <option selected disabled value="">
          Select
          </option>
          <option value="1">Never smoked</option>

          <option value="2">Current Smoker</option>
          <option value="3">Former Smoker</option>
        </select>
        <div className="invalid-feedback">Please select a valid status.</div>
      </div>
      <div className="col-md-3">
        <label style={{fontSize:"20px",fontWeight:"bolder", color:"#040914"}} htmlFor="validationCustom04" className="form-label">
        Drinking Status
        </label>
        <select className="form-select" id="validationCustom04" name='drinking_status'
        value={this.state.drinking_status} onChange={this.handleChange} required>
          <option selected disabled value="">
          Select
          </option>
          <option value="3">Lifetime Non-drinker</option>

          <option value="1">Current Drinker</option>
          <option value="2">Former Drinker</option>
        </select>
        <div className="invalid-feedback">Please select a valid status.</div>
      </div>
  
      </div>
  <div className="col-3 my-4">
        <button className="btn btn-success" style={{fontWeight:"bolder"}} type='submit'>
          Update Patient
        </button>
        </div>
     
   
      </form>


         </div>
         </div>
        )
    }
}

export default PatientDetails;