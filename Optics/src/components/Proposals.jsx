import React, { useState } from 'react';
import { Divider } from '@mui/material';
import SearchInput from './SearchInput';
import AddProposalsModal from './AddProposalsModal'; // Ensure this path is correct

const Proposals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProposalClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="main-table-container">
        <h1>Proposals</h1>
        <Divider sx={{ margin: "20px auto", backgroundColor: "green", width: "90%" }} />

        <div className="workorder-functions">
          <SearchInput placeholder="Search For Proposal..." />
          <button className="add-button" onClick={handleAddProposalClick}>Add New Proposal</button>

        <div className="main-table-functions">
          <SearchInput placeholder="Search For Proposal..." width="80%" />
          <button className="add-button">Create New Proposal</button>

        </div>
      </div>
      <Divider sx={{ mt: 3, mb: 2, backgroundColor: "green" }} />
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
        <tbody>
          {/* Table rows go here */}
        </tbody>
      </table>
      <AddProposalsModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Proposals;



