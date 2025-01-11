import React from "react";
import { Box, Grid, Paper, Typography, Divider } from "@mui/material";
import TopIcons from "./TopIcons"; // Import the TopIcons component
import "../../Styles/App.css"; // Import the CSS file

const Dashboard = ({ user }) => {
  return (
    <Box className="dashboard-container">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h1" component="h1" className="dashboard-header">
          Dashboard
        </Typography>
        <TopIcons />
      </Box>
      <Typography variant="h2" component="h2" className="dashboard-subheader">
        Overview
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
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
            <Typography variant="h6" component="h2">
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
