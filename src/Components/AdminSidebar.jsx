import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Category, RoomService } from '@mui/icons-material';

const AdminSidebar = () => {
  return (
    <Drawer
    variant="permanent"
      anchor="left"
      sx={{
        width: '20%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '20%',
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {/* Sidebar Link for Categories */}
        <ListItem  component={Link} to="/admin/categories">
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>

        {/* Sidebar Link for Services */}
        <ListItem  component={Link} to="/admin/services">
          <ListItemIcon>
            <RoomService />
          </ListItemIcon>
          <ListItemText primary="Services" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;