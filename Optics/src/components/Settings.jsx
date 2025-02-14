import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useTheme } from "@mui/material/styles";

const Settings = ({ toggleDarkMode, darkMode }) => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const theme = useTheme();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderRadius: "8px",
        boxShadow: theme.shadows[3],
        marginTop: "60px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Settings
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "8px",
          }}
        >
          <Typography variant="body1">Toggle Dark Mode</Typography>
          <IconButton onClick={toggleDarkMode} sx={{ color: theme.palette.text.primary }}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "8px",
          }}
        >
          <Typography variant="body1">Toggle Fullscreen</Typography>
          <IconButton onClick={toggleFullScreen} sx={{ color: theme.palette.text.primary }}>
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;