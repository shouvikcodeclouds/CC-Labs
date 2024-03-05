
import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './Components/Header';
import AdminDashboard from './Pages/AdminDashboard';
import AdminLogin from './Pages/AdminLogin';
import Homepage from './Pages/Homepage';
import VendorLogin from './Pages/VendorLogin';
import VendorSignup from './Pages/VendorSignup';
import VendorDashboard from './Pages/VendorDashboard';
import VendorTracker from './Pages/VendorTracker';




function App() {

  return (
    <>
   <BrowserRouter>  
   <Header/>
   <Routes>
    <Route path="/" exact element={<Homepage />} />
    <Route
      path="/admin"
      element={
        <AdminLogin/>
      }
    />
    <Route
      path="/vendor"
      element={
        <VendorLogin/>
      }
    />
    <Route path="/signup" element={<VendorSignup />} />

    <Route path="/admindashboard"  element={<AdminDashboard />} />
    <Route path="/vendortracker/:id"  element={<VendorTracker />} />
   

    <Route path="/vendordashboard/:id" element={<VendorDashboard/>} />
    {/* <Route path="/customer" element={<CustomerSignup/>} />
    <Route path="/customerlogin" element={<CustomerLogin/>} />
     */}
  </Routes>
</BrowserRouter>
    </>
  );
}
export default App;


 