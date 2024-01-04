
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Typography, Button } from '@mui/material';
import Switch from '../Components/Switch';
import Loader from '../Components/Loader';

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
    
      <Box
  sx={{
    padding: '2rem',
    maxWidth: '800px',
    margin: 'auto',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    background: '#ffffff',
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
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Loader />
        </Box>
        )}
    </>
  );
};

export default VendorTracker;
