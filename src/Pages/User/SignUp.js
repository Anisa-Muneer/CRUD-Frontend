import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { setUserDetails } from '../../Redux/User/UserSlice'
 import { RegUser } from '../../Api/UserApi'
 import './Login.css'

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value,setValue] = useState({
    name:'', mobile:'', email:'', password:''
 })
  
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const {email,password} = value
    try {
      if(!email){
        console.log('Email is required');
      }else if(!password){
        console.log("Password is required");
      }else{
        const response = await RegUser(value)
        if(response.data.status){
          localStorage.setItem("token",response.data.token)
          dispatch(setUserDetails({
            id:response.data.user._id,
            name:response.data.user.name,
            email:response.data.user.email,
            mobile:response.data.user.mobile,
            image:response.data.user.image,
          }))
          navigate('/')
        }
       

      }
    } catch (error) {
      
    }
  }

  return (
    <div className='login'>

   
    <div className='auth-form-container'>
      <h2>Register</h2>
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

export default SignUp
