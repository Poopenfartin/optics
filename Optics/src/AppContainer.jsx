// AppContainer.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const AppContainer = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppContainer; // Ensure default export
