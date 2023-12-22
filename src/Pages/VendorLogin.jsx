import React,{useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const defaultTheme =createTheme();
const VendorLogin = ({ onLogin }) => {
    const [login,setLogin]=useState({
        email:"",
        password:""
      })
      const navigate=useNavigate()
      function handleChange(e){
       
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
          const id=isAuthenticated.id;
          console.log(isAuthenticated);
          if(isAuthenticated){
            onLogin(isAuthenticated);
          }
          navigate(`vendordashboard/${id}`)
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
            <Grid container>
              <Grid item>
              {/* <Link to="/signup">
              {"Don't have an account? Sign Up"}
              </Link> */}
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
                </Grid>
                </Grid>
              </Box>
            </Box>
          
          </Container>
        </ThemeProvider>
        </>
    
  )
}

export default VendorLogin;

