import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider, Box, Typography } from "@mui/material";
import TopIcons from "./TopIcons";

const Accounts = () => {
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/customerAccounts")
      .then(response => {
        setCustomerAccounts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the customer accounts!", error);
      });
  }, []);

  const handleRowClick = (id) => {
    navigate(`/accounts/${id}`);
  };

  return (
    <Box className="outer-container" sx={{ p: 3 }}>
      <TopIcons sx={{ zIndex: 2001, pointerEvents: 'auto', color: 'rgba(255, 255, 255, 0.9)' }} /> {/* Ensure icons are interactive */}
      <Box sx={{
        backgroundColor: '#33455a' // Default background color for the top bar
      }}> {/* Paste your background color value here */}
        <Box sx={{ 
          borderRadius: '0px',
          padding: "0.75rem 1rem", 
          width: '100%', 
          mb: 3, 
          position: 'fixed', // Keep the bar fixed
          top: 0, 
          left: 0, 
          zIndex: 1000, 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Align to the center
          marginLeft: 'auto', 
          marginRight: 'auto', 
          textAlign: 'center', 
          pointerEvents: 'none' // Ensure the bar doesn't block interactions
        }}>
          <Typography variant="h4" component="h1" sx={{ mb: 0, color: "#FFFFFF", lineHeight: '1.2rem', mt: 0 }}>
            Customer Accounts
          </Typography>
          <Typography variant="h6" component="h2" sx={{ mt: '0.2rem', ml: '0.1rem', color: "#32CD32", lineHeight: '1.2rem', mb: 0 }}>
            Overview
          </Typography> 
        </Box>
      </Box>
      <Box sx={{ mt: 8 }}>
        <Box sx={{ p: 3, backgroundColor: "#141b2d", borderRadius: '1px' }}>
          <Box sx={{
            backgroundColor: "#141b2d",
            borderRadius: '10px',
            padding: "0.1rem",
            mt: 2,
            width: '100%',
            maxWidth: '1500px',
            margin: '0 auto'
          }}>
            <Box className="workorder-functions" sx={{ mb: 1 }}>
              <input type="text" className="WO-SearchBox" placeholder="Search for customer account..." />
            </Box>
            <Divider sx={{ mb: 1, backgroundColor: "green" }} />
            <Box sx={{
              backgroundColor: "#141b2d",
              borderRadius: '10px',
              padding: "0rem",
              width: '100%',
              border: 'none'
            }}>
              <Box sx={{
                width: '100%',
                borderRadius: '1px',
                overflow: 'hidden'
              }}>
                <table className="workorders-table" style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: '100px',
                  borderCollapse: 'collapse',
                  border: 'none'
                }}>
                  <thead style={{ background: '#33455a !important', border: 'none' }}> {/* Remove grey shading by ensuring background matches */}
                    <tr>
                      <th style={{ textAlign: 'left', padding: '16px' }}>Customer Name</th> {/* Left align and add padding */}
                      <th style={{ textAlign: 'left', padding: '16px' }}>Status</th> {/* Left align and add padding */}
                      <th style={{ textAlign: 'left', padding: '16px' }}>Number of Buildings</th> {/* Left align and add padding */}
                    </tr>
                  </thead>
                  <tbody>
                    {customerAccounts.map(account => (
                      <tr key={account._id} onClick={() => handleRowClick(account._id)}>
                        <td style={{ textAlign: 'left', padding: '16px' }}>{account.customerName}</td> {/* Left align and add padding */}
                        <td style={{ textAlign: 'left', padding: '16px' }}>{account.active ? "Yes" : "No"}</td> {/* Left align and add padding */}
                        <td style={{ textAlign: 'left', padding: '16px' }}>{account.numberOfBuildings}</td> {/* Left align and add padding */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Accounts;


















