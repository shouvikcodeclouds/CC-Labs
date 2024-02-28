import React, { useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';



const VendorSignup = () => {
    const [formData,setFormData]=useState({name:"",email:"",password:"",confpassword:"",id:"",isActive:false,category:"",description:"",price:""})
    const [emailerr,setEmailErr]=useState(false);
    const [err,setErr]=useState(false);
    const [open,setopen]=useState(false);
    const emailRef=useRef(null);
    const navigate=useNavigate()

const handleChange=(e)=>{
setFormData({...formData,
    [e.target.name]:e.target.value
})
// console.log(formData);
}
const handleBlur=(e)=>{
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(String(formData.email).toLowerCase())&&formData.email.length>0){
    
    
    setEmailErr(true);
} else {
    
    setEmailErr(false);
}
}

const handleSubmit =  e => {
  console.log(formData.password+" "+formData.confpassword)
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
      description:formData.description,
      price:formData.price
    };
    if(!emailerr&&(formData.password==formData.confpassword)){
      setopen(true);
      axios.post('http://localhost:8800/vendors', newVendorData, header)
      .then(res => console.log(res))
      setTimeout(() => {
        navigate("/vendor")
      }, 1900);
     
    }
    else{
      setErr(true);
    }
   
}
  return (
    <>
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
                ref={emailRef}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              {emailerr&& <p className="form-err inactive">Please enter a valid email id</p>  }
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confpassword"
                  label="Confirm Password"
                  type="password"
                  id="confpassword"
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
            <Grid container>
              <Grid item>
                Already have an account?
              { <Link to="/vendor">
               Sign in
              </Link> }
              </Grid>
            </Grid>
            {err&&<p className='inactive form-error'>Please enter correct information to proceed</p>}
          </Box>
        </Box>
   
      </Container>
      <Snackbar
       open={open}
       onClose={()=>setopen(false)}
       autoHideDuration={2000}
       message="Your Account has been successfully created"
    >
 <Alert onClose={()=>setopen(false)}  severity="success" sx={{ width: '100%'  }}>
  Your Account has been successfully created
  </Alert>
 </Snackbar>
    </>
  )
}

export default VendorSignup;