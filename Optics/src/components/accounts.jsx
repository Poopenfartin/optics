import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import TopIcons from "./TopIcons";
import "../../Styles/App.css";
import SearchInput from "./SearchComponent";
import AddAccountModal from "./modals/AddAccountModal"; 
import Spinner from "./Spinner"; 
const Accounts = () => {
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const tableRef = useRef(null); 

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
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      key={JSON.stringify(customerAccounts)}
      style={{ overflowY: "auto", overflowX: "hidden" }}>
      <div className="main-table-container" ref={tableRef}>
        <h1 className="page-header">Customer Accounts</h1>
        <h2 className="page-subheader">CUSTOMERS</h2>
        <Divider
          sx={{ margin: "30px auto", backgroundColor: "green", width: "90%" }}
        />
        <div className="main-table-functions">
          <SearchInput placeholder="Search For Account..." width="80%" />
          <button className="add-button" onClick={openModal}>
            Add New Account
          </button>
        </div>
      </div>
      <table className="main-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Active?</th>
            <th>Number of Buildings</th>
            <th>Buildings</th>
          </tr>
        </thead>
        <tbody>
          {customerAccounts.map((account) => (
            <tr key={account._id} onClick={() => handleRowClick(account._id)}>
              <td>{account.customerName}</td>
              <td>{account.active ? "Yes" : "No"}</td>
              <td>{account.numberOfBuildings}</td>
              <td>
                {account.buildings.map(building => (
                  <div key={building._id}>{building.address}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <AddAccountModal handleSave={handleSave} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Accounts;
