import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../slice/authSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

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
      window.sessionStorage.setItem("token", result.token);
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
    <div className="register-pages">
      <div className="wrapper-auth register-wrapper">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="login-header">
            <h2 className="register-title">Sign Up:</h2>
            <img
              src={
                "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTVnNXRwYjdycTI1c2Fpd2wzMjJkNjg1dnJmMWQ0Y3MzdWtsazN4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9X65okD6Z5bgm6BcKg/giphy.webp"
              }
              alt="Sign Up GIF"
              className="login-signup-gif signup-gif"
            />
            {serverError && <p>{serverError}</p>}
          </div>
          {/* Input fields for email, username, password */}
          <div className="input-box">
            <PersonIcon className="login-icon" />
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <EmailIcon className="login-icon" />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <LockIcon className="login-icon" />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <LockIcon className="login-icon" />
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
            <button
              type="submit"
              className="login-signup-button"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </button>

            <p className="register-link">
              Have an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
