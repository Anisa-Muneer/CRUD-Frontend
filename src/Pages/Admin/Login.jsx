import React, { useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { AdminLogin } from '../../Api/AdminApi'


function Login() {
    const navigate = useNavigate()
    const [value,setValue] = useState({
        email:'',
        password:''
    })

    const GenerateError = (err)=>{
        toast.error(err,{
            position:'top-center',
            theme:'colored',
            autoClose:3000
        })
    }

    const handleSubmit= async(e)=>{
        e.preventDefault()
        const {email,password} = value
        if(!email){
            GenerateError("Email is required")
            console.log("Email needed");
            
        }else if(!password){
            GenerateError("Password is required")
            console.log("Password needed");
        }else{
            const response = await AdminLogin(value)
            console.log(response,"admin response");
            if(response.data.status){
                localStorage.setItem('admintoken',response.data.token)
                navigate('/admin/')
            }
        }
    }
  return (
    
        <div className='formOuter'>
            <Form className='form col-lg-3' onSubmit={handleSubmit}>
                <h1 className='text-white'> Login </h1>

                <Form.Group className='mb-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' name='email' onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control type='password' placeholder='Password' name='password' onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})}/>
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Submit
                </Button>

            </Form>
            <ToastContainer />

            </div>
      
            
  )
}

export default Login
