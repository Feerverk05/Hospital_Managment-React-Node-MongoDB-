import React from "react";
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path = '/' element={<Home/>}/>
          <Route path = '/appointment' element={<Appointment/>}/>
          <Route path = '/login' element={<Login/>}/>
          <Route path = '/register' element={<Register/>}/>
          <Route path = '/aboutus' element={<AboutUs/>}/>
        </Routes> 
        <ToastContainer position="top-center"/>
      </Router>
    </>
  )
}

export default App