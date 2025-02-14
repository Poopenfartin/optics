import React from "react";
import { Box, IconButton, Avatar, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTheme } from "@mui/material/styles";

const TopIcons = ({ user }) => {
  const theme = useTheme(); // Get the current theme
  const isDarkMode = theme.palette.mode === "dark"; // Check if dark mode is enabled

  return (
    <Box
      className="top-bar"
      sx={{
        width: "100vw", // Span the entire viewport width
        height: "60px", // Set the height of the bar
        backgroundColor: isDarkMode ? "#121212" : "#f5f5f5", // Dynamic background color
        borderBottom: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Dynamic border
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px", // Add padding to the sides
        boxShadow: isDarkMode
          ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
          : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
        position: "fixed", // Fix the bar to the top
        top: 0, // Position at the top
        left: 0, // Align to the left edge
        zIndex: 1000, // Ensure it stays above other content
      }}
    >
      {/* Left Side: Profile Picture and Username */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px", // Add spacing between the profile picture and username
        }}
      >
        {/* Profile Picture */}
        <Avatar
          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=826&t=st=1719374252~exp=1719374852~hmac=384d89c4c305fabcd0e40764416da0985d75085f7c38963ef024b12944d7975f"
          alt="User Avatar"
          sx={{
            width: "40px",
            height: "40px",
            border: "2px solid #00ff08", // Add a border around the profile picture
          }}
        />

        {/* Username */}
        <Typography
          variant="body1"
          sx={{
            color: isDarkMode ? "#FFF" : "#000", // Dynamic text color
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          {user ? `${user.firstName} ${user.lastName}` : "Guest"}
        </Typography>
      </Box>

      {/* Right Side: Notifications Button */}
      <Box>
        <IconButton
          sx={{
            color: isDarkMode ? "#FFF" : "#000", // Dynamic icon color
          }}
        >
          <NotificationsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopIcons;