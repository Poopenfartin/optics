import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import axios from "axios";
import "../Styles/App.css"; // Import Styles

// Component Imports
import Sidebar from "./Sidebar";
import ProjectManagementTable from "./components/ProjectManagementTable";
import BuildingLanding from "./components/BuildingLanding";
import Home from "./components/home"; // Corrected import statement
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const App = () => {
  const [workorders, setWorkorders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("authToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userData = localStorage.getItem("user");

    // Exclude /register path from authentication check
    if (location.pathname === "/register") {
      console.log("Accessing /register page, skipping authentication check");
      return;
    }

    if (accessToken && refreshToken && userData && userData !== "undefined") {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsAuthenticated(false);
        setUser(null);
        navigate("/login");
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
      console.log("User not authenticated, redirecting to login...");
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      axios
        .get("http://localhost:5000/api/workorders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          setWorkorders(response.data);
          console.log("Work orders fetched:", response.data);
        })
        .catch(async (error) => {
          console.error("Error fetching work orders:", error);

          // Handle token expiration
          if (error.response && error.response.status === 401) {
            const newAccessToken = await refreshToken();
            if (newAccessToken) {
              axios
                .get("http://localhost:5000/api/workorders", {
                  headers: {
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                })
                .then((response) => {
                  setWorkorders(response.data);
                  console.log("Work orders fetched:", response.data);
                })
                .catch((error) =>
                  console.error("Error fetching work orders with new token:", error)
                );
            } else {
              setIsAuthenticated(false);
              setUser(null);
              navigate("/login");
            }
          }
        });
    }
  }, [isAuthenticated]);

  const refreshToken = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/refresh-token", {
        token: localStorage.getItem("refreshToken"),
      });

      const newAccessToken = response.data.accessToken;
      localStorage.setItem("authToken", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  const addWorkorder = (newWorkorder) => {
    setWorkorders([...workorders, newWorkorder]);
  };

  const deleteWorkorder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/workorders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setWorkorders(workorders.filter((workorder) => workorder._id !== id));
    } catch (error) {
      console.error("There was an error deleting the work order:", error);
      alert("Failed to delete work order. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user"); // Remove user info from local storage
    setIsAuthenticated(false);
    setUser(null); // Reset user state
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isAuthenticated && <Sidebar logout={logout} user={user} />}{" "}
      {/* Pass user to Sidebar */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#141b2d;",
          p: 3,
          minHeight: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home user={user} /> // Pass user to Home component
              ) : (
                <LoginForm
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              )
            }
          />
          <Route
            path="/login"
            element={
              <LoginForm
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            }
          />{" "}
          {/* Pass setUser to LoginForm */}
          <Route
            path="/register"
            element={<RegisterForm setIsAuthenticated={setIsAuthenticated} />}
          />
          {isAuthenticated && (
            <>
              <Route
                path="/project-management"
                element={
                  <ProjectManagementTable
                    workorders={workorders}
                    addWorkorder={addWorkorder}
                    deleteWorkorder={deleteWorkorder}
                    user={user} // Pass user to the ProjectManagementTable
                    setWorkorders={setWorkorders} // Pass setWorkorders to the ProjectManagementTable
                  />
                }
              />
              <Route path="/proposals" element={ <h1>Proposals</h1> } />
              <Route path="/buildings" element={ <BuildingLanding />} />
            </>
          )}
          {!isAuthenticated && (
            <>
              <Route
                path="/project-management"
                element={
                  <LoginForm
                    setIsAuthenticated={setIsAuthenticated}
                    setUser={setUser}
                  />
                }
              />
              <Route
                path="/proposals"
                element={
                  <LoginForm
                    setIsAuthenticated={setIsAuthenticated}
                    setUser={setUser}
                  />
                }
              />
              <Route
                path="/buildings"
                element={
                  <LoginForm
                    setIsAuthenticated={setIsAuthenticated}
                    setUser={setUser}
                  />
                }
              />
            </>
          )}
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
