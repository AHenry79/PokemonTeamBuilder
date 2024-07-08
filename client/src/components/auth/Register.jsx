import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../slice/authSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const result = await response.json();
      console.log(result);
      window.sessionStorage.setItem("token", JSON.stringify(result.token));
      console.log(window.sessionStorage.getItem("token"));

      if (response.ok) {
        setError(null);
        dispatch(login());
        navigate("/");
      } else {
        const errorData = await response.text();
        setError("Registration failed: " + errorData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      console.log(error);
      if (error.message.includes("unique constraint")) {
        setServerError("Username or email are already in use");
      } else {
        setServerError("An error occurred. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-form">
        <h1 className="register-title">Sign Up:</h1>
        {serverError && <p>{serverError}</p>}
        {/* Input fields for email, username, password */}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <div className="form-submission">
          {/* Submit button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <CircularProgress /> : "Sign Up"}
          </button>
          {/* Link to login page */}
          <p className="login-link">
            Have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
