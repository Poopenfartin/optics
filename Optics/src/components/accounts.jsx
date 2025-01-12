import React, { useState } from "react";
import axios from "axios";
import { Divider } from "@mui/material";
import TopIcons from "./TopIcons"; 


const accounts = ({}) => {
  return (
    <div>
      <TopIcons />
      <h1>Customer Accounts</h1>
      <h2>ACCOUNTS</h2>
      <div className="workorder-functions">
        <input
          type="text"
          className="WO-SearchBox"
          placeholder="Search for customer account..."
        />

      </div>
      <Divider sx={{ mt: 3, backgroundColor: "green" }} />

      <table className="workorders-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Active?</th>
            <th>Number of Buidlings</th>
          </tr>
        </thead>        
      </table>

    </div>
  );
};

export default accounts;
