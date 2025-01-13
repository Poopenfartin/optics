import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AccountProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/customerAccounts/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.customerName}</h1>
      <p><strong>Active:</strong> {user.active ? "Yes" : "No"}</p>
      <p><strong>Number of Buildings:</strong> {user.numberOfBuildings}</p>
      <p><strong>Sales Representative:</strong> {user.salesRep}</p>
    </div>
  );
};

export default AccountProfile;
