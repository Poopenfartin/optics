import React, { useState, useEffect } from "react";
import axios from "axios";
import TopIcons from "./TopIcons";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/App.css";
import SearchInput from "../components/SearchComponent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProjectManagementTable from "./subComponents/ProjectMangementTable";
import AddWorkOrderModal from "./AddWorkOrderModal";

const ProjectManagement = ({ user }) => {
  const [workorders, setWorkorders] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchWorkorders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/workorders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setWorkorders(response.data);
      } catch (error) {
        console.error("Error fetching work orders:", error);
      }
    };

    fetchWorkorders();

    const container = document.querySelector(".hide-scrollbar");
    if (container) {
      container.style.scrollBehavior = "smooth";
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const addWorkorder = async (newWorkorder) => {
    try {
      const response = await axios.post("http://localhost:5000/api/workorders", newWorkorder, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      // Append the new work order with the unique ID from the response
      setWorkorders([...workorders, response.data]);
      toast.success("Work Order Successfully Added");
    } catch (error) {
      console.error("Error adding the work order:", error);
      toast.error("Failed to add work order. Please try again.");
    } finally {
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="hide-scrollbar">
      <TopIcons />
      <div className="table-container">
        <h1 className="page-header">Project Management</h1>
        <h2 className="page-subheader">Overview</h2>
        <div className="tabs-container">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            TabIndicatorProps={{ style: { backgroundColor: "#00ff08" } }}
            textColor="inherit"
            sx={{
              "& .MuiTabs-flexContainer": { justifyContent: "flex-start" },
              "& .MuiTab-root": { color: "white" },
              "& .Mui-selected": { color: "#00ff08" },
            }}
          >
            <Tab label="Project Manage" />
            <Tab label="Estimator" />
            <Tab label="Test tab" />
            <Tab label="Bonnie" />
          </Tabs>
        </div>
        <div className="workorder-functions">
          <SearchInput placeholder="Input Work Order Number..." width="80%" />
          <Button
            variant="contained"
            color="primary"
            className="add-work-order-button"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Work Order
          </Button>
        </div>
      </div>
      <ProjectManagementTable
        workorders={workorders}
        user={user}
        setWorkorders={setWorkorders}
      />
      {isAddModalOpen && (
        <AddWorkOrderModal
          isOpen={isAddModalOpen}
          closeModal={() => setIsAddModalOpen(false)}
          addWorkorder={addWorkorder}
          user={user}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ProjectManagement;
