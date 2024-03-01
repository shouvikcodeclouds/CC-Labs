
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Typography, Button, IconButton } from '@mui/material';
import Switch from '../Components/Switch';
import Loader from '../Components/Loader';
import { ArrowBack } from '@mui/icons-material';


const VendorTracker = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState();
  const [status, setStatus] = useState(false);
  const [changed, setChanged] = useState(false);
  const [load, setLoad] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    setChanged(false);

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/vendors/${id}`);
        setVendor(response.data);
        setStatus(response.data?.isActive);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:8800/vendors/${id}`).then((res) => {
      setVendor(res.data);
      setStatus(res.data?.isActive);
      setActive(res.data?.isActive ? 'Active' : 'Inactive');
    });
  }, [id]);

  const changeActiveStatus = async () => {
    let activeStatus = { isActive: status };

    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      await axios.patch(`http://localhost:8800/vendors/${id}`, activeStatus, headers);
      const response = await axios.get(`http://localhost:8800/vendors/${id}`);
      setVendor(response.data);
      setLoad(true);

      setTimeout(() => {
        navigate('/admindashboard');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlechange = () => {
    setStatus(!status);
    setChanged(true);
  };

  return (
    <>
     <IconButton
    onClick={() => navigate("/admindashboard")}
    sx={{ position: 'absolute', 
    top: '5rem', 
    left: '1rem', 
    zIndex: 999,
    borderRadius:'50%',
    background:"#cbc3c3",
    
   }}
  >
    <ArrowBack />
  </IconButton>
      <Box
  sx={{
    padding: '2rem',
    height:'100vh',
    margin: 'auto',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    background: '#ffffff',
    display:'block',
    paddingY:'15rem'
  }}
>
  <Grid container spacing={3}>
    <Grid item xs={12} sm={4}>
      <Typography variant="h6" fontWeight="bold" sx={{ color: '#1a237e' }}>
        Vendor Name
      </Typography>
      <Typography variant="body1">{vendor?.name}</Typography>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Typography variant="h6" fontWeight="bold" sx={{ color: '#1a237e' }}>
        Email ID
      </Typography>
      <Typography variant="body1">{vendor?.email}</Typography>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Typography variant="h6" fontWeight="bold" sx={{ color: '#1a237e' }}>
        Status
      </Typography>
      <p
        variant="body1"
        className={active.toLowerCase() === 'active' ? 'active' : 'inactive'}
      >
        {active}
      </p>
    </Grid>
  </Grid>

  <Box sx={{ margin: '2rem 0' }}>
    <Typography variant="h6" sx={{ color: '#1a237e' }}>
      About Vendor
    </Typography>
    <Typography variant="body1">{vendor?.description}</Typography>
  </Box>

  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <Typography variant="h6" align="center" marginBottom="10px" sx={{ color: '#1a237e' }}>
        {`Change active status of ${vendor?.name}`}
      </Typography>
    </Grid>
    <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Switch label="" checked={status} onChange={handlechange} />
    </Grid>
  </Grid>

  {changed && (
    <Box sx={{ textAlign: 'center', margin: '20px' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={changeActiveStatus}
        sx={{
          backgroundColor: '#1dc9d5', // Green color
          '&:hover': {
            backgroundColor: '#45a049', // Darker green color on hover
          },
        }}
      >
        Save Changes
      </Button>
    </Box>
  )}
</Box>;


      {load && (
       
          <Loader />
        
        )}
    </>
  );
};

export default VendorTracker;
