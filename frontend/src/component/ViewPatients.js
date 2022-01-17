import React, { Component } from "react";
import "./View.css";
import { useState } from "react";
import {NavLink, Link, Router ,Route,Navigate} from "react-router-dom";
import axios from 'axios';
import Navbar from "./Navbar";
class ViewPatient extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
        posts:[],
        originalPosts:[],
        search:"",
        DataisLoaded: false,
        id:[],
        redirect:false,
        pat_id:""
        
    };
    
    this.handle = this.handle.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleEdit = this.handleEdit.bind(this)



    const token = localStorage.getItem('token')

    if(token == null){
      window.location.href = "/"
    }
    

     
}
  async componentDidMount() {
    let doctor_id=localStorage.getItem('doc_id')
    let token=localStorage.getItem('token')
    const header = {
        "Authorization":"Bearer " + token
      }
    
  const res1 =  await axios.get(`http://127.0.0.1:8000/api/doctors/${doctor_id}/getpatients`,{
        headers:header
    }).catch((err) => {
      window.alert("Something goes wrong ! Please go to home page")
    })
    const posts = res1.data;
      console.log(posts);
      // posts.forEach(element => {
        this.setState({
            posts:posts,
            originalPosts:posts
               
            }) 
     

          // }) 
         
        
  
  } 

  handle(e) {
   this.setState({
       search:e.target.value
   })
    
    //  const filteredPatients = this.state.posts.filter((post) => post.name.toLowerCase().includes(e.target.value.toLowerCase()));
    this.setState({
        posts:this.state.originalPosts.filter((post) => post.name.toLowerCase().includes(e.target.value.toLowerCase()))
    })
  }
 async handleSearch(post){

    let doctor_id=localStorage.getItem('doc_id')
    let token=localStorage.getItem('token')
    const header = {
        "Authorization":"Bearer " + token
      }
     const res2 = await axios.get(`http://127.0.0.1:8000/api/doctors/${doctor_id}/search/${post}`,{
        headers:header
    })
      console.log(res2.data[0].id)
      this.setState({
        pat_id:res2.data[0].id
      })
      localStorage.setItem("pat_id",res2.data[0].id)
           
    this.setState({
      redirect:true
    })
    
      // posts.forEach(element => {
      //   this.setState({
      //       posts:[...this.state.posts,element.name],
               
      //       }) 
     

          // }) 

        }
       async handleClick(post){
         
           
            localStorage.setItem("pat_id",post)
                 
       
            window.location.href = "/viewdetails"
          
        }

        handleEdit(post){

          localStorage.setItem("pat_id",post)
                 
       
          window.location.href = "/editdetails"

        }





  
    render() {
      if(this.state.redirect){
        return <Navigate to="/modals" />
      }
    
  
  
      
        return (
          <div>
            <Navbar />
              
<div class="cont mt-5">
<div class="cont d-flex justify-content-center">
<section class="projects no-padding-top">
<div class="cont">
<form class="example p-4"   >
  <input type="text" placeholder="Search.." onChange={this.handle}></input>
  <button type="submit" >Search</button>
</form>
{this.state.posts.map ((post,index) =>   
  <div class="project" key={index}>
    <div class="row bg-white has-shadow">
      <div class="left-col col-lg-9 d-flex align-items-center justify-content-between">
        <div class="project-title d-flex align-items-center">
          
          <div class="image has-shadow"><img src={"https://www.w3schools.com/howto/img_avatar.png"} alt="..." class="img-fluid"></img></div>
          <div key={index} class="text"><h3 class="h4">{post.name.toUpperCase()}</h3><small>name</small>
          </div>
        </div>
        <div class="project-date">
          <span class="hidden-sm-down"></span>
          
          </div>
        
      </div>
      <div class="right-col col-lg-3 d-flex align-items-center">
        <div class="">
        <i style={{cursor:'pointer'}} onClick={() => this.handleSearch(post.name)} className=" mr-3 fa fa-plus ">
            </i>
        </div>
        <div class="">
        <i style={{cursor:'pointer'}} onClick={() => this.handleClick(post.id)} className=" mr-3 fas fa-arrow-right">
            </i>
        </div>
        <div class="">
        <i style={{cursor:'pointer'}} onClick={() => this.handleEdit(post.id)} className=" fas fa-user-edit mr-2">
            </i>
        </div>

       
        
      </div>
    </div>
  </div>
 )}  
  
  {/* </div> */}
</div>
</section>
</div>
</div>
</div>
  );
}
	}

export default ViewPatient;