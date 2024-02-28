import React,{useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';


const VendorLogin = () => {
    const [login,setLogin]=useState({
        email:"",
        password:""
      })
      const [error,setError]=useState(false);
      const navigate=useNavigate()
      function handleChange(e){
       setError(false);
        setLogin({...login,[e.target.name]:e.target.value})
      }
      const handleLogin = async e => {
        e.preventDefault();
        const vendorData= await axios.get('http://localhost:8800/vendors');

         const isAuthenticated = vendorData.data.find(
            vendor =>
              vendor.email === login.email &&
              vendor.password === login.password
          );
          console.log(vendorData.data);
         
          console.log(isAuthenticated);
          if(isAuthenticated){
            const id=isAuthenticated.id;
        localStorage.setItem("vendor",true)
        navigate(`/vendordashboard/${id}`)
          }
         else{
            setError(true);
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
            Vendor Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            {error&& < p className='inactive'>Please Enter correct credentials and try again</p>}
            <Grid container>
              <Grid item>
                Don't have an account?
              { <Link to="/signup">
               Sign Up
              </Link> }
                
                </Grid>
                </Grid>
              </Box>
            </Box>
          
          </Container>
  
        </>
    
  )
}

export default VendorLogin;

