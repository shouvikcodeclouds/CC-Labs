import { Avatar,IconButton, Popover } from '@mui/material';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import avatar from '../images/avatar.png'
import vendor from '../images/vendor.png'

import { KeyboardArrowDown } from '@mui/icons-material';

const Header = () => {

    const navigate=useNavigate();
    const [dropdown, setDropdown] = useState(null);

  const handleLogout = () => {
      localStorage.setItem('admin',false)
      localStorage.setItem('vendor',false)
      setTimeout(() => {
        navigate('/')
        setDropdown(null)
      }, 1200);
      
  }

    const handleDropdown = (e) => {
      setDropdown(e.currentTarget);
        
    };
    const handleClose = (e) => {
      setDropdown(null);
        
    };


  return (
    <div>

        <nav className="navbar">
      <div className="navbar-container">
        <div className="site-name" onClick={()=>navigate("/")}>Multilevel App</div>
        <div className="login-container">
        {
        (localStorage.getItem('admin')=="true"||localStorage.getItem('vendor')=="true")&&
        <>
          <Avatar alt="S" src={ (localStorage.getItem('admin')=="true")?avatar:vendor} >
            
            </Avatar>
            <IconButton onClick={handleDropdown}>
                <KeyboardArrowDown />
              </IconButton>
              </>
              }
        </div>
      </div>
     
    </nav>
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
              <li onClick={handleLogout}> Logout</li>
               
              
            </ul>
          </div>
        </Popover>
    </div>
  )
}

export default Header;