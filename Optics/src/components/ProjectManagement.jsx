import React, { useState, useEffect } from "react";
import axios from "axios";
import TopIcons from "./TopIcons";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "../../Styles/App.css";
import SearchInput from "../components/SearchComponent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProjectManagementTable from "./subComponents/ProjectMangementTable";
import AddWorkOrderModal from "./modals/AddWorkOrderModal";
import Spinner from "./Spinner"; // Import the Spinner component
import { useTheme } from "@mui/material/styles"; // Import useTheme

const ProjectManagement = ({ user }) => {
  const [workorders, setWorkorders] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [sidebarOpen, setSidebarOpen] = useState(JSON.parse(localStorage.getItem("sidebarState"))); // State to track the sidebar status
  const theme = useTheme(); // Get the current theme
  const isDarkMode = theme.palette.mode === "dark"; // Check if dark mode is enabled

  useEffect(() => {
    const fetchWorkorders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/workorders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setWorkorders(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching work orders:", error);
        toast.error("Failed to fetch work orders. Please try again.", {
          autoClose: 3000,
        });
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchWorkorders();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const addWorkorder = async (newWorkorder) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/workorders",
        newWorkorder,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setWorkorders([...workorders, response.data]);
      toast.success("Work Order Successfully Added", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error adding the work order:", error);
      toast.error("Failed to add work order. Please try again.", {
        autoClose: 3000,
      });
    } finally {
      setIsAddModalOpen(false);
    }
  };

  const updateSidebarState = () => {
    const sidebarState = JSON.parse(localStorage.getItem("sidebarState"));
    setSidebarOpen(sidebarState);
  };

  useEffect(() => {
    window.addEventListener('storage', updateSidebarState);
    return () => {
      window.removeEventListener('storage', updateSidebarState);
    };
  }, []);

  useEffect(() => {
    updateSidebarState();
  }, [sidebarOpen]);

  if (loading) {
    return <Spinner sidebarOpen={sidebarOpen} />;
  }

  return (
    <div
      className="hide-scrollbar"
      style={{ overflowY: "auto", overflowX: "hidden" }}>
      <div
        className="main-table-container"
        style={{
          backgroundColor: isDarkMode ? "#000" : "#FFF", // Dynamic background color
          color: isDarkMode ? "#FFF" : "#000", // Dynamic text color
          padding: "60px 20px 20px 20px",
          borderRadius: "8px",
          border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Dynamic border
          boxShadow: isDarkMode
            ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
            : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
            marginTop:  "60px",
        }}>
        <h1 className="page-header" style={{ color: isDarkMode ? "#FFF" : "#000" }}>Project Management</h1>
        <h2 className="page-subheader">OVERVIEW</h2>
        <div className="tabs-container">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            TabIndicatorProps={{ style: { backgroundColor: "#00ff08" } }}
            textColor="inherit"
            sx={{
              "& .MuiTabs-flexContainer": { justifyContent: "flex-start" },
              "& .MuiTab-root": { color: isDarkMode ? "#FFF" : "#000" }, // Dynamic tab text color
              "& .Mui-selected": { color: "#00ff08" },
            }}>
            <Tab label="Project Manage" />
            <Tab label="Estimator" />
            <Tab label="Test tab" />
            <Tab label="Proposals" />
            <Tab label="Accounts" />
          </Tabs>
        </div>
        <div className="main-table-functions">
          <SearchInput placeholder="Input Work Order Number..." width="80%" />
          <Button
            variant="contained"
            color="primary"
            className="add-button"
            onClick={() => setIsAddModalOpen(true)}>
            Add Work Order
          </Button>
        </div>
      </div>
      <ProjectManagementTable
        workorders={workorders}
        user={user}
        setWorkorders={setWorkorders}
        isDarkMode={isDarkMode} // Pass isDarkMode to the table component
      />
      {isAddModalOpen && (
        <AddWorkOrderModal
          isOpen={isAddModalOpen}
          closeModal={() => setIsAddModalOpen(false)}
          addWorkorder={addWorkorder}
          user={user}
        />
      )}
    </div>
  );
};

export default ProjectManagement;