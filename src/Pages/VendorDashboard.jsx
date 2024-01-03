// import React,{ useState,useEffect }  from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import { Box } from '@mui/system';
// import { InputLabel, TextField,Grid, Paper, Typography,IconButton } from '@mui/material';
// import { FormControl, MenuItem, Select } from '@mui/base';
// //import {  } from '@material-ui/core';
// //import { makeStyles } from '@mui/system';
// import CreateIcon from '@mui/icons-material/Create';



// const VendorDashboard = () => {
//     const {id}=useParams();
//     const [vendorInfo,setVendorInfo]=useState({})
//     const [category,setCategory]=useState("");
//     const [categoryOption,setCategoryOption]=useState("");
//     const [description,setDescription]=useState("");
//     const [price,setPrice]=useState("");


//     useEffect(() => {
//       axios.get(`http://localhost:8800/vendors/${id}`)
//       .then(res=>setVendorInfo(res.data))
     
//     }, [])
//     useEffect(()=>{
//         axios.get(`http://localhost:8800/categories`)
//         .then(res=>setCategoryOption(res.data))

//     },[])
//     useEffect(() => {
//       console.log(categoryOption);
//       console.log(category);
    
      
//     }, [categoryOption,category])
   
    
//     const handleSubmit= e =>{
//         e.preventDefault();
//         const body={
//             category,
//           description,
//           price
//         }
//         const headers={
//             'Content-Type': 'application/json'
//         }
//        axios.patch(`http://localhost:8800/vendors/${id}`,body,headers)
//        .then(res=>console.log(res))
//     }
//     const handleCategory= e =>{
//         console.log(e.target.value);
//         setCategory(e.target.value)

//     }
//     const handleDescription=e=>{
//         setDescription(e.target.value)
//     }
//     const handlePrice=e=>{
//         setPrice(e.target.value)
//     }

// // const useStyles = makeStyles((theme) => ({
// //   gridContainer: {
// //     padding: theme.spacing(3),
// //   },
// //   gridItem: {
// //     padding: theme.spacing(2),
// //     textAlign: 'center',
// //     color: theme.palette.text.secondary,
// //   },
// //   label: {
// //     fontWeight: 'bold',
// //     marginBottom: theme.spacing(1),
// //   },
// // }));
// // const classes = useStyles();
//   return (
//     <>
//     <Typography variant="h4" component="div" gutterBottom sx={{margin:'15px'}}>
//       Welcome {vendorInfo?.name}
//     </Typography>
//    <Grid container spacing={3} sx={{ maxWidth: 800, margin: '0 auto' }}>
//       <Grid item xs={12} sm={6}>
//         <Paper
//           sx={{
//             position: 'relative',
//             padding: 3,
//             textAlign: 'center',
//             color: theme => theme.palette.text.primary,
//             backgroundColor: theme => theme.palette.background.paper,
//             border: '1px solid #ddd',
//             borderRadius: 8,
//             transition: 'transform 0.3s ease-in-out',
//             '&:hover': {
//               transform: 'scale(1.05)',
//             },
//           }}
//         >
//           <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
//             Name:
//           </Typography>
//           <Typography variant="body1">{vendorInfo?.name}</Typography>
//           <IconButton
//             sx={{ position: 'absolute', top: '8px', right: '8px' }}
//             aria-label="Edit"
//           >
//             <CreateIcon />
//           </IconButton>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <Paper
//           sx={{
//             position: 'relative',
//             padding: 3,
//             textAlign: 'center',
//             color: theme => theme.palette.text.primary,
//             backgroundColor: theme => theme.palette.background.paper,
//             border: '1px solid #ddd',
//             borderRadius: 8,
//             transition: 'transform 0.3s ease-in-out',
//             '&:hover': {
//               transform: 'scale(1.05)',
//             },
//           }}
//         >
//           <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
//             Email:
//           </Typography>
//           <Typography variant="body1">{vendorInfo?.email}</Typography>
//           <IconButton
//             sx={{ position: 'absolute', top: '8px', right: '8px' }}
//             aria-label="Edit"
//           >
//             <CreateIcon />
//           </IconButton>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={12}>
//         <Paper
//           sx={{
//             padding: 3,
//             position: 'relative',
//             textAlign: 'center',
//             color: theme => theme.palette.text.primary,
//             backgroundColor: theme => theme.palette.background.paper,
//             border: '1px solid #ddd',
//             borderRadius: 8,
//             transition: 'transform 0.3s ease-in-out',
//             '&:hover': {
//               transform: 'scale(1.05)',
//             },
//           }}
//         >
//           <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
//             Description:
//           </Typography>
//           <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
//           {vendorInfo?.description?vendorInfo?.description:"Not yet added"}
//           </Typography>
//           <IconButton
//             sx={{ position: 'absolute', top: '8px', right: '8px' }}
//             aria-label="Edit"
//           >
//             <CreateIcon />
//           </IconButton>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <Paper
//           sx={{
//             position: 'relative',
//             padding: 3,
//             textAlign: 'center',
//             color: theme => theme.palette.text.primary,
//             backgroundColor: theme => theme.palette.background.paper,
//             border: '1px solid #ddd',
//             borderRadius: 8,
//             transition: 'transform 0.3s ease-in-out',
//             '&:hover': {
//               transform: 'scale(1.05)',
//             },
//           }}
//         >
//           <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
//             Cost per hour:
//           </Typography>
//           <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
//           {vendorInfo?.price?vendorInfo?.price:"Not yet added"}
//           </Typography>
//           <IconButton
//             sx={{ position: 'absolute', top: '8px', right: '8px' }}
//             aria-label="Edit"
//           >
//             <CreateIcon />
//           </IconButton>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <Paper
//           sx={{
//             position: 'relative',
//             padding: 3,
//             textAlign: 'center',
//             color: theme => theme.palette.text.primary,
//             backgroundColor: theme => theme.palette.background.paper,
//             border: '1px solid #ddd',
//             borderRadius: 8,
//             transition: 'transform 0.3s ease-in-out',
//             '&:hover': {
//               transform: 'scale(1.05)',
//             },
//           }}
//         >
//           <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
//             Service Provided:
//           </Typography>
//           <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
//           {vendorInfo?.category?vendorInfo?.category:"Not yet added"}
//           </Typography>
//           <IconButton
//             sx={{ position: 'absolute', top: '8px', right: '8px' }}
//             aria-label="Edit"
//           >
//             <CreateIcon />
//           </IconButton>
//         </Paper>
//       </Grid>
//     </Grid>
//            <Box sx={{ minWidth: 80 }}>
//       <FormControl >
      
//         <InputLabel id="demo-simple-select-label">Category</InputLabel>
//         <select
//           value={category}
//           onChange={handleCategory}
//         >
//           {/* <option value={"Grocery"}>Grocery</option>
//           <option value={"Cosmetics"}>Cosmetics</option>
//           <option value={"Electronics"}>Electronics</option> */}
//           {categoryOption&&categoryOption?.map(category=>(
//             <option key={category.value} value={category.value} >{category.name}</option>
//           ))}
//         </select>
//         <TextField
//               label="Description"
//               onChange={handleDescription}
//             />
//             <TextField 
//                 label="price"
//                 value={price}
//                 onChange={handlePrice}/>
//       </FormControl>
   
//       <button className='login-button'
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               onClick={handleSubmit}
//             >
//               Submit
//             </button>
//     </Box>
   

//     </>
//   )
// }

// export default VendorDashboard

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Box,
  InputLabel,
  TextField,
  Grid,
  Paper,
  Typography,
  IconButton,
  FormControl,
  Button,
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

  useEffect(() => {
    id&&axios.get(`http://localhost:8800/vendors/${id}`)
    .then((res) => setVendorInfo(res.data));
    setName(vendorInfo.name);
    setEmail(vendorInfo.email);
    setDescription(vendorInfo.description);
    setPrice(vendorInfo.price);
    setCategory(vendorInfo.category);
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
        {/* Similar blocks for other fields */}
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
              <Typography variant="body1">${vendorInfo?.price}</Typography>
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
                  <option key={category.value} value={category.value}>
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
      <Box sx={{ minWidth: 80 }}>
       
        <Button
          className="login-button"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSaveChanges}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default VendorDashboard;
