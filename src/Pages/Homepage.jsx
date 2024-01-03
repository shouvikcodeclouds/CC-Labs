
// import React,{useState} from 'react'
// import { Box, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import Footer from '../Components/Footer';
// import Switch from '../Components/Switch';
// const Homepage = () => {
//     const [userType, setUserType] = useState('');

//   const handleUserTypeSelection = (selectedType) => {
//     setUserType(selectedType);
//   };
//  const navigate=useNavigate();

//   return (
//     <>
//      <Box>
      
//      <Typography variant="subtitle1" gutterBottom>
//        Welcome to Multilevel app. Multilevel app is the perfect platform for vendors to showcase and sell their services. Whether you're a skilled professional or an expert in your field, our platform provides you with the tools to reach a wider audience and grow your business.
//       </Typography>
//       </Box> 
//       <div className="user-type-selection">
//       <h2>Choose User Type</h2>
//       <div className="radio-container">
//         <label className={`user-type-label ${userType === 'admin' ? 'selected' : ''}`}>
//           <input
//             type="radio"
//             name="userType"
//             value="admin"
//             onChange={() => handleUserTypeSelection('admin')}
//           />
//           Admin
//         </label>

//         <label className={`user-type-label ${userType === 'vendor' ? 'selected' : ''}`}>
//           <input
//             type="radio"
//             name="userType"
//             value="vendor"
//             onChange={() => handleUserTypeSelection('vendor')}
//           />
//           Vendor
//         </label>
//       </div>

     
//     </div>
//        <div>
//        <div>
//         {userType && (
//         <div className="login-signup-options">
//           <h3>{`Login ${userType==='vendor'?'/Signup':""} as ${userType}`}</h3>
//           <button className='login-button' onClick={()=>{
//             userType === 'admin'?navigate('/admin'):navigate('/vendor')
//           }}>Login</button>
//           {userType === 'vendor' && (
//             <button className='login-button' onClick={()=>navigate('/signup')}>Signup</button>
//           )}
//         </div>
//       )}
//         </div>
//         </div> 
//             <Footer/>
//     </>
//   )
// }

// export default Homepage;


import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Switch from '../Components/Switch';

const Homepage = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleUserTypeSelection = (selectedType) => {
    setUserType(selectedType);
  };

  return (
    <>
      <Box p={3} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Welcome to the Multilevel App
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Multilevel app is the perfect platform for vendors to showcase and sell their services. Whether you're a skilled professional or an expert in your field, our platform provides you with the tools to reach a wider audience and grow your business.
        </Typography>
      </Box>

      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Grid item>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Choose User Type
            </Typography>
            <div className="radio-container">
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: 2 }}
                onClick={() => handleUserTypeSelection('admin')}
                disabled={userType === 'admin'}
              >
                Admin
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUserTypeSelection('vendor')}
                disabled={userType === 'vendor'}
              >
                Vendor
              </Button>
            </div>
          </Paper>
        </Grid>

        {userType && (
          <Grid item>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                {`Login ${userType === 'vendor' ? '/Signup' : ''} as ${userType}`}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  userType === 'admin' ? navigate('/admin') : navigate('/vendor');
                }}
              >
                Login
              </Button>
              {userType === 'vendor' && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/signup')}
                >
                  Signup
                </Button>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>

      <Footer />
    </>
  );
};

export default Homepage;
