import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import TopIcons from "./TopIcons";
import "../../Styles/App.css";
import SearchInput from "./SearchComponent";

const Accounts = () => {
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const navigate = useNavigate();

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

  const handleRowClick = (id) => {
    navigate(`/accounts/${id}`);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="hide-scrollbar">
      <TopIcons
        isFullScreen={isFullScreen}
        toggleFullScreen={toggleFullScreen}
      />
      <div className="table-container"> 
        <h1>Accounts</h1>
      <Divider sx={{ margin: "30px auto", backgroundColor: "green", width: "90%" }} />
        <div className="workorder-functions">
          <SearchInput placeholder="Search For Account..." width="50%" />
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
      

    </div>
  );
};

export default Accounts;
