import React from "react";
import { Box, Grid, Paper, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "../../Styles/App.css";

const Dashboard = ({ user }) => {
  const theme = useTheme();

  return (
    <Box className="dashboard-container">
      <Box sx={{ display: "flex", flexDirection: "column", ml: -0.5, mb: -1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Dashboard Header */}
          <h1 className="dashboard-header" style={{ fontSize: "1rem", color: "white" }}>
            Dashboard
          </h1>
        </Box>
      </Box>

      {/* Dashboard Subheader */}
      <h2 className="dashboard-subheader" style={{ marginLeft: "5.1rem", color: "white" }}>
        Overview
      </h2>
      <Divider sx={{ mb: 6, ml: 2, mr: 2 }} />

      {/* Grid Layout for Sections */}
      <Grid container spacing={2}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper
            className="dashboard-paper"
            sx={{
              padding: 3,
              backgroundColor: "#2c2c2c",
              borderRadius: 2,
              textAlign: "center", // Center align content
            }}
          >
            <h2 style={{ color: "white", marginBottom: "8px" }}>
              Welcome, {user?.firstName} {user?.lastName}
            </h2>
            <p style={{ color: "white", margin: 0 }}>Here is your dashboard overview.</p>
          </Paper>
        </Grid>

        {/* Statistics Section */}
        <Grid item xs={12} md={6}>
          <Paper
            className="dashboard-paper"
            sx={{
              padding: 3,
              backgroundColor: "#2c2c2c",
              borderRadius: 2,
              height: "300px", // Fixed height for square shape
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
            }}
          >
            <h3 style={{ color: "white", marginBottom: "16px" }}>Active Projects</h3>
            <p style={{ color: "white", fontSize: "2rem", margin: 0 }}>5</p>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            className="dashboard-paper"
            sx={{
              padding: 3,
              backgroundColor: "#2c2c2c",
              borderRadius: 2,
              height: "300px", // Fixed height for square shape
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
            }}
          >
            <h3 style={{ color: "white", marginBottom: "16px" }}>Pending Work Orders</h3>
            <p style={{ color: "white", fontSize: "2rem", margin: 0 }}>12</p>
          </Paper>
        </Grid>

        {/* Additional Boxes for Future Components */}
        <Grid item xs={12} md={6}>
          <Paper
            className="dashboard-paper"
            sx={{
              padding: 3,
              backgroundColor: "#2c2c2c",
              borderRadius: 2,
              height: "300px", // Fixed height for square shape
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
            }}
          >
            <h3 style={{ color: "white", marginBottom: "16px" }}>Graph Placeholder</h3>
            <p style={{ color: "white", fontSize: "2rem", margin: 0 }}>📊</p>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            className="dashboard-paper"
            sx={{
              padding: 3,
              backgroundColor: "#2c2c2c",
              borderRadius: 2,
              height: "300px", // Fixed height for square shape
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
            }}
          >
            <h3 style={{ color: "white", marginBottom: "16px" }}>Calendar Placeholder</h3>
            <p style={{ color: "white", fontSize: "2rem", margin: 0 }}>📅</p>
          </Paper>
        </Grid>

        {/* Recent Activities Section */}
        <Grid item xs={12}>
          <Paper
            className="dashboard-paper"
            sx={{
              padding: 3,
              backgroundColor: "#2c2c2c",
              borderRadius: 2,
            }}
          >
            <h3 style={{ color: "white", marginBottom: "16px" }}>Recent Activities</h3>
            <ul style={{ color: "white", paddingLeft: "20px", margin: 0 }}>
              <li>Project X: New work order created.</li>
              <li>Project Y: Completed milestone 3.</li>
              <li>Project Z: Proposal sent to client.</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;