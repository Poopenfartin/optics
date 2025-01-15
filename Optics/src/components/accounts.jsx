import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import TopIcons from "./TopIcons";
import "../../Styles/App.css";
import SearchInput from "./SearchComponent";
import AddAccountModal from "./AddAccountModal"; // Import the new component

const Accounts = () => {
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  const tableRef = useRef(null); // Create a reference for the table

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customerAccounts")
      .then((response) => {
        setCustomerAccounts(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer accounts!",
          error
        );
      });
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the table whenever customerAccounts is updated
    if (tableRef.current) {
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    }
  }, [customerAccounts]);

  const handleRowClick = (id) => {
    navigate(`/accounts/${id}`);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSave = (newAccount) => {
    axios
      .post("http://localhost:5000/api/customerAccounts", newAccount)
      .then((response) => {
        console.log("Response from server:", response.data);
        // Fetch the updated list of accounts
        axios
          .get("http://localhost:5000/api/customerAccounts")
          .then((response) => {
            console.log("Updated customer accounts:", response.data);
            setCustomerAccounts(response.data);
          })
          .catch((error) => {
            console.error("There was an error fetching the customer accounts!", error);
          });
      })
      .catch((error) => {
        console.error("There was an error adding the account!", error);
      });
  };

  return (
    <div key={JSON.stringify(customerAccounts)} className="hide-scrollbar">
      <div className="table-container" ref={tableRef}>
        <h1 className="page-header">Customer Accounts</h1>
        <h2 className="page-subheader">CUSTOMERS</h2>
        <Divider sx={{ margin: "30px auto", backgroundColor: "green", width: "90%" }} />
        <div className="workorder-functions">
          <SearchInput placeholder="Search For Account..." width="80%" />
          <button className="add-button" onClick={openModal}>Add New Account</button>
        </div>
      </div>
      <table className="workorders-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Active?</th>
            <th>Number of Buildings</th>
          </tr>
        </thead>
        <tbody>
          {customerAccounts.map((account) => (
            <tr key={account._id} onClick={() => handleRowClick(account._id)}>
              <td>{account.customerName}</td>
              <td>{account.active ? "Yes" : "No"}</td>
              <td>{account.numberOfBuildings}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <AddAccountModal handleSave={handleSave} closeModal={closeModal} />}
    </div>
  );
};

export default Accounts;
