import React, { useState } from "react";
import { Divider } from "@mui/material";
import SearchInput from "./SearchComponent";
import AddProposalsModal from "./modals/AddProposalsModal";
import { useTheme } from "@mui/material/styles"; // Import useTheme

const Proposals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proposals, setProposals] = useState([]);
  const theme = useTheme(); // Get the current theme
  const isDarkMode = theme.palette.mode === "dark"; // Check if dark mode is enabled

  const handleAddProposalClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // NEEDS A NETWORK CALL TO ADD PROPOSAL TO DB
  const handleSaveProposal = (newProposal) => {
    setProposals([...proposals, newProposal]);
    handleCloseModal();
  };

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <div
        className="main-table-container"
        style={{
          backgroundColor: isDarkMode ? "#000" : "#fff", // Dynamic background color
          color: isDarkMode ? "#fff" : "#000", // Dynamic text color
          padding: "20px",
          borderRadius: "8px",
          border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Dynamic border
          boxShadow: isDarkMode
            ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
            : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
        }}
      >
        <h1 className="page-header" style={{ color: isDarkMode ? "#fff" : "#000" }}>Proposals</h1>
        <h2 className="page-subheader">OVERVIEW</h2>
        <Divider
          sx={{
            margin: "20px auto",
            backgroundColor: isDarkMode ? "#333" : "#e0e0e0", // Dynamic divider color
            width: "90%",
          }}
        />

        <div className="main-table-functions">
          <SearchInput placeholder="Search For Proposal..." />
          <button
            className="add-button"
            onClick={handleAddProposalClick}
            style={{
              backgroundColor: "#00ff08", // Green button
              color: "#000", // Black text
            }}
          >
            Add New Proposal
          </button>
        </div>
      </div>

      <Divider
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: isDarkMode ? "#333" : "#e0e0e0", // Dynamic divider color
        }}
      />

      <table
        className="main-table"
        style={{
          backgroundColor: isDarkMode ? "#000" : "#fff", // Dynamic background color
          color: isDarkMode ? "#fff" : "#000", // Dynamic text color
          border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e0e0e0", // Dynamic border
          boxShadow: isDarkMode
            ? "0 4px 12px rgba(255, 255, 255, 0.05)" // Soft shadow for dark mode
            : "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
        }}
      >
        <thead>
          <tr>
            <th style={{ color: isDarkMode ? "#fff" : "#000" }}>Proposal #</th>
            <th style={{ color: isDarkMode ? "#fff" : "#000" }}>Name</th>
            <th style={{ color: isDarkMode ? "#fff" : "#000" }}>Total Price</th>
            <th style={{ color: isDarkMode ? "#fff" : "#000" }}>Type</th>
            <th style={{ color: isDarkMode ? "#fff" : "#000" }}>Building</th>
            <th style={{ color: isDarkMode ? "#fff" : "#000" }}>Created By</th>
            <th style={{ color: isDarkMode ? "#fff" : "#000" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal.id}>
              <td style={{ color: isDarkMode ? "#fff" : "#000" }}>{proposal.proposalNumber}</td>
              <td style={{ color: isDarkMode ? "#fff" : "#000" }}>{proposal.name}</td>
              <td style={{ color: isDarkMode ? "#fff" : "#000" }}>{proposal.totalPrice}</td>
              <td style={{ color: isDarkMode ? "#fff" : "#000" }}>{proposal.type}</td>
              <td style={{ color: isDarkMode ? "#fff" : "#000" }}>{proposal.building}</td>
              <td style={{ color: isDarkMode ? "#fff" : "#000" }}>{proposal.createdBy}</td>
              <td style={{ color: isDarkMode ? "#fff" : "#000" }}>{proposal.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <AddProposalsModal
          handleSave={handleSaveProposal}
          closeModal={handleCloseModal}
          isDarkMode={isDarkMode} // Pass isDarkMode to the modal
        />
      )}
    </div>
  );
};

export default Proposals;
