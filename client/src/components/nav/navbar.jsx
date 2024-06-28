import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    //waiting for links to be created
    return (
        <nav>
            <ul className="nav-links">
                <li>Change Gen</li>
                <li>Make a team</li>
                <li>Compare Pokemon</li>
                <li>Other users' teams</li>
                {!isLoggedIn && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
            {isLoggedIn && (
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </nav>
    );
};

export default NavBar;