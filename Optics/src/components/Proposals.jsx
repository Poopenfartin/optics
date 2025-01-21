import React, { useState } from "react";
import { Divider } from "@mui/material";
import SearchInput from "./SearchComponent";
import AddProposalsModal from "./modals/AddProposalsModal"; 

const Proposals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proposals, setProposals] = useState([]); 


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
    <div>
      <div className="main-table-container">
        <h1 className="page-header ">Proposals</h1>
        <Divider
          sx={{ margin: "20px auto", backgroundColor: "green", width: "90%" }}
        />

        <div className="main-table-functions">
          <SearchInput placeholder="Search For Proposal..." />
          <button
            className="add-button"
            onClick={handleAddProposalClick}>
            Add New Proposal
          </button>
        </div>
      </div>

      <Divider sx={{ mt: 3, mb: 2, backgroundColor: "green"}} />

      <table className="main-table">
        <thead>
          <tr>
            <th>Proposal #</th>
            <th>Name</th>
            <th>Total Price</th>
            <th>Type</th>
            <th>Building</th>
            <th>Created By</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      {isModalOpen && (
        <AddProposalsModal
          handleSave={handleSaveProposal}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Proposals;
