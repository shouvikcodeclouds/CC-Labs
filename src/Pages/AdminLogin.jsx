import React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { admin } from '../_mock/admin';
import { useNavigate } from 'react-router-dom';

const AdminLogin=()=> {
const [login,setLogin]=useState({email:"",password:""});
const [error,setError]=useState(false);
const navigate=useNavigate();

function handleChange(e){
setLogin({...login,
    [e.target.name]:e.target.value

})
}
  const handleLogin =  e => {
    e.preventDefault();   
    console.log("submit")
    if(admin.email===login.email&&admin.password===login.password){
        console.log("success")
        localStorage.setItem("admin",true)
        setTimeout(() => {
          navigate('/admindashboard')
        }, 1000);         
}
else{
  console.log("error");
    setError(true)
}
  }
  return (
    <>
      <div className='admin-login-container'>
     
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >      
          <Typography component="h1" variant="h5">
             Login as admin
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}          
            >
              Sign In
            </Button>
           {error&& < p className='inactive'>Please Enter correct credentials and try again</p>}
            <Grid container>
              <Grid item xs>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </div>
   
    </>
  );
}
export default AdminLogin;