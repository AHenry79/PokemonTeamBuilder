import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../slice/authSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

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
        const token = await response.json();
        window.sessionStorage.setItem("token", token);
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
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Login:</h1>
        {serverError && <p>{serverError}</p>}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <p>{error}</p>}
        <div className="form-submission">
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <CircularProgress /> : "Login"}
          </button>
          <p>
            No Account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
