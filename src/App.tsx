import React, {useState, useEffect} from 'react';
import './App.scss';
import {NavLink, Routes, Route} from "react-router-dom";
import UserService from './utilites/user-service'
import { createStore } from 'redux';
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Profile from './pages/Profile/profile';
import { useSelector } from 'react-redux';
import {AuthRequire} from './hoc/AuthRequire';
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //   <nav>
    //       {/* <NavLink to={"/"}>Home</NavLink> */}
    //       {/* <NavLink to={"/login"}>Login</NavLink> */}
    //       {/* <NavLink to={"/register"}>Register</NavLink> */}
    //   </nav>
    //   </header>
    // </div>
    <Routes>
      <Route path={"/"} element={<Login/>} />
      <Route path={"/profile"} element={
        <AuthRequire>
          <Profile/>
        </AuthRequire>} />
      {/* <Route path={"login"} element={<Login/>}></Route> */}
      <Route path={"register"} element={<Register/>} />
    </Routes>
  )
}
export default App;
