import React from 'react';
import DropdownMenu from './dropdownMenu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { Badge, IconButton, InputBase } from '@mui/material';
import { Notifications, Search, FilterList } from '@mui/icons-material';
import '../Styles/searchbox.css';

export default function Navbar({ setIsLoggedIn, userId, setUserId }) {

    const auth = useAuth();
    const [notifications, setNotifications] = React.useState(3);
    const navigate = useNavigate();

    const goToNotifications = () => {
        setNotifications(0);
        navigate(`user/notifications`);
    }

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to='/'>
                    <img src="../Images/JossBee.png" alt="" width="30" height="30" className="d-inline-block align-text-top"/>
                </Link>

                <ul className='search-item' class='navbar-nav ml-auto'>
                <li>
                    <div className="search-input">
                        <InputBase
                            placeholder="Search…"
                            startAdornment={<Search className="search-icon" />}
                            className="search-input"
                        />
                    </div>
                </li>
                <li>
                    <IconButton className="filter-button" onClick={() => console.log('Filter clicked')}>
                    <FilterList className="filter-icon" /> {/* Filter Icon */}
                    </IconButton>
                </li>
               </ul>

                <ul className="navbar-nav ml-auto">                  
                    <li className="nav-item">
                        <Link className="nav-link" to='/'>JossBee Your Home</Link>
                    </li>  
                    {
                        auth.user &&
                        <div className="profile-dropdown">
                            <ul className="navbar-nav ml-auto">
                            <li>
                                <IconButton onClick={goToNotifications}>
                                    <Badge badgeContent={notifications} color="error">
                                        <Notifications /> {/* Notification Icon */}
                                    </Badge>
                                </IconButton>
                            </li>
                            <li>
                                <DropdownMenu className="nav-item dropdown" setIsLoggedIn={setIsLoggedIn}/>      
                            </li></ul>
                        </div>
                    }
                    {
                        !auth.user &&
                        <li className="nav-item">
                            <Link className="nav-link" to='/login'>Sign In</Link>
                        </li>
                    }
                </ul>
            </div>
        </header>
    )
}