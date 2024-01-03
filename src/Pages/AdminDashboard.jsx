// import React, {useState, useEffect } from 'react'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TablePagination from "@mui/material/TablePagination"; 
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Popover from '@mui/material/Popover';

// import axios from 'axios';
// //import AdminSidebar from '../Components/AdminSidebar';
// //import { MenuItem } from '@mui/base';
// //import { Diversity2 } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';



// const AdminDashboard = () => {

//     const [loginData, setLoginData] = useState("");
//     const [error, setError] = useState("");
//     const [vendorData,setVendorData]=useState([])
//     const [pg, setpg] = useState(0); 
//     const [uid, setUid] = useState(""); 
//     const [rpg, setrpg] = useState(5); 
//     const [dropdown,setDropdown]=useState(null)
//     const navigate=useNavigate();
//     useEffect(() => {
//         axios.get('http://localhost:8800/vendors')
//         .then(res=>setVendorData(res.data))
      
//     }, [])
    
    
//     const handleChangePage=(e, newpage)=> { 
//         setpg(newpage); 
//     } 
  
//     const handleChangeRowsPerPage=(e) =>{ 
//         setrpg(parseInt(e.target.value, 10)); 
//         setpg(0); 
//     } 
//     const handleDropdown=(e)=>{
//       setDropdown(e.currentTarget)
//       //setUid(id)
//     }
//     const handleClose = () => {
//         setDropdown(null);
//       };
//       const open = Boolean(dropdown);
//       const drop = open ? 'simple-popover' : undefined;
//   return (
//     <>
  
//     <div className='admin-dashboard-container'>
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell align='left'>Name</TableCell>
//             <TableCell align='left' >Id</TableCell>
//             <TableCell align='center' >Category</TableCell>
//             <TableCell align='center' >Status</TableCell>
//             <TableCell >Description</TableCell>
//             <TableCell >Cost per hour</TableCell>
//             <TableCell ></TableCell>
//             {/* <TableCell align="right">Edit Status</TableCell> */}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {vendorData&&
//           vendorData?.slice(pg * rpg, pg * rpg + rpg)
//           .map(vendor => (
//             <TableRow
//               key={vendor.id}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
             
//             >
//               <TableCell component="th" scope="row">{vendor.name}</TableCell>
//               <TableCell align="left">{vendor.id}</TableCell>
//               <TableCell align="center">{vendor.category?vendor.category:"Not added"}</TableCell>
//               <TableCell align="left">
//                   {vendor.isActive ? (
//                     <div 
//                     className='active'
//                       fullWidth
//                       variant="contained"
//                       sx={{ mt: 3, mb: 2 }}
//                       //onClick={() => changeActiveStatus(vendor.id,vendor.isActive)}
//                     >
//                       Active
//                     </div>
//                   ) : (
//                     <div
//                     className='inactive'
//                       fullWidth
//                       variant="contained"
//                       sx={{ mt: 3, mb: 2 }}
//                       //onClick={() => changeActiveStatus(vendor.id,vendor.isActive)}
//                     >
//                       Inactive
//                     </div>
//                   )}
//               </TableCell>
//               <TableCell >{vendor.description?vendor.description:"Not added"}</TableCell>
//               <TableCell >{vendor.price?vendor.price:"Not added"}</TableCell>
//               <TableCell  onClick={()=>setUid(vendor.id)}>
//                 <MoreVertIcon onClick={handleDropdown}/>
                
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
        
//       </Table>
     
//     </TableContainer>
//     <TablePagination 
//                 rowsPerPageOptions={[5, 10, 25]} 
//                 component="div"
//                 count={vendorData.length} 
//                 rowsPerPage={rpg} 
//                 page={pg} 
//                 onPageChange={handleChangePage} 
//                 onRowsPerPageChange={handleChangeRowsPerPage} 
//             /> 
//     </div>
//     <Popover
//                     id={drop}
//                     open={open}
//                     anchorEl={dropdown}
//                     onClose={handleClose}
                   
//                     anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'left',
//         }}
//       >
//         <div  className="custom-dropdown">
//         <ul>
//         <li onClick={()=>navigate(`/vendortracker/${uid}`)}>Edit</li>
//         <li >Delete</li>
//         </ul>
//         </div>
        
//     </Popover>
   
//     </>
//   )
// }

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import {
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
  Typography,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { admin } from '../_mock/admin';


const AdminDashboard = () => {
  const [vendorData, setVendorData] = useState([]);
  const [pg, setPg] = useState(0);
  const [rpg, setRpg] = useState(5);
  const [dropdown, setDropdown] = useState(null);
  const [uid, setUid] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

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
  };

  const handleSearch = () => {
    const filteredVendors = vendorData.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === 'all' || vendor.category === categoryFilter) &&
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
    <Typography margin={3} variant="h5">Welcome, {admin.displayName.substring(0,admin.displayName.indexOf(" "))}</Typography>
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
              <MenuItem value="all">Both</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </div>
      </Grid>
      <Grid item sm={6}>
      <div className="search-container">
        <TextField
  className="search-input"
  label="Search by Name"
  variant="outlined"
  size="small"
  style={{ width: '100%', maxWidth: '100%' }} // Set the width as a percentage of the page width
  onChange={(e) => setSearchTerm(e.target.value)}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton className="search-button" onClick={handleSearch}>
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
          borderBottom: '1px solid #000', // Adjust the color as needed
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
            <TableHead className="table-header">
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Id</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Cost per hour</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {(filteredData.length > 0 ? filteredData : vendorData)
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
                    <TableCell>{vendor.price ? vendor.price : 'Not added'}</TableCell>
                    <TableCell>
                      <MoreVertIcon onClick={(e) => handleDropdown(e, vendor.id)} sx={{cursor:'pointer'}} />
                    </TableCell>
                  </TableRow>
                ))}
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
            <ul>
              <li onClick={() => navigate(`/vendortracker/${uid}`)}>Edit</li>
              <li className="delete-button" onClick={handleDelete}>
                Delete
              </li>
            </ul>
          </div>
        </Popover>
      </div>
    </>
  );
};

export default AdminDashboard;
