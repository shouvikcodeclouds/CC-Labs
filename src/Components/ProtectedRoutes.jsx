import React,{useEffect} from 'react'
import { Navigate, Outlet } from 'react-router-dom'




const ProtectedRoutes = ({token}) => {
    let auth = {'token':token}
    useEffect(() => {
        
        console.log(auth);
    }, [auth.token])
    
  
return (
    auth.token ? <Outlet/> : <Navigate to='/'/>
  )
}

export default ProtectedRoutes;