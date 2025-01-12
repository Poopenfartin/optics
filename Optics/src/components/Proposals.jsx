import React, { useState } from "react";
import axios from "axios";
import { Divider } from "@mui/material";
import TopIcons from "./TopIcons"; 


const proposals = ({}) => {
  return (
    <div>
      <TopIcons />
      <h1>Proposals</h1>
      <h2>JOB BIDS</h2>
      <div className="workorder-functions">
        <input
          type="text"
          className="WO-SearchBox"
          placeholder="Search for proposals..."
        />

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
