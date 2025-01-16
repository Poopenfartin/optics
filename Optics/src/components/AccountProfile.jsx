import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddBuildingModal from "./modals/AddBuildingModal"; // Import the new modal component
import Spinner from "./Spinner"; // Import the Spinner component

const AccountProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(JSON.parse(localStorage.getItem("sidebarState"))); // State to track the sidebar status

  useEffect(() => {
    axios.get(`http://localhost:5000/api/customerAccounts/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/buildings/customer/${id}`)
      .then(response => {
        setBuildings(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the buildings data!", error);
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

  const updateSidebarState = () => {
    const sidebarState = JSON.parse(localStorage.getItem("sidebarState"));
    setSidebarOpen(sidebarState);
  };

  useEffect(() => {
    window.addEventListener('storage', updateSidebarState);
    return () => {
      window.removeEventListener('storage', updateSidebarState);
    };
  }, []);

  useEffect(() => {
    updateSidebarState();
  }, [sidebarOpen]);

  if (loading) {
    return <Spinner sidebarOpen={sidebarOpen} />;
  }

  return (
    <div>
      <h1 className="page-header" style={{margin:0}}>{user.customerName}</h1>
      <p><strong>Active:</strong> {user.active ? "Yes" : "No"}</p>
      <p><strong>Number of Buildings:</strong> {user.numberOfBuildings}</p>
      <p><strong>Sales Representative:</strong> {user.salesRep}</p>
      <button onClick={() => setIsModalOpen(true)}>Add Building</button>
      {isModalOpen && <AddBuildingModal handleSave={handleAddBuilding} closeModal={() => setIsModalOpen(false)} />}
      <h2 style={{margin: '100px 0 0 0'}}>Buildings</h2>
      <ul>
        {buildings.map(building => (
          <li key={building._id}>{building.address}</li>
        ))}
      </ul>
    </div>
  );
};

export default AccountProfile;
