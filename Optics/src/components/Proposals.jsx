import React, { useState } from "react";
import axios from "axios";
import { Divider } from "@mui/material";
import TopIcons from "./TopIcons"; 
import SearchInput from "./SearchComponent";


const proposals = ({}) => {
  return (
    <div>
      <h1>Proposals</h1>
      <div className="workorder-functions">
        
      <SearchInput placeholder="Search For Proposal..." />

      </div>
      <Divider sx={{ mt: 3, backgroundColor: "green" }} />

      <table className="workorders-table">
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
      </table>

    </div>
  );
};

export default proposals;
