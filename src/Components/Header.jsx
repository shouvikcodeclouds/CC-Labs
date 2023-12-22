import { Avatar } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import avatar from '../images/avatar.png'

const Header = ({logout}) => {

    const navigate=useNavigate();

  return (
    <div>

        <nav className="navbar">
      <div className="navbar-container">
        <div className="site-name">Multilevel App</div>
        <div className="login-container">
        <Avatar alt="S" src={avatar} onClick={()=>{
            navigate('/')
        }
            
            }/>
        </div>
      </div>
     
    </nav>
    </div>
  )
}

export default Header;