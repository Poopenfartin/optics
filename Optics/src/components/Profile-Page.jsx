import React from "react";
import Box from "@mui/material/Box";
import "../../Styles/App.css";
import SearchComponent from "../components/SearchComponent";
import { useTheme } from "@mui/material/styles";

const ProfilePage = ({ user }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box className="profile-container" data-theme={isDarkMode ? "dark" : "light"}>
      <Box sx={{ display: "flex", flexDirection: "row", ml: -0.5, mb: -1, gap: 2 }}>
        {/* Left Box: User Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            backgroundColor: isDarkMode ? "#000" : "#fff",
            padding: 3, // Increased padding for better spacing
            borderRadius: 2,
            alignItems: "center", // Center content horizontally
            color: isDarkMode ? "#fff" : "#000", // Dynamic text color
            border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Subtle border for both modes
            boxShadow: isDarkMode
              ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
              : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
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
            backgroundColor: isDarkMode ? "#000" : "#fff",
            padding: 3, // Increased padding for better spacing
            borderRadius: 2,
            color: isDarkMode ? "#fff" : "#000", // Dynamic text color
            border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Subtle border for both modes
            boxShadow: isDarkMode
              ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
              : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
          }}
        >
          <h1 className="profile-h1">Overview</h1>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <p className="overview-text">Total Projects: 10</p>
            <p className="overview-text">Completed Projects: 7</p>
            <p className="overview-text">Pending Projects: 3</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
