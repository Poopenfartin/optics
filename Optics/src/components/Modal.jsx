import React, { useEffect } from 'react';
import '../../styles/App.css';

const Modal = ({ editedData, handleChange, handleSave, closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling on mount
    return () => {
      document.body.style.overflow = 'unset'; // Enable scrolling on unmount
    };
  }, []);

  const handleClickOutside = (event) => {
    if (event.target.className === 'modal-overlay') {
      closeModal(); // Close the modal if the click is outside the modal content
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content">
        <h2>Edit Work Order</h2>
        <div className="form-field">
          <label>Customer Name:</label>
          <textarea
            name="customerName"
            value={editedData.customerName || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Name:</label>
          <textarea
            name="name"
            value={editedData.name || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Job Description:</label>
          <textarea
            name="jobDescription"
            value={editedData.jobDescription || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={editedData.price || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Labor Notes:</label>
          <textarea
            name="laborNotes"
            value={editedData.laborNotes || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Status:</label>
          <select
            name="status"
            value={editedData.status || 'Pending'}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="form-field">
          <label>Priority:</label> {/* New field */}
          <input
            type="text"
            name="priority"
            value={editedData.priority || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Deadline:</label> {/* New field */}
          <input
            type="date"
            name="deadline"
            value={editedData.deadline || ''}
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

export default Modal;
