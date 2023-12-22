
import React,{useState,useEffect} from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import AdminDashboard from './Pages/AdminDashboard';
import AdminLogin from './Pages/AdminLogin';
import Homepage from './Pages/Homepage';
import VendorLogin from './Pages/VendorLogin';
import VendorSignup from './Pages/VendorSignup';
import VendorDashboard from './Pages/VendorDashboard';


function App() {
  const[isAdminLoggedIn,setAdminLoggedIn]=useState(false);
const[isVendorLoggedIn,setIsVendorLoggedIn]=useState(false);
//const navigate=useNavigate()
const handleAdminLogin = (loggedIn) => {
  setAdminLoggedIn(loggedIn);
};

const handleVendorLogin = (loggedIn) => {
  setIsVendorLoggedIn(loggedIn);
};
useEffect(() => {
  isAdminLoggedIn&&setAdminLoggedIn(!isAdminLoggedIn)
  isVendorLoggedIn&& setIsVendorLoggedIn(!isVendorLoggedIn)

}, [])


  return (
    <>
    {/* <Header/>
    <Homepage/>
    <AdminLogin/>
    <VendorSignup/>
    <VendorLogin/>
    <AdminDashboard/>
    <VendorDashboard/>
   <Footer/> */}
   <BrowserRouter>
   <Header logout={()=>{
    setIsVendorLoggedIn(!isVendorLoggedIn)
    setAdminLoggedIn(!isAdminLoggedIn)
    
 }}/>
  <Routes>
  
    <Route path="/" element={<Homepage />} />
    <Route
      path="/admin"
      element={
        isAdminLoggedIn ? (
          <Navigate to="/admindashboard" />
        ) : (
          <AdminLogin onLogin={handleAdminLogin} />
        )
      }
    />
    <Route
      path="/vendor"
      element={<VendorLogin onLogin={handleVendorLogin} />}
    />
    <Route path="/signup" element={<VendorSignup />} />
    <Route path="/admindashboard" element={<AdminDashboard />} />
    <Route path="/vendor/vendordashboard/:id" element={<VendorDashboard/>} />
  </Routes>
  <Footer/>
</BrowserRouter>
    </>
  );
}

export default App;


