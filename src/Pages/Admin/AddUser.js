import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../Api/AdminApi'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function AddUser() {
    const[value,setValue] = useState({
        name:"",
        email:"",
        mobile:"",
        password:""
    })
    const GenerateError = (err) => {
      toast.error(err, {
        position: 'top-center',
        theme: 'colored',
        autoClose: 2000
      });
    };
    const navigate = useNavigate()
    const {name,email,mobile,password} = value

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!name){
            GenerateError("name is required")
        }else if (!email) {
          GenerateError("Email is required")
          }else if(!mobile){
            GenerateError("Mobile is required")
          }
           else if (!password) {
            GenerateError("password is required")
          } else {
            const response = await addUser(value)
            GenerateError(response.data.alert)
            if(response.data.status){
                navigate('/admin/')
            }
          }
    }
  return (
    <div className='login'>

   
    <div className='auth-form-container'>
      <h2>Add User Details</h2>
      <form className='register-form' onSubmit={handleSubmit} >
      <label for="name">Full Name</label>
      <input type="text"
      onChange={(e)=>{setValue({...value,[e.target.name]:e.target.value})}}
       id='name' placeholder='Enter Name' name='name' />

      <label>Phone Number</label>
       <input type='number'
       onChange={(e)=>{setValue({...value,[e.target.name]:e.target.value})}}
       id='mobile' placeholder='Enter Phone Number' name='mobile'/>

       <label for="email">Email</label>
        <input type="email"
        onChange={(e)=>{setValue({...value,[e.target.name]:e.target.value})}}
         placeholder='youremail@gmail.com' id='email' name='email' />

      <label for="password">Password</label>
        <input type="password"
        onChange={(e)=>{setValue({...value,[e.target.name]:e.target.value})}}
         placeholder='' id='password' name='password' />
        <button type='submit'>Sign Up</button>

        </form>
        <button  className='link-btn' >Already have an account? Login here.</button>
    </div>
    </div>
  )
}

export default AddUser
