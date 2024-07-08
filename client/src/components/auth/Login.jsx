import  { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error logging in:", errorData);
        alert("Login failed: " + errorData);
        return;
      }
      const token = await response.json();
      window.sessionStorage.setItem("token", token);
      // setIsLoggedIn(true);
      alert("Login successful!");
      // Redirect or other actions
      navigate("/")
      window.location.reload()
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Login</h1>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email..."
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
        <div className="form-submission">
          <button type="submit" className="login-button">
            Login
          </button>
          <p>
            No Account? <Link to="/auth/register">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};


export default LoginPage;
