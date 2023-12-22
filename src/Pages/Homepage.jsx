import { Box, Typography } from '@mui/material';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
    const [userType, setUserType] = useState('');

  const handleUserTypeSelection = (selectedType) => {
    setUserType(selectedType);
  };
 const navigate=useNavigate();

  return (
    <>
     <Box>
     <Typography variant="subtitle1" gutterBottom>
       Welcome to Multilevel app. Multilevel app is the perfect platform for vendors to showcase and sell their services. Whether you're a skilled professional or an expert in your field, our platform provides you with the tools to reach a wider audience and grow your business.
      </Typography>
      </Box> 
      <div className="user-type-selection">
      <h2>Choose User Type</h2>
      <div className="radio-container">
        <label className={`user-type-label ${userType === 'admin' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="userType"
            value="admin"
            onChange={() => handleUserTypeSelection('admin')}
          />
          Admin
        </label>

        <label className={`user-type-label ${userType === 'vendor' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="userType"
            value="vendor"
            onChange={() => handleUserTypeSelection('vendor')}
          />
          Vendor
        </label>
      </div>

     
    </div>
       <div>
       <div>
        {userType && (
        <div className="login-signup-options">
          <h3>{`Login ${userType==='vendor'?'/Signup':""} as ${userType}`}</h3>
          <button className='login-button' onClick={()=>{
            userType === 'admin'?navigate('/admin'):navigate('/vendor')
          }}>Login</button>
          {userType === 'vendor' && (
            <button className='login-button' onClick={()=>navigate('/signup')}>Signup</button>
          )}
        </div>
      )}
        </div>
        </div> 

    </>
  )
}

export default Homepage;