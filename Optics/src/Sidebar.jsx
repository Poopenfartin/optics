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
import LocationCityIcon from "@mui/icons-material/LocationCity";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        onClick={!isOpen ? toggleSidebar : null} // Add onClick event here
        sx={{
          backgroundColor: "#1f2a40",
          height: "100vh",
          width: isOpen ? 270 : 60,
          transition: "width 0.3s, background-color 0.3s",
          cursor: !isOpen ? "pointer" : "default",
          "&:hover": {
            backgroundColor: !isOpen ? "#2b344a" : "#1f2a40",
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
              sx={{ color: "#FFF", padding: "8px", margin: 0 }}>
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
              backgroundColor: "#1f2a40",
              overflowY: "auto",
              transition: "background-color 0.3s",
            },
          }}>
          <Box
            sx={{
              padding: "16px 0",
              background: "linear-gradient(to bottom, #1f2a40, #121a2f)",
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
                    color: "#FFF",
                  }}>
                  Optics
                </UnderlineTypography>
              </Box>
            </Link>
            <IconButton
              onClick={toggleSidebar}
              sx={{ color: "#FFF", padding: "4px", marginRight: 1 }}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "16px",
              backgroundColor: "#1f2a40",
              color: "#FFF",
            }}>
            <Link to ="/profile-page">
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
                  style={{ margin: 0 }}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ margin: 0, color: "#00ff08" }}>
                  {user?.jobTitle}
                </Typography>
              </Box>
              <IconButton
                sx={{
                  color: "#FFF",
                  position: "absolute",
                  right: 0,
                  padding: 0,
                  margin: 0,
                }}>
                <NotificationsIcon />
              </IconButton>
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
                    color: location.pathname === item.link ? "#00ff00" : "#FFF",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#1f2a39" },
                  }}>
                  <ListItemIcon
                    sx={{
                      color:
                        location.pathname === item.link ? "#00ff00" : "#FFF",
                    }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
                {index < menuItems.length - 1 && (
                  <Divider sx={{ backgroundColor: "#000", opacity: "10%" }} />
                )}
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ flexGrow: 1 }}></Box>
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
