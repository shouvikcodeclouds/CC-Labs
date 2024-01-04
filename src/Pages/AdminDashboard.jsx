import { Typography } from '@mui/material';
import React,{useState} from 'react'
import Admin from '../Components/Admin';
import Category from '../Components/Category';
import { admin } from '../_mock/admin';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
    <Typography margin={3} variant="h5">Welcome, {admin.displayName.substring(0,admin.displayName.indexOf(" "))}</Typography>
      <div className="tab-header">
        <button
          className={`tab tab-button ${activeTab === 'tab1' ? 'active-tab' : ''}`}
          onClick={() => handleTabChange('tab1')}
        >
          Track Vendors
        </button>
        <button
          className={`tab tab-button ${activeTab === 'tab2' ? 'active-tab' : ''}`}
          onClick={() => handleTabChange('tab2')}
        >
          Categories
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'tab1' && <><Admin/></>}
        {activeTab === 'tab2' && <><Category/></>}
      </div>
    </>
    
  )
}

export default AdminDashboard