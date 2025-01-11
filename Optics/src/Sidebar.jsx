import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HouseIcon from "@mui/icons-material/House";
import EngineeringIcon from "@mui/icons-material/Engineering";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { Link } from "react-router-dom";

const Sidebar = ({ logout, user }) => {
  const [isOpen, setIsOpen] = useState(false); // Default to closed

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ backgroundColor: "#1f2a40", height: "100vh", width: isOpen ? 270 : 60, transition: "width 0.3s" }}>
        {!isOpen && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <IconButton onClick={toggleSidebar} sx={{ color: "#FFF" }}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}
        <Drawer
          variant="persistent" // Set to persistent
          open={isOpen}
          onClose={toggleSidebar}
          ModalProps={{
            BackdropProps: {
              style: {
                backgroundColor: "transparent"
              }
            }
          }}
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
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "0px", margin: "25px 35px 15px 35px", backgroundColor: "#1f2a40", color: "#FFF" }}>
            <Typography variant="h6" component="p" style={{ marginLeft: '10px', fontWeight: '700', fontSize: '16px', textAlign: "center", cursor: 'pointer' }}>Optics</Typography>
            <IconButton onClick={toggleSidebar} sx={{ color: "#FFF" }}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px", backgroundColor: "#1f2a40", color: "#FFF" }}>
            <img src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=826&t=st=1719374252~exp=1719374852~hmac=384d89c4c305fabcd0e40764416da0985d75085f7c38963ef024b12944d7975f" alt="Website Logo" style={{ width: "100px", height: "100px", marginBottom: "8px", borderRadius: "50%" }} />
            <Typography variant="h6" component="p" style={{ margin: 0 }}>{user?.firstName} {user?.lastName}</Typography>
            <Typography variant="body2" component="p" style={{ margin: 0, color: '#00ff08' }}>{user?.jobTitle}</Typography>
          </Box>

          <List>
            {[
              { text: "Home", icon: <HouseIcon />, link: "/" },
              { text: "Project Management", icon: <EngineeringIcon />, link: "/project-management" },
              { text: "Proposals", icon: <RequestQuoteIcon />, link: "/proposals" },
              { text: "Buildings", icon: <LocationCityIcon />, link: "/buildings" }
            ].map((item) => (
              <ListItem button component={Link} to={item.link} key={item.text} sx={{ backgroundColor: "#1f2a40", color: "#FFF", cursor: 'pointer' }}>
                <ListItemIcon sx={{ color: "#FFF" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          <Box sx={{ flexGrow: 1 }}></Box>
          <Button 
            onClick={logout} 
            sx={{ width: '100%', backgroundColor: '#ff4444', color: '#FFF', '&:hover': { backgroundColor: '#ff0000' }, borderRadius: 0 }}
          >
            Logout
          </Button>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
