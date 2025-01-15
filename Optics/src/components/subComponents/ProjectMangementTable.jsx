import React, { useState } from "react";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../Modal";

const ProjectManagementTable = ({
  workorders,
  user,
  setWorkorders,
}) => {
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
    } catch (error) {
      console.error("Error deleting the work order:", error);
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
      });
      const updatedWorkorders = filteredWorkorders.map((workorder) =>
        workorder._id === id ? { ...workorder, ...editedData } : workorder
      );
      setWorkorders(updatedWorkorders);
      setIsEditModalOpen(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating the work order:", error);
    }
  };

  return (
    <div>
      <table className="workorders-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Name</th>
            <th>Job Description</th>
            <th>Price</th>
            <th>Labor Notes</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Deadline</th>
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
              <td>{workorder.priority}</td>
              <td>{new Date(workorder.deadline).toLocaleDateString()}</td>
              <td>
                <button
                  className="WOAction-button-edit"
                  onClick={() => handleEdit(workorder)}
                >
                  <EditIcon />
                </button>
                <button
                  className="WOAction-button-delete"
                  onClick={() => deleteWorkorder(workorder._id)}
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
        />
      )}
    </div>
  );
};

export default ProjectManagementTable;
