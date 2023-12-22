import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const VendorSignup = () => {
    const [formData,setFormData]=useState({name:"",email:"",password:"",id:"",isActive:false,category:"",description:""})
    const navigate=useNavigate()

const handleChange=(e)=>{
setFormData({...formData,
    [e.target.name]:e.target.value
})
// console.log(formData);
}

const handleSubmit =  e => {
    e.preventDefault();
    const header={
        'Content-Type': 'application/json'
    }
    const newVendorData = {
      id: uuidv4(), 
      name:formData.name,
      email: formData.email,
      password: formData.password,
      isActive:formData.isActive,
      category:formData.category,
      description:formData.description
    };
     axios.post('http://localhost:8800/vendors', newVendorData, header)
    .then(response => console.log(response))
    navigate("/vendor")
   
}
  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
             
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
         
              </Grid>
            </Grid>
          </Box>
        </Box>
   
      </Container>
    </ThemeProvider>

    </>
  )
}

export default VendorSignup