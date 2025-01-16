import React from "react";

const Spinner = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 275, width: 'calc(100% - 270px)', height: 'calc(100vh - 70px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="spinner"></div>
      <style>
        {`
          .spinner {
            border: 6px solid #f3f3f3; /* Light grey */
            border-top: 6px solid #00ff00; /* Green */
            border-radius: 50%;
            width: 80px;
            height: 80px;
            animation: spin 0.5s linear infinite; /* Speed up the spin */
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
