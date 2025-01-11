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
    <Box className="top-icons-container">
      <IconButton className="fullscreen-icon" onClick={toggleFullScreen} color="inherit">
        {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
      <IconButton className="settings-icon" color="inherit">
        <SettingsIcon />
      </IconButton>
    </Box>
  );
};

export default TopIcons;
