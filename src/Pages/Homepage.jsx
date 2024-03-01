
import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
 

const Homepage = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleUserTypeSelection = (selectedType) => {
    setUserType(selectedType);
  };

  return (
    <div className='homepage'>
    <div className='wavy-background'>
      <Box p={3} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Welcome to the Marketplace App
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Marketplace app is the perfect platform for vendors to showcase and sell their services. Whether you're a skilled professional or an expert in your field, our platform provides you with the tools to reach a wider audience and grow your business.
        </Typography>
      </Box>

      <Grid container justifyContent="center" alignItems="center" spacing={3} sx={{zIndex:999,position:'relative'}}>
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
          <Grid item sx={{zIndex:999}}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                {`Login ${userType === 'vendor' ? '/Signup' : ''} as ${userType}`}
              </Typography>
              <Button
               sx={{marginRight:'4px'}}
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
                sx={{marginLeft:'4px'}}
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
      

      </div>
      <svg  viewBox="0 0 500 200">
      <path d="M 0 30 C 150 100 280 0 500 20 L 500 0 L 0 0" fill="rgb(47, 117, 203)"></path>
      </svg>
     
    </div>
  );
};

export default Homepage;
