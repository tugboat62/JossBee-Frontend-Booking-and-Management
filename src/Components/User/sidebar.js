import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Home, Notifications, Settings, ListAlt } from '@mui/icons-material';


const Sidebar = () => {

  return (
    <div className="sidebar">
      <List component="nav">
        <ListItem component={Link} to="/dashboard" className="list-item">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/my-houses" className="list-item">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="My Houses" />
        </ListItem>
        <ListItem component={Link} to="/my-bookings" className="list-item">
          <ListItemIcon>
            <ListAlt />
          </ListItemIcon>
          <ListItemText primary="My Bookings" />
        </ListItem>
        <ListItem component={Link} to="/notifications" className="list-item">
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem component={Link} to="/settings" className="list-item">
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
