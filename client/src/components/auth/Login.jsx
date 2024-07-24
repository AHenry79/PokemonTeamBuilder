import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../slice/authSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverError, setServerError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error logging in:", errorData);
        setError("Login failed: " + errorData);
        setLoading(false);
        return;
      } else {
        const tokenObject = await response.json();
        window.sessionStorage.setItem("token", tokenObject.token);
        setError(null);
        dispatch(login());
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setServerError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="wrapper-auth">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-header">
          <h2 className="login-title">Login:</h2>
          <img
            src={
              "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTRreHNhc2g3ZnV0cTFrZ3V0d25zZTBhOHU5dnllMDczZGxwZmU4aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/nPu9aQYq1dQbu/200.webp"
            }
            alt="Login GIF"
            className="login-signup-gif"
          />
        </div>
        {serverError && <p className="error-message">{serverError}</p>}
        <div className="input-box">
          <EmailIcon className="login-icon" />
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <LockIcon className="login-icon" />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-submission">
          <button
            type="submit"
            className="login-signup-button"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </button>
          <p className="register-link">
            No Account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
