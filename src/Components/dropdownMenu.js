import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Person } from '@mui/icons-material';

const DropdownMenu = ({setIsLoggedIn}) => {
  const auth = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    if (option === 'logout') {
      setIsLoggedIn(false);
      auth.logout();
      navigate('/');
    } 
    else {
      setSelectedOption(option);
      navigate(`user/${option}`);
    }
  };

  const [menuAnchor, setMenuAnchor] = useState(null);

  const openMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };


  return (
    <div className="profile-dropdown">
          <IconButton onClick={openMenu}>
            <Person /> {/* Profile Icon */}
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={closeMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => handleOptionSelect('')}>
              Home
            </MenuItem>
            <MenuItem onClick={() => handleOptionSelect('notifications')}>
              Notifications
            </MenuItem>
            <MenuItem onClick={() => handleOptionSelect('termsandconditions')}>
              Terms and Policy
            </MenuItem>
            <MenuItem onClick={() => handleOptionSelect('settings')}>
              Settings
            </MenuItem>
            <MenuItem onClick={() => handleOptionSelect('logout')}>
              Logout
            </MenuItem>
          </Menu>
        </div>
  );
};

export default DropdownMenu;


{/* <div>
      <DropdownButton id="dropdown-basic-button" variant='secondary' title="Profile">
        <Dropdown.Item onClick={() => handleOptionSelect('')}>
          Home
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionSelect('notifications')}>
          Notifications
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionSelect('termsandconditions')}>
        Terms and Policy
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionSelect('settings')}>
          Settings
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionSelect('logout')}>
          Logout
        </Dropdown.Item>
      </DropdownButton>
    </div> */}