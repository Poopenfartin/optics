import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HouseIcon from "@mui/icons-material/House";
import EngineeringIcon from "@mui/icons-material/Engineering";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles"; // Import useTheme
import logo from "./assets/images/Optic_Logo.png"; // Import the logo

const UnderlineTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  "&:after": {
    content: '""',
    position: "absolute",
    width: "100%",
    transform: "scaleX(0)",
    height: "2px",
    bottom: 0,
    left: 0,
    backgroundColor: "#00ff08",
    transformOrigin: "bottom right",
    transition: "transform 0.25s ease-out",
  },
  "&:hover:after": {
    transform: "scaleX(1)",
    transformOrigin: "bottom left",
  },
}));

const Sidebar = ({ logout, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme(); // Get the current theme
  const isDarkMode = theme.palette.mode === "dark"; // Check if dark mode is enabled

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarState");
    if (savedState) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("sidebarState", JSON.stringify(newState));
  };

  const menuItems = [
    { text: "Home", icon: <HouseIcon />, link: "/" },
    {
      text: "Project Management",
      icon: <EngineeringIcon />,
      link: "/project-management",
    },
    { text: "Accounts", icon: <SupervisorAccountIcon />, link: "/accounts" },
    { text: "Proposals", icon: <RequestQuoteIcon />, link: "/proposals" },
  ];

  const supportItems = [
    { text: "Settings", icon: <SettingsIcon />, link: "/settings" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        onClick={!isOpen ? toggleSidebar : null} // Add onClick event here
        sx={{
          backgroundColor: isDarkMode ? "#000" : "#FFF", // Dynamic background color
          height: "100vh",
          width: isOpen ? 270 : 60,
          transition: "width 0.3s, background-color 0.3s",
          cursor: !isOpen ? "pointer" : "default",
          "&:hover": {
            backgroundColor: !isOpen ? (isDarkMode ? "#1a1a1a" : "#f0f0f0") : (isDarkMode ? "#000" : "#FFF"), // Dynamic hover background color
            width: !isOpen ? 80 : 270,
            transition: "background-color 0.3s, width 0.3s", // Adjust transition properties
          },
        }}>
        {!isOpen && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}>
            <IconButton
              onClick={toggleSidebar}
              sx={{ color: isDarkMode ? "#FFF" : "#000", padding: "8px", margin: 0 }}> {/* Dynamic icon color */}
              <MenuIcon />
            </IconButton>
          </Box>
        )}
        <Drawer
          variant="persistent"
          open={isOpen}
          sx={{
            width: 270,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 270,
              boxSizing: "border-box",
              backgroundColor: isDarkMode ? "#000" : "#FFF", // Dynamic background color
              overflowY: "auto",
              transition: "background-color 0.3s",
            },
          }}>
          <Box
            sx={{
              padding: "16px 0",
              background: isDarkMode ? "linear-gradient(to bottom, #000, #121212)" : "linear-gradient(to bottom, #FFF, #f0f0f0)", // Dynamic gradient
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: "64px",
              marginBottom: "16px",
            }}>
            <Link
              to="/"
              style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                }}>
                <img
                  src={logo}
                  alt="Optics Logo"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "4px",
                  }}
                />
                <UnderlineTypography
                  variant="h6"
                  component="p"
                  style={{
                    marginLeft: "4px",
                    marginTop: "4px",
                    fontWeight: "700",
                    fontSize: "16px",
                    textAlign: "center",
                    cursor: "pointer",
                    color: isDarkMode ? "#FFF" : "#000", // Dynamic text color
                  }}>
                  Optics
                </UnderlineTypography>
              </Box>
            </Link>
            <IconButton
              onClick={toggleSidebar}
              sx={{ color: isDarkMode ? "#FFF" : "#000", padding: "4px", marginRight: 1 }}> {/* Dynamic icon color */}
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "16px",
              backgroundColor: isDarkMode ? "#000" : "#FFF", // Dynamic background color
              color: isDarkMode ? "#FFF" : "#000", // Dynamic text color
            }}>
            <Link to="/profile-page">
              <img
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=826&t=st=1719374252~exp=1719374852~hmac=384d89c4c305fabcd0e40764416da0985d75085f7c38963ef024b12944d7975f"
                alt="User Avatar"
                className="profile-picture-sidebar"
              />
            </Link>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                position: "relative",
              }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  component="p"
                  style={{ margin: 0, color: isDarkMode ? "#FFF" : "#000", fontWeight: "600" }}> {/* Dynamic text color */}
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ margin: 0, color: "#00ff08", fontWeight: "600", letterSpacing: "1px" }}> {/* Keep accent color */}
                  {user?.jobTitle}
                </Typography>
              </Box>
            </Box>
          </Box>

          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.text}>
                <ListItem
                  data-button="true"
                  component={Link}
                  to={item.link}
                  sx={{
                    borderLeft:
                      location.pathname === item.link
                        ? "4px solid #00ff00"
                        : "none",
                    color: location.pathname === item.link ? "#00ff00" : (isDarkMode ? "#FFF" : "#000"), // Dynamic text color
                    cursor: "pointer",
                    "&:hover": { backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f0f0" }, // Dynamic hover background color
                  }}>
                  <ListItemIcon
                    sx={{
                      color:
                        location.pathname === item.link ? "#00ff00" : (isDarkMode ? "#FFF" : "#000"), // Dynamic icon color
                    }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="body1" fontWeight="600" fontSize="15px">{item.text}</Typography>} />
                </ListItem>
                {index < menuItems.length - 1 && (
                  <Divider sx={{ backgroundColor: isDarkMode ? "#333" : "#e0e0e0" }} /> // Dynamic divider color
                )}
              </React.Fragment>
            ))}
          </List>

          {/* Support Section */}
          <Box sx={{ marginTop: "auto" }}>
            <Typography
              variant="body2"
              sx={{
                padding: "16px 16px 8px 16px",
                color: isDarkMode ? "#FFF" : "#000", // Dynamic text color
                fontWeight: "600",
              }}>
              Support
            </Typography>
            <List>
              {supportItems.map((item, index) => (
                <React.Fragment key={item.text}>
                  <ListItem
                    data-button="true"
                    component={Link}
                    to={item.link}
                    sx={{
                      borderLeft:
                        location.pathname === item.link
                          ? "4px solid #00ff00"
                          : "none",
                      color: location.pathname === item.link ? "#00ff00" : (isDarkMode ? "#FFF" : "#000"), // Dynamic text color
                      cursor: "pointer",
                      "&:hover": { backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f0f0" }, // Dynamic hover background color
                    }}>
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === item.link ? "#00ff00" : (isDarkMode ? "#FFF" : "#000"), // Dynamic icon color
                      }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="body1" fontWeight="600" fontSize="15px">{item.text}</Typography>} />
                  </ListItem>
                  {index < supportItems.length - 1 && (
                    <Divider sx={{ backgroundColor: isDarkMode ? "#333" : "#e0e0e0" }} /> // Dynamic divider color
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>

          <Button
            onClick={logout}
            sx={{
              width: "100%",
              backgroundColor: "#ff4444",
              color: "#FFF",
              "&:hover": { backgroundColor: "#ff0000" },
              borderRadius: 0,
            }}>
            Logout
          </Button>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;