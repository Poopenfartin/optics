import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "../../Styles/App.css";
import SearchComponent from "../components/SearchComponent";

const ProfilePage = ({ user }) => {
  return (
    <Box className="profile-container">
      <Box sx={{ display: "flex", flexDirection: "column", ml: -0.5, mb: -1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4" component="h1" className="profile-header" sx={{ fontSize: "1rem", color: "white" }}>
          </Typography>
        </Box>
        <Box className="top-profile-page" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=826&t=st=1719374252~exp=1719374852~hmac=384d89c4c305fabcd0e40764416da0985d75085f7c38963ef024b12944d7975f"
            alt="User Avatar"
            className="profile-picture-sidebar"
          />
          <Typography variant="h6" sx={{ fontSize: "20px", color: "white" }}>
            HUGE NUTSACK
          </Typography>
          <Typography className="profile-page-users-name" sx={{ alignSelf: 'flex-start', textAlign: 'left' }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="h4" sx={{ fontSize: "20px", color: "white", alignSelf: 'flex-start', textAlign: 'left' }}>
            {user.email}
          </Typography>
          <Typography variant="h4" sx={{ fontSize: "20px", color: "white", alignSelf: 'flex-start', textAlign: 'left' }}>
            User info:
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;



