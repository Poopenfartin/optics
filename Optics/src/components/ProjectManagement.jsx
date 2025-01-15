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
        toast.error("Failed to fetch work orders. Please try again.", {
          autoClose: 3000,
        });
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

  return (
    <div className="hide-scrollbar">
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
            <Tab label="Proposals" />
            <Tab label="Accounts" />
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
    </div>
  );
};

export default ProjectManagement;
