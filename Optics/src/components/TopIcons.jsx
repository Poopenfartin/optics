import React from "react";
import { Box, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import SettingsIcon from "@mui/icons-material/Settings";
import OpticsLogo from "../assets/images/Optic_Logo.png";

const TopIcons = ({ isFullScreen, toggleFullScreen }) => {
  return (
    <Box
      className="top-icons-container"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        padding: 1,
        borderRadius: 2,
        position: "relative",
        zIndex: 1000,
        width: "100%",
        top: 0,
        marginBottom: "50px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginRight: "auto", flexGrow: 1, justifyContent: "center" }}>
        <img src={OpticsLogo} alt="Optics Logo" style={{ marginRight: "10px", width: "50px", height: "50px" }} />
        <h1 style={{ margin: 0, color: '#00ff08', letterSpacing: "3px", fontSize: "28px", marginTop: "4px" }}>OPTICS</h1>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton className="fullscreen-icon" onClick={toggleFullScreen} sx={{ color: "#FFF" }}>
          {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        <IconButton className="settings-icon" sx={{ color: "#FFF" }}>
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopIcons;
