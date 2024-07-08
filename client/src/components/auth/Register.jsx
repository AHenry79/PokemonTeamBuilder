import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };


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
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });


      const result = await response.json();
      console.log(result);
      window.sessionStorage.setItem("token", JSON.stringify(result.token))
      console.log(window.sessionStorage.getItem("token"))


      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(result.error || "Registration failed!");
      }
      navigate("/")
      window.location.reload()


    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-form">
        <h1 className="register-title">Sign Up</h1>
       
        {/* Input fields for name, email, address, username, password */}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
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
        <div className="form-submission">
          {/* Submit button */}
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
          {/* Link to login page */}
          <p className="login-link">
            Have an account? <Link to={"/auth/login"}>Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}


export default RegisterPage;
