import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  IconButton,
  Popover,
  Select,
  MenuItem,
  InputAdornment,
  Grid,
 
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';



const CustomerData = () => {
  const [customerData, setCustomerData] = useState([]);
  const [pg, setPg] = useState(0);
  const [rpg, setRpg] = useState(5);
  const [dropdown, setDropdown] = useState(null);
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
 
  const navigate = useNavigate();
  const btnref=useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8800/customers').then((res) => {
        setCustomerData(res.data);
    });
  }, []);

  const handleChangePage = (e, newpage) => {
    setPg(newpage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRpg(parseInt(e.target.value, 10));
    setPg(0);
  };

  const handleDropdown = (e, id) => {
    setDropdown(e.currentTarget);
    setUid(id);
  };

  const handleClose = () => {
    setDropdown(null);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8800/customers/${uid}`)
      .then((res) => {
        setCustomerData((prevData) => prevData.filter((customer) => customer.id !== uid));
        setFilteredData((prevData) => prevData.filter((customer) => customer.id !== uid));
        setDropdown(null);
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
        setDropdown(null);
      });
      setOpen(false)
  };

  const handleSearch = () => {
    const filteredCustomers = customerData.filter(
      (customer) =>
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ) 
        
    );
    setFilteredData(filteredCustomers);
  };

 

  return (
    <>
    
     <div className="admin-dashboard-container">
    <Grid container spacing={2}>
    <Grid item sm={6}></Grid>
      <Grid item sm={6}>
      <div className="search-container">
        <TextField
  className="search-input"
  label="Search by customer name"
  variant="outlined"
  size="small"
  style={{ width: '100%', maxWidth: '100%' }} 
  onChange={(e) => {
    setSearchTerm(e.target.value)
    setTimeout(() => {
      btnref.current.click();
    }, 1500);
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton ref={btnref} className="search-button" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    ),
    sx: {
      '& .MuiOutlinedInput-root': {
        position: 'relative',
        '&:before': {
          content: "''",
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderBottom: '1px solid #000', 
          pointerEvents: 'none',
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiInputBase-input': {
        padding: '8px 0',
      },
      '& .MuiInputLabel-root': {
        transform: 'translate(14px, 12px) scale(1)',
      },
    },
  }}
/>
  </div>
      </Grid>
    </Grid>
        <TableContainer component={Paper} className="table-container">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className='table-header'>
              <TableRow>
                <TableCell align="left" sx={{color:'white',fontWeight:'bold'}}>Name</TableCell>
                <TableCell align="left" sx={{color:'white',fontWeight:'bold'}}>Customer ID</TableCell>
                <TableCell align="left" sx={{color:'white',fontWeight:'bold'}}>Email</TableCell>
                <TableCell align="left" sx={{color:'white',fontWeight:'bold'}}>Phone number</TableCell>
                <TableCell align="left" sx={{color:'white',fontWeight:'bold'}}>Address</TableCell>
                
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
            {(filteredData.length === 0 &&customerData.length===0 ) ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                <p className='inactive'>  No data found. </p>
                </TableCell>
              </TableRow>
            ) : (
              (filteredData.length > 0 ? filteredData : customerData)
                .slice(pg * rpg, pg * rpg + rpg)
                .map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="table-row"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {customer.firstName} {customer.lastName}
                    </TableCell>
                    <TableCell align="left">{customer.id}</TableCell>
                    <TableCell>{customer.email ? customer.email : 'Not added'}</TableCell>
                    <TableCell>{customer.phoneNumber ? `${customer.phoneNumber}` : 'Not added'}</TableCell>
                    <TableCell>{customer?.address&&`${customer?.address} ${customer?.address2 && `,${customer?.address2}`},${customer?.city},${customer?.state}-${customer?.pincode} ${customer?.country}`}</TableCell>
                    <TableCell>
                      <MoreVertIcon onClick={(e) => handleDropdown(e, customer.id)} sx={{cursor:'pointer'}} />
                    </TableCell>
                  </TableRow>
                )))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={(filteredData.length > 0 ? filteredData : customerData).length}
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Popover
          id="simple-popover"
          open={Boolean(dropdown)}
          anchorEl={dropdown}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <div className="custom-dropdown">
            <ul onClick={()=>setDropdown(null)}>
              <li onClick={() => navigate(`/customertracker/${uid}`)}>Edit</li>
              <li className="delete-button" onClick={()=>setOpen(true)}>
                Delete
              </li>
            </ul>
          </div>
        </Popover>
      </div>
     
    <Modal 
    onClose={()=>setOpen(false)} 
    onClick={handleDelete} 
    open={open}
    desc="customer"
    />
    </>
  );
};

export default CustomerData;