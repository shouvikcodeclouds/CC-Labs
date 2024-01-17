import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Grid,
  } from '@mui/material';
  import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    id:"",
    firstName:"",
      lastName:"",
      address:"",
      address2:"",
      phoneNumber:"",
      pincode:"",
      email:"",
      password:"",
      confirmPass:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const customerData={
        id: uuidv4(), 
        firstName:formData.firstName,
        lastName:formData.lastName,
        email: formData.email,
        password: formData.password,
        address:formData.address,
        address2:formData.address2,
        phoneNumber:formData.phoneNumber,
        pincode:formData.pincode,

    }
    const header={
        'Content-Type': 'application/json'
    }
    setFormData({
        id:"",
      firstName:"",
      lastName:"",
      address:"",
      address2:"",
      phoneNumber:"",
      pincode:"",
      email:"",
      password:"",
      confirmPass:""
    });
    if((formData.password==formData.confirmPass)){
    await axios.post("http://localhost:8800/customers",customerData,header)
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
    }
    else 
    console.log("not same");

  };

  return (
   <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
       Sign up as a customer
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email ID"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address line 1"
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address line 2(Optional)"
              variant="outlined"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
             
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              pattern="[0-9]{10}"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="pincode"
              variant="outlined"
              name="pincode"
              pattern="[0-9]{6}"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              name="confirmPass"
              type="password"
              value={formData.confirmPass}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
                Already have an account? <Link to="/customerlogin">Login</Link>
          </Grid>
            <Grid item xs={12}  sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary" >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
      
    </Container>
  );
};

export default CustomerSignup;
//confirmPass