import React, { useState } from "react";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles"; // Import useTheme

const ProjectManagementTable = ({
  workorders,
  user,
  setWorkorders,
}) => {
  const theme = useTheme(); // Get the current theme
  const isDarkMode = theme.palette.mode === "dark"; // Check if dark mode is enabled

  const filteredWorkorders = workorders.filter(
    (workorder) => workorder.projectManager === user.email
  );
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const handleEdit = (workorder) => {
    setEditingId(workorder._id);
    setEditedData(workorder);
    setIsEditModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const deleteWorkorder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/workorders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setWorkorders(workorders.filter((workorder) => workorder._id !== id));
      toast.success("Work Order Successfully Deleted", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting the work order:", error);
      toast.error("Failed to delete work order. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/workorders/${id}`,
        editedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const updatedWorkorders = filteredWorkorders.map((workorder) =>
        workorder._id === id ? { ...workorder, ...editedData } : workorder
      );
      setWorkorders(updatedWorkorders);
      setIsEditModalOpen(false);
      setEditingId(null);
      toast.success("Work Order Successfully Updated", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating the work order:", error);
      toast.error("Failed to update work order. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <table
        className="main-table"
        style={{
          backgroundColor: isDarkMode ? "#000" : "#FFF", // Dynamic background color
          color: isDarkMode ? "#FFF" : "#000", // Dynamic text color
          border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Dynamic border
          boxShadow: isDarkMode
            ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
            : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
        }}>
        <thead>
          <tr>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Customer Name</th>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Name</th>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Job Description</th>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Price</th>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Labor Notes</th>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Status</th>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Priority</th>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Deadline</th>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkorders.map((workorder) => (
            <tr key={workorder._id}>
              <td style={{ color: isDarkMode ? "#FFF" : "#000" }}>{workorder.customerName}</td>
              <td style={{ color: isDarkMode ? "#FFF" : "#000" }}>{workorder.name}</td>
              <td style={{ color: isDarkMode ? "#FFF" : "#000" }}>{workorder.jobDescription}</td>
              <td style={{ color: isDarkMode ? "#FFF" : "#000" }}>{formatPrice(workorder.price)}</td>
              <td style={{ color: isDarkMode ? "#FFF" : "#000" }}>{workorder.laborNotes}</td>
              <td style={{ color: isDarkMode ? "#FFF" : "#000" }}>{workorder.status}</td>
              <td style={{ color: isDarkMode ? "#FFF" : "#000" }}>{workorder.priority}</td>
              <td style={{ color: isDarkMode ? "#FFF" : "#000" }}>{new Date(workorder.deadline).toLocaleDateString()}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                <button
                  className="WOAction-button-edit"
                  onClick={() => handleEdit(workorder)}
                  style={{ color: isDarkMode ? "#FFF" : "#000" }} // Dynamic icon color
                >
                  <EditIcon />
                </button>
                <button
                  className="WOAction-button-delete"
                  onClick={() => deleteWorkorder(workorder._id)}
                  style={{ color: isDarkMode ? "#FFF" : "#000" }} // Dynamic icon color
                >
                  <DeleteForeverIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && (
        <Modal
          editedData={editedData}
          handleChange={handleChange}
          handleSave={() => handleSave(editingId)}
          closeModal={() => setIsEditModalOpen(false)}
          isDarkMode={isDarkMode} // Pass isDarkMode to the Modal component
        />
      )}
    </div>
  );
};

export default ProjectManagementTable;
