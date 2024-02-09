import React, { useEffect, useState } from 'react'
import './Style.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LogoutDetails } from '../../Redux/User/UserSlice'
import { GetUsers } from '../../Api/AdminApi'
import { DeleteUser } from '../../Api/AdminApi'

function Home() {
    const navigate= useNavigate()
    const dispatch = useDispatch()
    const [users,setUsers] = useState([])
    const [searchInput,setSearchInput] = useState('')


    useEffect(()=>{
        GetUsers().then(response=>{
            const allUsers = response.data.data
            setUsers(allUsers)
        }).catch(error=>{
            console.error(error,"Error receiving users data");
        })

    },[])

    const handleSearchInputChange = (e)=>{
        setSearchInput(e.target.value)
    }

    const filteredUsers = users.filter(user=>
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase())
    )
    console.log(filteredUsers);


    const handleDelete = async(userid)=>{
        DeleteUser(userid).then(()=>{
            setUsers(users.filter(user=>user._id != userid))
            console.log("Deleted successfully");

        }).catch(error=>console.error(error))
    }

    

    const handleLogout =()=>{
        localStorage.removeItem('admintoken')
        dispatch(LogoutDetails({
            id:'',
            name:'',
            email:'',
            mobile:'',
            Image:''
        }))
        navigate('/admin/login')
    }
  return (
    <div>
        <nav>
        <div className="logo-and-admin">
            <a href='index.html'>
            <svg id="logo-15" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z" class="ccustom" fill="#17CF97"></path> <path d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z" class="ccustom" fill="#17CF97"></path> <path d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z" class="ccustom" fill="#17CF97"></path> <path d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z" class="ccustom" fill="#17CF97"></path> </svg>
            </a>
            <ul id='navbar'>
                <li><a  href='index.html'>Admin</a> </li>
                
            </ul>



            </div> 
       

        <div>
            <ul id='navbar'>
                <li><a className='active' href='index.html'>Home</a> </li>
                <li><a  onClick={handleLogout} >Logout</a> </li>
               
            </ul>
        </div>
        </nav>

<div className='container'>


        <div className='outer-box'>
            <div className='inner-box'>
                <button onClick={()=>navigate('/admin/addUser')}>Add User</button>

                <input className='inp-fld' type='text'
                placeholder='Search'
                onChange={handleSearchInputChange}
                value={searchInput}
                aria-label='Search'/>

            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                {filteredUsers.map((user,i) => (
                    <tr key={user._id}>
                        
                        <td>{i+1} </td>
                        <td>{user._id} </td>
                        <td>{user.name} </td>
                        <td>{user.email}</td>
                        <td >{user.mobile} </td>
                        <td ><a class="btn btn-success" href="" onClick={() => navigate(`/admin/edituser/${user._id}`)} >Edit</a></td>
                        <td ><a class="btn btn-success" href="" onClick={()=>handleDelete(user._id)}>Delete</a></td>
                        
                    </tr>
                     ))}
                </tbody>
            </table>
        </div>
        </div>



     </div>

    
  )
}

export default Home
