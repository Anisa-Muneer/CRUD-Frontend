import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Login from '../Pages/Admin/Login'
import Home from '../Pages/Admin/Home'
import AddUser from '../Pages/Admin/AddUser'
import EditUser from '../Pages/Admin/EditUser'
import AdminPublic from './AdminPublic'
import AdminProtect from './AdminProtect'

function AdminRoutes() {
  return (
    <div>
        <Routes>
            <Route exact path='/login' element={<AdminPublic> <Login/> </AdminPublic>} />
            <Route exact path='/' element={<AdminProtect><Home/> </AdminProtect> } />
            <Route exact path='/addUser' element={<AdminProtect> <AddUser/></AdminProtect> } />
            <Route exact path='/edituser/:id' element={<AdminProtect> <EditUser/></AdminProtect> } />
        </Routes>
      
    </div>
  )
}

export default AdminRoutes
