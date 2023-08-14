import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';

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

  return (
    <div>
      <DropdownButton id="dropdown-basic-button" variant='secondary' title="Profile">
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
    </div>
  );
};

export default DropdownMenu;
