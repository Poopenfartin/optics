import React from "react";
import { Box, Grid, Paper, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "../../Styles/App.css";

const Dashboard = ({ user }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box className="dashboard-container" data-theme={isDarkMode ? "dark" : "light"}>
      {/* Dashboard Header */}
      <Box sx={{ display: "flex", flexDirection: "column", ml: -0.5, mb: -1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <h1 className="dashboard-header" style={{ fontSize: "1rem", color: isDarkMode ? "#fff" : "#000" }}>
            Dashboard
          </h1>
        </Box>
      </Box>

      {/* Dashboard Subheader */}
      <h2 className="dashboard-subheader" style={{ marginLeft: "5.1rem", color: isDarkMode ? "#fff" : "#000", marginBottom: "2rem" }}>
        Overview
      </h2>
      <Divider sx={{ mb: 6, ml: 2, mr: 2 }} />

      {/* Grid Layout for Sections */}
      <Grid container spacing={3} sx={{ padding: "0 2rem" }}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: isDarkMode ? "#000" : "#fff",
              borderRadius: 2,
              textAlign: "center", // Center align content
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Subtle border for both modes
              boxShadow: isDarkMode
                ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
                : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
            }}
          >
            <h2 style={{ color: isDarkMode ? "#fff" : "#000", marginBottom: "8px", fontSize: "1.5rem" }}>
              Welcome, {user?.firstName} {user?.lastName}
            </h2>
            <p style={{ color: isDarkMode ? "#fff" : "#000", margin: 0 }}>Here is your dashboard overview.</p>
          </Paper>
        </Grid>

        {/* Statistics Section */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: isDarkMode ? "#000" : "#fff",
              borderRadius: 2,
              height: "300px", // Fixed height for square shape
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Subtle border for both modes
              boxShadow: isDarkMode
                ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
                : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
            }}
          >
            <h3 style={{ color: isDarkMode ? "#fff" : "#000", marginBottom: "16px" }}>Active Projects</h3>
            <p style={{ color: isDarkMode ? "#fff" : "#000", fontSize: "2rem", margin: 0 }}>5</p>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: isDarkMode ? "#000" : "#fff",
              borderRadius: 2,
              height: "300px", // Fixed height for square shape
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Subtle border for both modes
              boxShadow: isDarkMode
                ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
                : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
            }}
          >
            <h3 style={{ color: isDarkMode ? "#fff" : "#000", marginBottom: "16px" }}>Pending Work Orders</h3>
            <p style={{ color: isDarkMode ? "#fff" : "#000", fontSize: "2rem", margin: 0 }}>12</p>
          </Paper>
        </Grid>

        {/* Additional Boxes for Future Components */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: isDarkMode ? "#000" : "#fff",
              borderRadius: 2,
              height: "300px", // Fixed height for square shape
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Subtle border for both modes
              boxShadow: isDarkMode
                ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
                : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
            }}
          >
            <h3 style={{ color: isDarkMode ? "#fff" : "#000", marginBottom: "16px" }}>Graph Placeholder</h3>
            <p style={{ color: isDarkMode ? "#fff" : "#000", fontSize: "2rem", margin: 0 }}>📊</p>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: isDarkMode ? "#000" : "#fff",
              borderRadius: 2,
              height: "300px", // Fixed height for square shape
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Subtle border for both modes
              boxShadow: isDarkMode
                ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
                : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
            }}
          >
            <h3 style={{ color: isDarkMode ? "#fff" : "#000", marginBottom: "16px" }}>Calendar Placeholder</h3>
            <p style={{ color: isDarkMode ? "#fff" : "#000", fontSize: "2rem", margin: 0 }}>📅</p>
          </Paper>
        </Grid>

        {/* Recent Activities Section */}
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: isDarkMode ? "#000" : "#fff",
              borderRadius: 2,
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Subtle border for both modes
              boxShadow: isDarkMode
                ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
                : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
            }}
          >
            <h3 style={{ color: isDarkMode ? "#fff" : "#000", marginBottom: "16px" }}>Recent Activities</h3>
            <ul style={{ color: isDarkMode ? "#fff" : "#000", paddingLeft: "20px", margin: 0 }}>
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