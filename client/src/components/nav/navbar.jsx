import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!window.sessionStorage.getItem("token")
  );
  useEffect(() => {
    console.log("Logged in!");
  }, [isLoggedIn]);

  const handleLogout = () => {
    window.sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  //waiting for links to be created
  return (
    <nav>
      <ul className="nav-links">
        <li>
          <Link to={"/"}>Change Gen</Link>
        </li>
        <li><Link to="/RecPage">Recommended Teams</Link></li>
        <li>Compare Pokemon</li>
        <li>Created Teams</li>
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
