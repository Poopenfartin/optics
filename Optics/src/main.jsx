// main.jsx
import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from ReactDOM/client
import AppContainer from "./AppContainer"; // Correct import
import "./index.css";

const container = document.getElementById('root');
const root = createRoot(container); // Create a root

root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
