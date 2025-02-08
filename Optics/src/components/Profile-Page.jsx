import React from "react";
import Box from '@mui/material/Box';
import "../../Styles/App.css";
import SearchComponent from "../components/SearchComponent";

const ProfilePage = ({ user }) => {
  return (
    <Box className="profile-container">
      <Box sx={{ display: "flex", flexDirection: "row", ml: -0.5, mb: -1, gap: 2 }}>
        {/* Left Box: User Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            backgroundColor: "#1e1e1e",
            padding: 3, // Increased padding for better spacing
            borderRadius: 2,
            alignItems: "center", // Center content horizontally
          }}
        >
          <h1 className="profile-h1">Profile</h1>
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=826&t=st=1719374252~exp=1719374852~hmac=384d89c4c305fabcd0e40764416da0985d75085f7c38963ef024b12944d7975f"
            alt="User Avatar"
            className="profile-picture-no-hover"
          />
          <h2 className="profile-h2">HUGE NUTSACK</h2>
          <div className="profile-page-users-name">
            {user.firstName} {user.lastName}
          </div>
          <h3 className="profile-h3">{user.email}</h3>
          <h4 className="profile-h4">User info:</h4>
        </Box>

        {/* Right Box: Overview */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            backgroundColor: "#2c2c2c",
            padding: 3, // Increased padding for better spacing
            borderRadius: 2,
          }}
        >
          <h1 className="profile-h1">Overview</h1>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <p style={{ color: "white" }}>Total Projects: 10</p>
            <p style={{ color: "white" }}>Completed Projects: 7</p>
            <p style={{ color: "white" }}>Pending Projects: 3</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;