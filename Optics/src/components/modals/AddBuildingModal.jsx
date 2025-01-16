import React, { useState, useEffect } from "react";
import "../../../Styles/App.css";

const AddBuildingModal = ({ handleSave, closeModal }) => {
  const [newBuilding, setNewBuilding] = useState({
    address: "",
    billingAddress: "",
    contactInformation: "",
    notes: "",
    preferredServiceTechnician: ""
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling on mount
    return () => {
      document.body.style.overflow = 'unset'; // Enable scrolling on unmount
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBuilding({ ...newBuilding, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSave(newBuilding);
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
        <h2>Add New Building</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={newBuilding.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Billing Address:</label>
            <input
              type="text"
              name="billingAddress"
              value={newBuilding.billingAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Contact Information:</label>
            <input
              type="text"
              name="contactInformation"
              value={newBuilding.contactInformation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Notes:</label>
            <textarea
              name="notes"
              value={newBuilding.notes}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Preferred Service Technician:</label>
            <input
              type="text"
              name="preferredServiceTechnician"
              value={newBuilding.preferredServiceTechnician}
              onChange={handleChange}
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

export default AddBuildingModal;
