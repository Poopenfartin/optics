import axios from "axios";
import Button from "@mui/material/Button";
import TopIcons from "./TopIcons"; 
import "../../Styles/App.css"

const accounts = ({ }) => {
  return (
    <div>
      <div>
        <TopIcons />
        <h1>BIG BONNIE BOYZ</h1>
        <h2 className="customers-heading">Customers</h2>
      </div>

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

export default accounts;