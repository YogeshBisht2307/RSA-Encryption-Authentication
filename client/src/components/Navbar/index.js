import React from 'react';
import {Link} from "react-router-dom";
import {getCookie} from '../../components/csrftoken';

const Navbar = ({name, setName}) => {
    const csrftoken = getCookie('csrftoken')
    const Logout = async () => {
        await fetch('http://localhost:8000/api/authentication/logout/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
            },
            credentials: 'include',
        });
        setName('');
    }
    let menu;
    if (name === '') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link" onClick={Logout}>Logout</Link>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>

                <div>
                    {menu}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
