import React, { useState, useEffect } from "react";
import "../../../styles/App.css";

const AddProposalsModal = ({ handleSave, closeModal }) => {
  const [newProposal, setNewProposal] = useState({
    proposalNumber: "",
    name: "",
    totalPrice: "",
    type: "",
    building: "",
    createdBy: "",
    status: ""
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling on mount
    return () => {
      document.body.style.overflow = 'unset'; // Enable scrolling on unmount
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProposal({ ...newProposal, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSave(newProposal);
    closeModal();
  };

  const handleClickOutside = (event) => {
    if (event.target.className === 'modal-overlay') {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content">
        <h2 className="modal-h2">Add New Proposal</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Proposal Number:</label>
            <input
              type="text"
              name="proposalNumber"
              value={newProposal.proposalNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newProposal.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Total Price:</label>
            <input
              type="number"
              name="totalPrice"
              value={newProposal.totalPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Type:</label>
            <input
              type="text"
              name="type"
              value={newProposal.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Building:</label>
            <input
              type="text"
              name="building"
              value={newProposal.building}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Created By:</label>
            <input
              type="text"
              name="createdBy"
              value={newProposal.createdBy}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={newProposal.status}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-container">
            <button type="button" onClick={closeModal}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProposalsModal;
