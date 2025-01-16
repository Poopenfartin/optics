import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddBuildingModal from "./modals/AddBuildingModal"; // Import the new modal component

const AccountProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/customerAccounts/${id}`)
      .then(response => {
        setUser(response.data);
        setBuildings(response.data.buildings);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  }, [id]);

  const handleAddBuilding = (newBuilding) => {
    axios.post('http://localhost:5000/api/buildings', { ...newBuilding, customerId: id })
      .then(response => {
        setBuildings([...buildings, response.data]);
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error("There was an error adding the building!", error);
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.customerName}</h1>
      <p><strong>Active:</strong> {user.active ? "Yes" : "No"}</p>
      <p><strong>Number of Buildings:</strong> {user.numberOfBuildings}</p>
      <p><strong>Sales Representative:</strong> {user.salesRep}</p>
      <button onClick={() => setIsModalOpen(true)}>Add Building</button>
      {isModalOpen && <AddBuildingModal handleSave={handleAddBuilding} closeModal={() => setIsModalOpen(false)} />}
      <h2>Buildings</h2>
      <ul>
        {buildings.map(building => (
          <li key={building._id}>{building.address}</li>
        ))}
      </ul>
    </div>
  );
};

export default AccountProfile;
