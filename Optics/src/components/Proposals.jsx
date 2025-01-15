import React from "react";
import axios from "axios";
import { Divider } from "@mui/material";
import TopIcons from "./TopIcons";
import SearchInput from "./SearchComponent";

const Proposals = () => {
  return (
    <div>
      <div className="proposals-container">
        <h1>Proposals</h1>
        <Divider sx={{ margin: "20px auto", backgroundColor: "green", width: "90%" }} />
        <div className="workorder-functions">
          <SearchInput placeholder="Search For Proposal..." />
          <button className="add-button">Add New Proposal</button>
        </div>
      </div>
      <Divider sx={{ mt: 3, mb: 2, backgroundColor: "green" }} />
      <table className="proposals-table">
        <thead>
          <tr>
            <th>Proposal #</th>
            <th>Name</th>
            <th>Total Price</th>
            <th>Type</th>
            <th>Building</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Add your proposal data rows here */}
        </tbody>
      </table>
    </div>
  );
};

export default Proposals;



