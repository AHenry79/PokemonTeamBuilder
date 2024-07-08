import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.sessionStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  //waiting for links to be created
  return (
    <nav>
      <ul className="nav-links">
        <li>
          <Link to={"/"}>Change Gen</Link>
        </li>
        <li>
          <Link to="/recommendations">Recommended Teams</Link>
        </li>
        <li>Compare Pokemon</li>
        <li>Created Teams</li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/account"}>Account</Link>
            </li>
            <li className="logout-button" onClick={handleLogout}>
              Logout
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
