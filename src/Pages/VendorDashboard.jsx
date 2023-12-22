import React,{ useState,useEffect }  from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/system';
import { InputLabel, TextField } from '@mui/material';
import { FormControl, MenuItem, Select } from '@mui/base';



const VendorDashboard = () => {
    const {id}=useParams();
    const [vendorInfo,setVendorInfo]=useState({})
    const [category,setCategory]=useState("");
    const [categoryOption,setCategoryOption]=useState("");
    const [description,setDescription]=useState("");


    useEffect(() => {
      axios.get(`http://localhost:8800/vendors/${id}`)
      .then(res=>setVendorInfo(res.data))
     
    }, [])
    useEffect(()=>{
        axios.get(`http://localhost:8800/categories`)
        .then(res=>setCategoryOption(res.data))

    },[])
    useEffect(() => {
      console.log(categoryOption);
      console.log(category);
    
      
    }, [categoryOption,category])
    
    const handleSubmit= () =>{
        
       
    }
    const handleCategory= e =>{
        console.log(e.target.value);
        setCategory(e.target.value)

    }
    const handleDescription=e=>{
        setDescription(e.target.value)
    }
    
  return (
    <>
           <Box sx={{ minWidth: 80 }} onSubmit={handleSubmit}>
      <FormControl fullWidth>
      
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleCategory}
        >
          {/* <option value={"Grocery"}>Grocery</option>
          <option value={"Cosmetics"}>Cosmetics</option>
          <option value={"Electronics"}>Electronics</option> */}
          {categoryOption&&categoryOption?.map(category=>(
            <option value={category.value} >{category.name}</option>
          ))}
        </select>
        <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              autoFocus
              onChange={handleDescription}
            />
      </FormControl>
   
      <button className='login-button'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </button>
    </Box>
   

    </>
  )
}

export default VendorDashboard