import React from "react";
import { Box, Grid, Paper, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles"; 
import "../../Styles/App.css";

const Dashboard = ({ user }) => {
  const theme = useTheme(); 
  return (
    <Box className="dashboard-container">
      <Box sx={{ display: "flex", flexDirection: "column", ml: -0.5, mb: -1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* prettier-ignore */}
          <Typography variant="h4" component="h1" className="dashboard-header" sx={{ fontSize: "1rem", color: "white" }}>Dashboard</Typography>
        </Box>
      </Box>

      {/* prettier-ignore */}
      <Typography variant="h2" component="h2" className="dashboard-subheader" sx={{ marginLeft: "-0.15rem", color: "white" }}>Overview</Typography>
      <Divider sx={{ mb: 6, ml: 2, mr: 2 }} />

      <Grid container spacing={2}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper className="dashboard-paper">
            {/* prettier-ignore */}
            <Typography className="h2" sx={{ color: "white" }}>Welcome, {user?.firstName} {user?.lastName}</Typography>
            {/* prettier-ignore */}
            <Typography variant="body1" sx={{ color: "white" }}>Here is your dashboard overview.</Typography>
          </Paper>
        </Grid>

        {/* Statistics Section */}
        <Grid item xs={12} md={6}>
          <Paper className="dashboard-paper">
            {/* prettier-ignore */}
            <Typography variant="h6" component="h2" sx={{ color: "white" }}>Active Projects</Typography>
            {/* prettier-ignore */}
            <Typography variant="h4" component="p" sx={{ color: "white" }}>5</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="dashboard-paper">
            {/* prettier-ignore */}
            <Typography variant="h6" component="h2" sx={{ color: "white" }}>Pending Work Orders</Typography>
            {/* prettier-ignore */}
            <Typography variant="h4" component="p" sx={{ color: "white" }}>12</Typography>
          </Paper>
        </Grid>

        {/* Recent Activities Section */}
        <Grid item xs={12}>
          <Paper className="dashboard-paper">
            {/* prettier-ignore */}
            <Typography variant="h6" component="h2" sx={{ color: "white" }}>Recent Activities</Typography>
            {/* prettier-ignore */}
            <Typography variant="body1" sx={{ color: "white" }}>- Project X: New work order created.</Typography>
            {/* prettier-ignore */}
            <Typography variant="body1" sx={{ color: "white" }}>- Project Y: Completed milestone 3.</Typography>
            {/* prettier-ignore */}
            <Typography variant="body1" sx={{ color: "white" }}>- Project Z: Proposal sent to client.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
