import React,{ useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UpdateUser ,EditUserData} from '../../Api/AdminApi'

function EditUser() {
    const [value,setValue] = useState({
        name:'',
        email:'',
        mobile:''
    })
    const navigate=useNavigate()
    const{id} = useParams()
    const GenerateError=(err)=>{
        toast.error(err,{
            position:'top-center',
            theme:'colored',
            autoClose:2000
        })
    }

    useEffect(()=>{
        const userData = async()=>{
            try {
                const response = await EditUserData(id)
                console.log(response,"jjjjjjjjjjjj");
                setValue({
                    name:response.data.userData.name,
                    email:response.data.userData.email,
                    mobile:response.data.userData.mobile
                })
            } catch (error) {
                
            }
        }
        userData()
       },[id])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            if(!value.name){
                console.log("Name is required");
                GenerateError("Name is required")
            }else if(!value.email){
                console.log("Email is required");
                GenerateError("Email is required")
            }else if(!value.mobile){
                console.log("Number is required");
                GenerateError("Number is required")
            }else{
                const response = await UpdateUser(id,value)
                if(response.data.status){
                    toast.success(response.data.alert)
                    navigate('/admin/')
                }else{
                    toast.error(response.data.alert)                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div className='login'>

   
    <div className='auth-form-container'>
      <h2>Edit User Details</h2>
      <form className='register-form' onSubmit={handleSubmit} >
      <label for="name">Full Name</label>
      <input type="text" value={value.name}
      onChange={(e)=>{setValue({...value,[e.target.name]:e.target.value})}}
       id='name'  name='name' />

      <label>Phone Number</label>
       <input type='number' value={value.mobile}
       onChange={(e)=>{setValue({...value,[e.target.name]:e.target.value})}}
       id='mobile'  name='mobile'/>

       <label for="email">Email</label>
        <input type="email" value={value.email}
        onChange={(e)=>{setValue({...value,[e.target.name]:e.target.value})}}
          id='email' name='email' />

      {/* <label for="password">Password</label>
        <input type="password"
        onChange={(e)=>{setValue({...value,[e.target.name]:e.target.value})}}
         placeholder='' id='password' name='password' /> */}
        <button type='submit'>Sign Up</button>

        </form>
        <button  className='link-btn' >Already have an account? Login here.</button>
    </div>
    </div>
  )
}

export default EditUser
