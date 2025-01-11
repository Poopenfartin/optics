import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import "../../Styles/App.css"

const BuildingLanding = ({}) => {
  return (
    <div>
      <h1>BIG BALLZ</h1>

      <input
        type="text"
        className="WO-SearchBox"
        placeholder="Search for customer name..."
      />
      <Button
        variant="contained"
        color="primary"
        className="add-work-order-button"
        onClick={() => setIsAddModalOpen(true)}>
        Add New Customer
      </Button>
    </div>
  );
};

export default BuildingLanding;
