import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link component
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../../Styles/App.css";
import { Button } from "@mui/material";

const RegisterForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        { username, email, password, firstName, lastName, jobTitle }
      );
      localStorage.setItem("authToken", data.token);
      setIsAuthenticated(true);
      alert("Registration successful");
      navigate("/proposals");
    } catch (error) {
      alert("Registration failed");
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="RegisterForm-Container">
      
      <form className="RegisterForm" onSubmit={handleSubmit}>
        <Link to="/login">
          <ArrowBackIcon className="Register-GoBack" />
        </Link>
        <h1 className="RegisterHeader">Create a new account</h1>
        <input
          className="Register-Input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="Register-Input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="Register-Input"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          className="Register-Input"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          className="Register-Input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="Register-Input"
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <button className="Register-Button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
