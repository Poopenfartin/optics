import React, { useState } from "react";
import axios from "axios";
import "../../Styles/App.css"; // Import Styles
import { Link, useNavigate } from "react-router-dom"; // Import Link component and useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Optics from "../assets/images/Optic_Logo.png";

const LoginForm = ({ setIsAuthenticated, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      const { token, refreshToken, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="LoginForm-Container">
      <div className="Logo-Container">
        <img src={Optics} alt="Logo" className="Login-Logo" />
      </div>
      <form className="LoginForm" onSubmit={handleSubmit}>
        <div className="Input-Wrapper">
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            className="Login-Input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="Input-Wrapper">
          <FontAwesomeIcon icon={faLock} />
          <input
            className="Login-Input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button className="Login-Button" type="submit">
          Login
        </button>
        <div className="Login-Seperator"></div> {/* Acts as a separator between login button and register button */}
        <h2 className="Login-ForgotPassword">Forgot Password</h2>
        <Link to="/register" className="Register-Link">
          <button className="Register-Button" type="button">
            Create new account
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
