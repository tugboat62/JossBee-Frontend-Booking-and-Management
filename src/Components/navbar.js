import React from 'react';
import DropdownMenu from './dropdownMenu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ isLoggedIn, setIsLoggedIn, userId, setUserId }) {

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
                    {
                        isLoggedIn &&
                        <li className="nav-item dropdown">
                            <DropdownMenu setIsLoggedIn={setIsLoggedIn} userId={userId} setUserId={setUserId}/>      
                        </li>
                    }
                    {
                        !isLoggedIn &&
                        <li className="nav-item">
                            <Link className="nav-link" to='/login'>Sign In</Link>
                        </li>
                    }
                </ul>
            </div>
        </header>
    )
}