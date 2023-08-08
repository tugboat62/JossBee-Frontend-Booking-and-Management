// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../Styles/dropdownMenu.css';

// const DropdownMenu = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(true);

//   const handleMenuToggle = () => {
//     setIsMenuOpen(prevState => !prevState);
//     isMenuOpen && console.log("Menu is open");
//     !isMenuOpen && console.log("Menu is closed");
//   };

//   return (
//     <div className="dropdown">
//       <button className="dropdown-toggle" onClick={handleMenuToggle}>
//         Profile
//       </button>
//       {isMenuOpen && (
//         <ul className="dropdown-menu">
//           <li>
//             <a href="/login">Login</a>
//           </li>
//           <li>
//             <a href="/">Terms and Policy</a>
//           </li>
//           <li>
//             <a href="/">Settings</a>
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DropdownMenu;

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
