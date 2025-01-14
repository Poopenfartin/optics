import React from "react";
import { Box, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import SettingsIcon from "@mui/icons-material/Settings";
import OpticsLogo from "../assets/images/Optic_Logo.png";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// Define the styled component with hover underline effect
const UnderlineTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  fontFamily: "'Source Sans Pro', sans-serif", // Set the font family
  fontWeight: '550', // Set the font weight to bold (you can adjust this value to make it heavier)
  "&:after": {
    content: '""',
    position: "absolute",
    width: "100%",
    transform: "scaleX(0)",
    height: "2px",
    bottom: 0,
    left: 0,
    backgroundColor: "#FFF",
    transformOrigin: "bottom right",
    transition: "transform 0.25s ease-out",
  },
  "&:hover:after": {
    transform: "scaleX(1)",
    transformOrigin: "bottom left",
    
  },
}));

const TopIcons = ({ isFullScreen, toggleFullScreen }) => {
  return (
    <Box
      className="top-icons-container"
      sx={{
        display: "flex",
        cursor: 'pointer', 
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
        <UnderlineTypography variant="h1" sx={{ margin: 0, color: '#00ff08', letterSpacing: "3px", fontSize: "28px", marginTop: "4px" }}>
          OPTICS
        </UnderlineTypography>
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
