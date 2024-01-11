
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Grid,
  Paper,
  Typography,
  IconButton,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

    const VendorDashboard = () => {
      const { id } = useParams();
      const [vendorInfo, setVendorInfo] = useState({});
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [category, setCategory] = useState('');
      const [categoryOption, setCategoryOption] = useState([]);
      const [description, setDescription] = useState('');
      const [price, setPrice] = useState('');
      const [editName, setEditName] = useState(false);
      const [editEmail, setEditEmail] = useState(false);
      const [editDescription, setEditDescription] = useState(false);
      const [editPrice, setEditPrice] = useState(false);
      const [editServiceProvided, setEditServiceProvided] = useState(false);
      const [open, setopen] = useState(false);
    
      useEffect(() => {
        id&&axios.get(`http://localhost:8800/vendors/${id}`)
        .then((res) => setVendorInfo(res.data));
        setName(vendorInfo?.name);
        setEmail(vendorInfo?.email);
        setDescription(vendorInfo?.description);
        setPrice(vendorInfo?.price);
        setCategory(vendorInfo?.category);
      }, []);
      useEffect(() => {
        id&&axios.get(`http://localhost:8800/vendors/${id}`)
        .then((res) => setVendorInfo(res.data));

      }, [id,vendorInfo]);
    
      useEffect(() => {
        axios.get(`http://localhost:8800/categories`).then((res) => setCategoryOption(res.data));
      }, []);
    
      const handleEdit = (field) => {
        switch (field) {
          case 'name':
            setEditName(prev=>!prev);
            break;
          case 'email':
            setEditEmail(prev=>!prev);
            break;
          case 'description':
            setEditDescription(prev=>!prev);
            break;
          case 'price':
            setEditPrice(prev=>!prev);
            break;
          case 'serviceProvided':
            setEditServiceProvided(prev=>!prev);
            break;
          default:
            break;
        }
      };
    
      const handleSaveChanges = () => {
      
            setEditName(false);
            setEditEmail(false);
            setEditDescription(false);
            setEditPrice(false);
            setEditServiceProvided(false);

        const body = {
          name,
          email,
          category,
          description,
          price,
        };
        const headers = {
          'Content-Type': 'application/json',
        };
        axios.patch(`http://localhost:8800/vendors/${id}`, body, headers).then((res) => setVendorInfo(res.data));
        setopen(true);
      };
    
      return (
        <>
        {vendorInfo?.isActive ?"":( <div className='warningBox'>
          You are not an active member as the admin has not approved your status yet.
        </div>)}
          <Typography variant="h4" component="div" gutterBottom sx={{ margin: '15px' }}>
            Welcome {vendorInfo?.name}
          </Typography>
          <Grid container spacing={3} sx={{ maxWidth: 800, margin: '0 auto' }}>
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  position: 'relative',
                  padding: 3,
                  textAlign: 'center',
                  color: (theme) => theme.palette.text.primary,
                  backgroundColor: (theme) => theme.palette.background.paper,
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  Name:
                </Typography>
                {editName ? (
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <Typography variant="body1">{vendorInfo?.name}</Typography>
                )}
                <IconButton
                  sx={{ position: 'absolute', top: '8px', right: '8px' }}
                  aria-label="Edit"
                  onClick={() => handleEdit('name')}
                >
                  <CreateIcon />
                </IconButton>
                
              </Paper>
            </Grid>
           
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  position: 'relative',
                  padding: 3,
                  textAlign: 'center',
                  color: (theme) => theme.palette.text.primary,
                  backgroundColor: (theme) => theme.palette.background.paper,
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  Email:
                </Typography>
                {editEmail ? (
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <Typography variant="body1">{vendorInfo?.email}</Typography>
                )}
                <IconButton
                  sx={{ position: 'absolute', top: '8px', right: '8px' }}
                  aria-label="Edit"
                  onClick={() => handleEdit('email')}
                >
                  <CreateIcon />
                </IconButton>
                
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper
                sx={{
                  position: 'relative',
                  padding: 3,
                  textAlign: 'center',
                  color: (theme) => theme.palette.text.primary,
                  backgroundColor: (theme) => theme.palette.background.paper,
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  Description:
                </Typography>
                {editDescription ? (
                  <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                ) : (
                  <Typography variant="body1">{vendorInfo?.description}</Typography>
                )}
                <IconButton
                  sx={{ position: 'absolute', top: '8px', right: '8px' }}
                  aria-label="Edit"
                  onClick={() => handleEdit('description')}
                >
                  <CreateIcon />
                </IconButton>
                
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  position: 'relative',
                  padding: 3,
                  textAlign: 'center',
                  color: (theme) => theme.palette.text.primary,
                  backgroundColor: (theme) => theme.palette.background.paper,
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  Cost per hour:
                </Typography>
                {editPrice ? (
                  <TextField
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                ) : (
                  <Typography variant="body1">{vendorInfo?.price&&`$ ${vendorInfo?.price}`}</Typography>
                )}
                <IconButton
                  sx={{ position: 'absolute', top: '8px', right: '8px' }}
                  aria-label="Edit"
                  onClick={() => handleEdit('price')}
                >
                  <CreateIcon />
                </IconButton>
                
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  position: 'relative',
                  padding: 3,
                  textAlign: 'center',
                  color: (theme) => theme.palette.text.primary,
                  backgroundColor: (theme) => theme.palette.background.paper,
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Service Provided:
                </Typography>
                {editServiceProvided ? (
                  <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='selectElement'
                >
                  {categoryOption &&
                    categoryOption?.map((category) => (
                      <option key={category.id} value={category.value}>
                        {category.name}
                      </option>
                    ))}
                </select>
                ) : (
                  <Typography variant="body1">{vendorInfo?.category}</Typography>
                )}
                <IconButton
                  sx={{ position: 'absolute', top: '8px', right: '8px' }}
                  aria-label="Edit"
                  onClick={() => handleEdit('serviceProvided')}
                >
                  <CreateIcon />
                </IconButton>
                
              </Paper>
            </Grid>
          </Grid>
          <Box sx={{display:'flex',justifyContent:"center"}}>
                
            <Button

              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,maxWidth: 6,padding:"5px 20px"}}
              onClick={handleSaveChanges}
            >
              Submit
            </Button>
          </Box>
          <Snackbar
        open={open}
        onClose={()=>setopen(false)}
        autoHideDuration={2000}
        message="Your changes has been succesfully saved"
    >
     <Alert onClose={()=>setopen(false)}  severity="success" sx={{ width: '100%'  }}>
     Your changes has been succesfully saved
      </Alert>
     </Snackbar>
        </>
      );
    };

    export default VendorDashboard;



