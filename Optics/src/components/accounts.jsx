import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import TopIcons from "./TopIcons";

const Accounts = () => {
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/customerAccounts")
      .then(response => {
        setCustomerAccounts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the customer accounts!", error);
      });
  }, []);

  const handleRowClick = (id) => {
    navigate(`/accounts/${id}`);
  };

  return (
    <div>
      <TopIcons />
      <h1>Customer Accounts</h1>
      <h2>ACCOUNTS</h2>
      <div className="workorder-functions">
        <input type="text" className="WO-SearchBox" placeholder="Search for customer account..." />
      </div>
      <Divider sx={{ mt: 3, backgroundColor: "green" }} />
      <table className="workorders-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Active?</th>
            <th>Number of Buildings</th>
          </tr>
        </thead>
        <tbody>
          {customerAccounts.map(account => (
            <tr key={account._id} onClick={() => handleRowClick(account._id)}>
              <td>{account.customerName}</td>
              <td>{account.active ? "Yes" : "No"}</td>
              <td>{account.numberOfBuildings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
