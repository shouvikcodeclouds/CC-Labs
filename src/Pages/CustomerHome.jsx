import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Avatar,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import Fileupload from '../Components/Fileupload';

const CustomerHome = () => {
  const { id } = useParams();
  const [customerInfo, setCustomerInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [file, setFile] = useState([])
  const [image,setImage]=useState();
  const [open,setOpen]=useState(false);

    function handleChange(e,file) {
      if (!file) {
        console.log("no file")
        return;
      }
      setFile(e.target.files[0])
      console.log(file);
      const reader = new FileReader();
      reader.onloadend = () => {
      const base64String = reader.result;
      setImage(base64String);
    };
   
      reader.readAsDataURL(file);
  
  };

    
    
    const handleSubmit=(e)=> {
     
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file?.name);
      axios.patch(`http://localhost:8800/customers/${id}`, {image:image}).then((res) => {
        console.log(res.data);
        setCustomerInfo(res.data)
      });}

  useEffect(() => {
    id &&
      axios
        .get(`http://localhost:8800/customers/${id}`)
        .then((res) => setCustomerInfo(res.data)) 
        .catch((err) => console.error(err));
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
   
    setEditedFields({
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      address: customerInfo.address,
      address2: customerInfo.address2,
      city: customerInfo.city,
      state: customerInfo.state,
      pincode: customerInfo.pincode,
      country: customerInfo.country,
      phoneNumber: customerInfo.phoneNumber,
      email: customerInfo.email,
    });
}

  const handleSaveChanges = () => {
    const updatedData = {
        firstName: editedFields.firstName,
        lastName: editedFields.lastName,
        address: editedFields.address,
        address2: editedFields.address2,
        city: editedFields.city,
        state: editedFields.state,
        pincode: editedFields.pincode,
        country: editedFields.country,
        phoneNumber: editedFields.phoneNumber,
        email: editedFields.email,
      };
    
      axios
      .patch(`http://localhost:8800/customers/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setCustomerInfo(res.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error('Error updating customer information:', error);
      });
  };
 

  const handleInputChange = (fieldName, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  return (
    <>
   
      <Paper className="paper data-section">
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="div" gutterBottom className="welcome-text">
            Welcome, {customerInfo?.firstName} {customerInfo?.lastName}
          </Typography>
          <Avatar alt="Profile Picture" src={customerInfo.image} sx={{ width: 150, height: 150 }} onClick={()=>setOpen(true)}/>
        
          {!editMode && (
            <IconButton onClick={handleEdit}>
              <CreateIcon />
            </IconButton>
          )}
        </Box>
        <Fileupload open={open} onClose={()=>setOpen(false)} onUpload={handleSubmit} />
        {editMode ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                value={editedFields.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                value={editedFields.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                value={editedFields.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                value={editedFields.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                variant="outlined"
                value={editedFields.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                variant="outlined"
                value={editedFields.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                variant="outlined"
                value={editedFields.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                value={editedFields.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={editedFields.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleSaveChanges} variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography className="user-data">
                <strong>First Name:</strong> {customerInfo.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className="user-data">
                <strong>Last Name:</strong> {customerInfo.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className="user-data">
                <strong>Address:</strong> {customerInfo.address} {customerInfo.address2 && `,${customerInfo.address2}`},{customerInfo.city},{customerInfo.state}-{customerInfo.pincode} {customerInfo.country}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className="user-data">
                <strong>City:</strong> {customerInfo.city}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className="user-data">
                <strong>State:</strong> {customerInfo.state}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className="user-data">
                <strong>Pincode:</strong> {customerInfo.pincode}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className="user-data">
                <strong>Country:</strong> {customerInfo.country}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className="user-data">
                <strong>Phone Number:</strong> {customerInfo.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className="user-data">
                <strong>Email:</strong> {customerInfo.email}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
    </>
  );
};

export default CustomerHome;



// const CustomerHome = () => {
//     const { id } = useParams();
//     const [customerInfo, setCustomerInfo] = useState({});
//     const [editName, setEditName] = useState(false);
//     const [editEmail, setEditEmail] = useState(false);
//     const [editDescription, setEditDescription] = useState(false);
//     const [editPrice, setEditPrice] = useState(false);
//     const [editServiceProvided, setEditServiceProvided] = useState(false);
//     useEffect(() => {
//         id&&axios.get(`http://localhost:8800/customers/${id}`)
//         .then(res=>setCustomerInfo(res.data))
//         .catch(err=>console.error(err))

//     },[id])
    
    
//     const handleSaveChanges = () => {
      
//         // setEditName(false);
//         // setEditEmail(false);
//         // setEditDescription(false);
//         // setEditPrice(false);
//         // setEditServiceProvided(false);

//     const body = {
    
//     };
//     const headers = {
//       'Content-Type': 'application/json',
//     };
//     axios.patch(`http://localhost:8800/customers/${id}`, body, headers).then((res) => setCustomerInfo(res.data));
  
//   };
//   return (
//     <>
//     <Paper className="paper data-section">
//       <Typography variant="h4" component="div" gutterBottom className="welcome-text">
//         Welcome {customerInfo?.firstName}
//       </Typography>
//       <Typography variant="h6" gutterBottom>
//         Your Data:
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <Typography className="user-data">
//             <strong>First Name:</strong> {customerInfo.firstName}
//           </Typography>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography className="user-data">
//             <strong>Last Name:</strong> {customerInfo.lastName}
//           </Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography className="user-data">
//             <strong>Address:</strong> {customerInfo.address} {customerInfo.address2 && `,${customerInfo.address2}`},{customerInfo.city},{customerInfo.state}-{customerInfo.pincode} {customerInfo.country}
//           </Typography>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography className="user-data">
//             <strong>Phone Number:</strong> {customerInfo.phoneNumber}
//           </Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography className="user-data">
//             <strong>Email:</strong> {customerInfo.email}
//           </Typography>
//         </Grid>
//       </Grid>
//     </Paper>
//     </>
//   )
// }

// export default CustomerHome;
