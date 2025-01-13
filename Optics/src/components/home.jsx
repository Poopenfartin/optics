// Dashboard.jsx
import React from "react";
import { Box, Grid, Paper, Typography, Divider } from "@mui/material";
import TopIcons from "./TopIcons"; // Import the TopIcons component
import "../../Styles/App.css";

const Dashboard = ({ user }) => {
  return (
    <Box className="dashboard-container">
      <Box sx={{ display: "flex", flexDirection: "column", ml: -.5, mb: -1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2}}>
          <Typography variant="h4" component="h1" className="dashboard-header" sx={{ fontSize: "1rem" }}>
            Dashboard
          </Typography>
        </Box>
        <TopIcons />
      </Box>

      <Typography variant="h2" component="h2" className="dashboard-subheader" sx={{ marginLeft: "-0.15rem" }}>
        Overview
      </Typography>
      <Divider sx={{ mb: 6, ml: 2, mr: 2 }} />

      <Grid container spacing={2}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper className="dashboard-paper">
            <Typography className="h2">
              Welcome, {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body1">
              Here is your dashboard overview.
            </Typography>
          </Paper>
        </Grid>

        {/* Statistics Section */}
        <Grid item xs={12} md={6}>
          <Paper className="dashboard-paper">
            <Typography variant="h6" component="h2">
              Active Projects
            </Typography>
            <Typography variant="h4" component="p">
              5
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="dashboard-paper">
            <Typography
              variant="h6"
              component="h2"
            >
              Pending Work Orders
            </Typography>
            <Typography variant="h4" component="p">
              12
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Activities Section */}
        <Grid item xs={12}>
          <Paper className="dashboard-paper">
            <Typography variant="h6" component="h2">
              Recent Activities
          </Typography>
          <Typography variant="body1">
            - Project X: New work order created.
          </Typography>
          <Typography variant="body1">
            - Project Y: Completed milestone 3.
          </Typography>
          <Typography variant="body1">
            - Project Z: Proposal sent to client.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
 );
};

export default Dashboard;



