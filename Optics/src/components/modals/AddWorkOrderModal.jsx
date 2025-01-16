import React, { useEffect, useState } from 'react';
import '../../../styles/App.css';

const AddWorkOrderModal = ({ isOpen, closeModal, addWorkorder, user }) => {
  const [newData, setNewData] = useState({
    customerName: '',
    name: '',
    jobDescription: '',
    price: '',
    laborNotes: '',
    status: 'Pending',
    projectManager: user.email, // Auto-populate with the user's email
    priority: '', // Optional field
    deadline: '', // Optional field
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value !== undefined && value !== null ? value : '', // Ensure value is never null or undefined
    });
  };

  const handleSave = () => {
    addWorkorder(newData);
    closeModal();
  };

  const handleClickOutside = (event) => {
    if (event.target.className === 'modal-overlay') {
      closeModal();
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'; // Enable scrolling on unmount
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content large-modal">
        <h2>Add New Work Order</h2>
        <div className="form-field">
          <label>Customer Name:</label>
          <textarea
            name="customerName"
            value={newData.customerName || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Name:</label>
          <textarea
            name="name"
            value={newData.name || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Job Description:</label>
          <textarea
            name="jobDescription"
            value={newData.jobDescription || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={newData.price || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Labor Notes:</label>
          <textarea
            name="laborNotes"
            value={newData.laborNotes || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Status:</label>
          <select
            name="status"
            value={newData.status || 'Pending'}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="form-field">
          <label>Priority:</label> {/* Optional field */}
          <input
            type="text"
            name="priority"
            value={newData.priority || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Deadline:</label> {/* Optional field */}
          <input
            type="date"
            name="deadline"
            value={newData.deadline || ''}
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkOrderModal;
