import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import TopIcons from "./TopIcons";
import SearchInput from "./SearchComponent";
import AddAccountModal from "./modals/AddAccountModal"; 
import Spinner from "./Spinner"; 
import { showToast } from "./CustomToast"; 
import { useTheme } from "@mui/material/styles"; // Import useTheme

const Accounts = () => {
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const tableRef = useRef(null); 
  const theme = useTheme(); // Get the current theme
  const isDarkMode = theme.palette.mode === "dark"; // Check if dark mode is enabled

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customerAccounts")
      .then((response) => {
        const accounts = response.data;
        const fetchBuildingsPromises = accounts.map(account =>
          axios.get(`http://localhost:5000/api/buildings/customer/${account._id}`)
            .then(buildingsResponse => ({
              ...account,
              buildings: buildingsResponse.data
            }))
        );

        Promise.all(fetchBuildingsPromises).then(results => {
          setCustomerAccounts(results);
          setLoading(false); // Set loading to false after data is fetched
          console.log(results);
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the customer accounts!", error);
        setLoading(false); // Set loading to false even if there's an error
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
        showToast("success", "New customer added successfully!"); // Show success toast

        // Fetch the updated list of accounts
        axios
          .get("http://localhost:5000/api/customerAccounts")
          .then((response) => {
            const accounts = response.data;
            const fetchBuildingsPromises = accounts.map(account =>
              axios.get(`http://localhost:5000/api/buildings/customer/${account._id}`)
                .then(buildingsResponse => ({
                  ...account,
                  buildings: buildingsResponse.data
                }))
            );

            Promise.all(fetchBuildingsPromises).then(results => {
              setCustomerAccounts(results);
            });
          })
          .catch((error) => {
            console.error("There was an error fetching the customer accounts!", error);
          });
      })
      .catch((error) => {
        console.error("There was an error adding the account!", error);
        showToast("error", "There was an error adding the account."); // Show error toast
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      key={JSON.stringify(customerAccounts)}
      style={{ overflowY: "auto", overflowX: "hidden" }}>
      <div
        className="accounts-main-table-container"
        ref={tableRef}
        style={{
          backgroundColor: isDarkMode ? "#000" : "#FFF", // Dynamic background color
          color: isDarkMode ? "#FFF" : "#000", // Dynamic text color
          padding: "20px",
          borderRadius: "8px",
          border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Dynamic border
          boxShadow: isDarkMode
            ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
            : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
            marginTop:  "60px",
        }}>
        <h1 className="page-header" style={{ color: isDarkMode ? "#FFF" : "#000" }}>Customer Accounts</h1>
        <h2 className="page-subheader">OVERVIEW</h2>
        <Divider
          sx={{ margin: "30px auto", backgroundColor: isDarkMode ? "#333" : "#e0e0e0", width: "90%" }} // Dynamic divider color
        />
        <div className="main-table-functions">
          <SearchInput placeholder="Search For Account..." width="80%" />
          <button
            className="add-button"
            onClick={openModal}
            style={{ backgroundColor: "#00ff08", color: "#000" }}> {/* Green button with black text */}
            Add New Account
          </button>
        </div>
      </div>
      <table
        className="main-table"
        style={{
          backgroundColor: isDarkMode ? "#000" : "#FFF", // Dynamic background color
          color: isDarkMode ? "#FFF" : "#000", // Dynamic text color
          border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Dynamic border
          boxShadow: isDarkMode
            ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
            : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
        }}>
        <thead>
          <tr>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Customer Name</th>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Active?</th>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Number of Buildings</th>
            <th style={{ color: isDarkMode ? "#FFF" : "#000" }}>Buildings</th>
          </tr>
        </thead>
        <tbody>
          {customerAccounts.map((account) => (
            <tr key={account._id} onClick={() => handleRowClick(account._id)}>
              <td style={{ color: isDarkMode ? "#FFF" : "#000" }}>{account.customerName}</td>
              <td style={{ color: isDarkMode ? "#FFF" : "#000" }}>{account.active ? "Yes" : "No"}</td>
              <td style={{ color: isDarkMode ? "#FFF" : "#000" }}>{account.numberOfBuildings}</td>
              <td style={{ color: isDarkMode ? "#FFF" : "#000" }}>
                {account.buildings.map(building => (
                  <div key={building._id}>{building.address}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <AddAccountModal handleSave={handleSave} closeModal={closeModal} isDarkMode={isDarkMode} /> // Pass isDarkMode to the modal
      )}
    </div>
  );
};

export default Accounts;