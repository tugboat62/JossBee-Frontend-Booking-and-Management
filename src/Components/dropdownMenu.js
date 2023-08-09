import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    navigate(`/${option}`);
  };

  return (
    <div>
      <DropdownButton id="dropdown-basic-button" variant='secondary' title="Profile">
        <Dropdown.Item onClick={() => handleOptionSelect('login')}>
          Log in
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionSelect('termsandconditions')}>
        Terms and Policy
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionSelect('settings')}>
          Settings
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default DropdownMenu;
