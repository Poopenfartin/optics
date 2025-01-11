import React, { useState } from "react";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "./Modal";
import AddWorkOrderModal from "./AddWorkOrderModal"; // Import AddWorkOrderModal
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectManagementTable = ({
  workorders,
  deleteWorkorder,
  user,
  setWorkorders,
}) => {
  const filteredWorkorders = workorders.filter(
    (workorder) => workorder.projectManager === user.email
  );
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for add modal

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleEdit = (workorder) => {
    setEditingId(workorder._id);
    setEditedData(workorder);
    setIsEditModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
      notifySuccess("Work Order Successfully Updated");
    } catch (error) {
      console.error("There was an error updating the work order:", error);
      notifyError("Failed to update work order. Please try again.");
    }
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
      setWorkorders([...filteredWorkorders, response.data]);
      notifySuccess("Work Order Successfully Added");
    } catch (error) {
      console.error("There was an error adding the work order:", error);
      notifyError("Failed to add work order. Please try again.");
    }
  };

  return (
    <div>
      <h1>Project Management</h1>
      <h2>WORK ORDERS</h2>
      <div className="workorder-functions">
          <input type="text"  className="WO-SearchBox" placeholder="Input Work Order Number..."/>
          <Button
            variant="contained"
            color="primary"
            className="add-work-order-button"
            onClick={() => setIsAddModalOpen(true)}>
            Add Work Order
          </Button>

      </div>

      <table className="workorders-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Name</th>
            <th>Job Description</th>
            <th>Price</th>
            <th>Labor Notes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkorders.map((workorder) => (
            <tr key={workorder._id}>
              <td>{workorder.customerName}</td>
              <td>{workorder.name}</td>
              <td>{workorder.jobDescription}</td>
              <td>{formatPrice(workorder.price)}</td>
              <td>{workorder.laborNotes}</td>
              <td>{workorder.status}</td>
              <td>
                <button
                  className="WOAction-button"
                  onClick={() => handleEdit(workorder)}>
                  <EditIcon />
                </button>
                <button
                  className="WOAction-button"
                  onClick={() => deleteWorkorder(workorder._id)}>
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
        />
      )}
      {isAddModalOpen && (
        <AddWorkOrderModal
          isOpen={isAddModalOpen}
          closeModal={() => setIsAddModalOpen(false)}
          addWorkorder={addWorkorder}
          user={user} // Pass the user prop to AddWorkOrderModal
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ProjectManagementTable;
