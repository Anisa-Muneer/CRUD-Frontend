import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'
import { UserLogin } from '../../Api/UserApi'
import { setUserDetails } from '../../Redux/User/UserSlice'
import './Login.css'


function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

    const [value,setValue] = useState({
      email:'',password:''
    })

    const GenerateError = (err)=>{
      toast.error(err,{
        position:'top-center',
        theme:'colored',
        autoClose:2000
      });
    }
    
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const {email,password} = value
        try {
          if(!email){
            console.log('No email');
            GenerateError("Email is required")
          }else if(!password){
            console.log("No password");
            GenerateError('Password is required')
          }else{
            const response = await UserLogin(value)
            console.log(response,"its the response");
            if(response.data.status){
              localStorage.setItem("token",response.data.token)
              dispatch(setUserDetails({
                id:response.data.user._id,
                name:response.data.user.name,
                email:response.data.user.email,
                mobile:response.data.user.mobile,
                image:response.data.user.Image

              }))
              navigate('/')
            }

          }
          
        } catch (error) {
          console.log(error);

        }

    }
  return (
    <div className='login'>

    
    <div className='auth-form-container'>
        <h2>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input type="email"
        
        onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})}
         placeholder='youremail@gmail.com' id='email' name='email' />
        <label for="password">Password</label>
        <input type="password"
        onChange={(e)=>{setValue({...value,[e.target.name]:e.target.value})}}
         placeholder='' id='password' name='password' />
       
        <button>Log In</button>

      </form>
      <ToastContainer/>
      <button className='link-btn' >Don't have an account? Register here.</button>
    </div>
    </div>

  )
}

export default Login
