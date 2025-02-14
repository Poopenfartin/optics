import React, { useState, useEffect } from "react";
import "../../../styles/App.css";

const AddAccountModal = ({ handleSave, closeModal }) => {
  const [newAccount, setNewAccount] = useState({
    customerName: "",
    active: true,
    numberOfBuildings: 1,
    salesRep: ""
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling on mount
    return () => {
      document.body.style.overflow = 'unset'; // Enable scrolling on unmount
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSave(newAccount);
    closeModal();
  };

  const handleClickOutside = (event) => {
    if (event.target.className === 'modal-overlay') {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content large-modal">
        <h2>Add New Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={newAccount.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Active:</label>
            <input
              type="checkbox"
              name="active"
              checked={newAccount.active}
              onChange={() => setNewAccount({ ...newAccount, active: !newAccount.active })}
            />
          </div>
          <div className="form-field">
            <label>Number of Buildings:</label>
            <input
              type="number"
              name="numberOfBuildings"
              value={newAccount.numberOfBuildings}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Sales Rep:</label>
            <input
              type="text"
              name="salesRep"
              value={newAccount.salesRep}
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

export default AddAccountModal;
