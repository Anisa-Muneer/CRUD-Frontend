import { Routes,Route } from "react-router-dom";

import React from 'react'
import Home from "../Pages/User/Home";
import Login from "../Pages/User/Login"
import SignUp from "../Pages/User/SignUp"
import Profile from "../Pages/User/Profile";
import UserProtect from "./UserProtect";
import UserPublic from "./UserPublic";

function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={ <UserPublic><Login/></UserPublic> } />
        <Route exact path="/signup" element={<UserPublic><SignUp/></UserPublic> } />
        <Route exact path="/profile" element={ <UserProtect> <Profile/></UserProtect>} />
      </Routes>
    </div>
  )
}

export default UserRoutes
