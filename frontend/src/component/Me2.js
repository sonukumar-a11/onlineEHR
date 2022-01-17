import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './Navbar';

export default class me2 extends Component {
  constructor() {
    super();

    this.state = {
        username:"",
        firstname:"",
        lastname:"",
        speciality:"",
        email:"",
        gender:""
    };
    const token = localStorage.getItem("token");
   if(token == null){
     window.alert("Please log in !")
     window.location.href = "/"
   }
}

async componentDidMount() {
  
   let doctor_id=localStorage.getItem('doc_id')
   let token=localStorage.getItem('token')
   const header = {
    "Authorization":"Bearer " + token
  }
  
   const res1 =  await axios.get(`http://127.0.0.1:8000/api/doctors/${doctor_id}/me`,{
    headers:header
})
 const post = res1.data
   this.setState({
       username:post.doctor_name,
       firstname:post.first_name,
       lastname:post.last_name,
       speciality:post.speciality,
       gender:post.gender,
       email:post.doctor_email

     
  })

} 
      
    render() {
        return (
            <div>
                <Navbar />
                <div className='d-flex flex-column  align-items-center justify-content-center' style={{height:"100vh", backgroundImage:"url(" + "https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" + ")",backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
            <div className="card text-center" >
  <div className="card-header">
    My Details
  </div>
  <div className="card-body">
  <h5 className="mb-4">Name: {this.state.username}</h5>
  <h5 className="mb-4">Speciality: {this.state.speciality}</h5>
  <h5 className="mb-4">Email: {this.state.email}</h5>
  <h5 className="mb-4">Gender: {this.state.gender}</h5>
  </div>
</div>
</div>
</div>
            
        )
    }
}