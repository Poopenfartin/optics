// TopIcons.jsx (Ensure you have the correct filename)
import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import "../../Styles/App.css"; // Import the CSS file

const TopIcons = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <Box 
      className="top-icons-container"
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1,
        backgroundColor: "#121a2f",
        padding: 1,
        borderRadius: 2
      }}>
      <IconButton className="fullscreen-icon" onClick={toggleFullScreen} sx={{ color: "#FFFFFF" }}>
        {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
      <IconButton className="settings-icon" sx={{ color: "#FFFFFF" }}>
        <SettingsIcon />
      </IconButton>
    </Box>
  );
};

export default TopIcons;

