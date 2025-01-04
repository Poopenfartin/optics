import React, { useState } from "react";
import axios from "axios";
import "../../Styles/App.css"; // Import Styles
import { Link } from "react-router-dom"; // Import Link component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Optics from "../assets/images/Optic_Logo.png";

const LoginForm = ({ setIsAuthenticated, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error);
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
        <div className="Login-Seperator"></div>{" "}
        {/*Acts as a seperator between login button and register button */}
        <h2 className="Login-ForgotPassword">Forgot Password</h2>
        <Link to="/register">
          <button className="Register-Button" Link to="/register">
            Create new account
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
