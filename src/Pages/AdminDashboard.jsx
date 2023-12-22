import React, {useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';


const AdminDashboard = () => {

    const [loginData, setLoginData] = useState("");
    const [error, setError] = useState("");
    const [vendorData,setVendorData]=useState([])
    useEffect(() => {
        axios.get('http://localhost:8800/vendors')
        .then(res=>setVendorData(res.data))
      
    }, [])
    useEffect(() => {
      console.log(vendorData)
    
      
    }, [vendorData])
    const changeActiveStatus=(id,status)=>{
        let changedData;
        const headers= {
            'Content-Type': 'application/json',
          }
          let activeStatus={ isActive: !status }
        axios.patch(`http://localhost:8800/vendors/${id}`,activeStatus,headers)
        .then(res=>changedData=res)
        axios.get('http://localhost:8800/vendors')
        .then(res=>setVendorData(res.data))

    }
  return (
    <div className='admin-dashboard-container'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Id</TableCell>
            <TableCell >Category</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Description</TableCell>
            {/* <TableCell align="right">Edit Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {vendorData&&vendorData?.map(vendor => (
            <TableRow
              key={vendor.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
             
            >
              <TableCell component="th" scope="row">{vendor.name}</TableCell>
              <TableCell align="right">{vendor.id}</TableCell>
              <TableCell align="right">{vendor.category?vendor.category:"Not added"}</TableCell>
              <TableCell align="right">
                  {vendor.isActive ? (
                    <button className='login-button'
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => changeActiveStatus(vendor.id,vendor.isActive)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button className='login-button'
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => changeActiveStatus(vendor.id,vendor.isActive)}
                    >
                      Activate
                    </button>
                  )}
              </TableCell>
              <TableCell >{vendor.description?vendor.description:"Not added"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  )
}

export default AdminDashboard;