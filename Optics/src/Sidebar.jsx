import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HouseIcon from "@mui/icons-material/House";
import EngineeringIcon from "@mui/icons-material/Engineering";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { Link } from "react-router-dom";

const Sidebar = ({ logout, user }) => {

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 270,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 270,
          boxSizing: "border-box",
          backgroundColor: "#1f2a40",
          overflowY: "auto", // Ensure the sidebar handles its own scrolling
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "0px", margin: "25px 35px 15px 35px", backgroundColor: "#1f2a40", color: "#FFF" }}>
        <Typography variant="h6" component="p" style={{ marginLeft: '10px', fontWeight: '700', fontSize: '16px', textAlign: "center", cursor: 'pointer'}}>Optics</Typography>
        <MenuIcon style={{ fontSize: '22px', margin: "0px 10px 0px 0px", cursor: 'pointer' }} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px", backgroundColor: "#1f2a40", color: "#FFF" }}>
        <img src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=826&t=st=1719374252~exp=1719374852~hmac=384d89c4c305fabcd0e40764416da0985d75085f7c38963ef024b12944d7975f" alt="Website Logo" style={{ width: "100px", height: "100px", marginBottom: "8px", borderRadius: "50%" }} />
        <Typography variant="h6" component="p" style={{ margin: 0 }}>{user?.firstName} {user?.lastName}</Typography> {/* Dynamic user name */}
        <Typography variant="body2" component="p" style={{ margin: 0, color: '#00ff08' }}>{user?.jobTitle}</Typography> {/* Dynamic job title */}
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

      {/* Add the logout button at the bottom */}
      <Box sx={{ flexGrow: 1 }}></Box> {/* Spacer to push the logout button to the bottom */}
      <Button 
        onClick={logout} 
        sx={{ width: '100%', backgroundColor: '#ff4444', color: '#FFF', '&:hover': { backgroundColor: '#ff0000' }, borderRadius: 0 }}
      >
        Logout
      </Button>
    </Drawer>
  );
};

export default Sidebar;
