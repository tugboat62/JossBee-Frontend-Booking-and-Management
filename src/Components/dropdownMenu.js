import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const DropdownMenu = ({setIsLoggedIn, userId, setUserId}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    if (option === 'login') {
      setIsLoggedIn(false);
      setUserId(null);
      navigate('/login');
    } 
    else {
      setSelectedOption(option);
      navigate(`user/${userId}/${option}`);
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
        <Dropdown.Item onClick={() => handleOptionSelect('login')}>
          Logout
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default DropdownMenu;
