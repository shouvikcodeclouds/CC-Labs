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



const Admin = () => {
  const [vendorData, setVendorData] = useState([]);
  const [pg, setPg] = useState(0);
  const [rpg, setRpg] = useState(5);
  const [dropdown, setDropdown] = useState(null);
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  const btnref=useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8800/vendors').then((res) => {
      setVendorData(res.data);
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
      .delete(`http://localhost:8800/vendors/${uid}`)
      .then((res) => {
        setVendorData((prevData) => prevData.filter((vendor) => vendor.id !== uid));
        setFilteredData((prevData) => prevData.filter((vendor) => vendor.id !== uid));
        setDropdown(null);
      })
      .catch((error) => {
        console.error('Error deleting vendor:', error);
        setDropdown(null);
      });
      setOpen(false)
  };

  const handleSearch = () => {
    const filteredVendors = vendorData.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (vendor?.category.toLowerCase().includes(searchTerm.toLowerCase()) ) &&
        (statusFilter === 'all' ||
          (vendor.isActive && statusFilter === 'active') ||
          (!vendor.isActive && statusFilter === 'inactive'))
    );
    setFilteredData(filteredVendors);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    const selectedStatus = e.target.value.toLowerCase();
    setStatusFilter(selectedStatus);
    const filteredVendors = vendorData.filter((vendor) =>
      selectedStatus === 'all' ? true : (vendor.isActive && selectedStatus === 'active') || (!vendor.isActive && selectedStatus === 'inactive')
    );
  
    setFilteredData(filteredVendors);
   
  };

  return (
    <>
    
     <div className="admin-dashboard-container">
    <Grid container spacing={2}>
      <Grid item sm={6}>
      <div className="filter-container">
          
          <span className="filter-label">Filter by Status <FilterListIcon className="filter-icon" /></span>
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Status Filter' }}
            >
              <MenuItem value="all" disabled>
                Filter by Status
              </MenuItem>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </div>
      </Grid>
      <Grid item sm={6}>
      <div className="search-container">
        <TextField
  className="search-input"
  label="Search by Name or Category"
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
                <TableCell align="left" sx={{color:'white',fontWeight:'bold'}}>Vendor ID</TableCell>
                <TableCell align="center" sx={{color:'white',fontWeight:'bold'}}>Category</TableCell>
                <TableCell align="center" sx={{color:'white',fontWeight:'bold'}}>Status</TableCell>
                <TableCell sx={{color:'white',fontWeight:'bold'}}>Description</TableCell>
                <TableCell sx={{color:'white',fontWeight:'bold'}}>Cost per hour</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
            {(filteredData.length === 0 && (searchTerm||statusFilter!=='all')) ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                <p className='inactive'>  No data found. </p>
                </TableCell>
              </TableRow>
            ) : (
              (filteredData.length > 0 ? filteredData : vendorData)
                .slice(pg * rpg, pg * rpg + rpg)
                .map((vendor) => (
                  <TableRow
                    key={vendor.id}
                    className="table-row"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {vendor.name}
                    </TableCell>
                    <TableCell align="left">{vendor.id}</TableCell>
                    <TableCell align="center">
                      {vendor.category ? vendor.category : 'Not added'}
                    </TableCell>
                    <TableCell align="left">
                      {vendor.isActive ? (
                        <div className="active">Active</div>
                      ) : (
                        <div className="inactive">Inactive</div>
                      )}
                    </TableCell>
                    <TableCell>{vendor.description ? vendor.description : 'Not added'}</TableCell>
                    <TableCell>{vendor.price ? `$${vendor.price}` : 'Not added'}</TableCell>
                    <TableCell>
                      <MoreVertIcon onClick={(e) => handleDropdown(e, vendor.id)} sx={{cursor:'pointer'}} />
                    </TableCell>
                  </TableRow>
                )))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={(filteredData.length > 0 ? filteredData : vendorData).length}
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
              <li onClick={() => navigate(`/vendortracker/${uid}`)}>Edit</li>
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
    desc="vendor"
    />
    </>
  );
};

export default Admin;
