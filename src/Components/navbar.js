import React from 'react';
import DropdownMenu from './dropdownMenu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {


    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to='/'>
                    <img src="../Images/JossBee.png" alt="Logo" width="30" height="30" className="d-inline-block align-text-top"/>
                </Link>
                <form className="form-inline mx-auto">
                    <input className="form-control mr-2" type="text" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-primary" type="submit">
                    <i className="fas fa-search"></i>
                    </button>
                    <button className="btn btn-outline-secondary ml-2" type="button">
                    <i className="fas fa-filter"></i>
                    </button>
                </form>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link className="nav-link" to='/'>JossBee Your Home</Link>
                    </li>   
                    <li className="nav-item dropdown">
                        <DropdownMenu />      
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/login'>Sign In</Link>
                    </li>
                    {/* <li>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
                            <Link className="dropdown-item" to='/'>Profile</Link>
                            <Link className="dropdown-item" to='/'>Settings</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to='/'>Logout</Link>
                        </div>
                    </li> */}
                </ul>
            </div>
        </header>
    )
}