import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";

// Import Components
import Sidebar from "./Sidebar";
import ProjectManagement from "./components/ProjectManagement";
import Accounts from "./components/accounts";
import Home from "./components/home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Proposals from "./components/Proposals";
import AccountProfile from "./components/AccountProfile";
import TopIcons from "./components/TopIcons"; // Import TopIcons

const App = () => {
  const [workorders, setWorkorders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Read initial darkMode state from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : true;
  });

  useEffect(() => {
    localStorage.setItem("lastPathname", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const accessToken = localStorage.getItem("authToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userData = localStorage.getItem("user");
    const lastPathname = localStorage.getItem("lastPathname");

    if (location.pathname === "/register") {
      setLoading(false);
      return;
    }

    if (accessToken && refreshToken && userData && userData !== "undefined") {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
        if (
          lastPathname &&
          lastPathname !== "/login" &&
          location.pathname !== lastPathname
        ) {
          navigate(lastPathname, { replace: true });
        }
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
    setLoading(false);
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
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
                .catch((error) => {
                  console.error(
                    "Error fetching work orders with new token:",
                    error
                  );
                });
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
      const response = await axios.post(
        "http://localhost:5000/api/refresh-token",
        {
          token: localStorage.getItem("refreshToken"),
        }
      );

      const newAccessToken = response.data.accessToken;
      localStorage.setItem("authToken", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    alert("Logged out successfully");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#181818" : "#F5F5F5",
      },
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: darkMode ? "#FFF" : "#000",
          },
        },
      },
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          bgcolor: isAuthRoute ? "#181818" : "background.default",
        }}>
        <CssBaseline />
        {isAuthenticated && <Sidebar logout={logout} user={user} />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: isAuthRoute ? "#181818" : "background.default",
            color: "#FFF", // Ensure text is visible in dark mode
            p: 2,
            height: "100vh", // Use 100vh to take up full viewport height
            overflowY: "auto",
            overflowX: "hidden",
          }}>
          {!isAuthRoute && (
            <TopIcons toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          )}
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Home user={user} />
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
            />
            <Route
              path="/register"
              element={<RegisterForm setIsAuthenticated={setIsAuthenticated} />}
            />
            {isAuthenticated && (
              <>
                <Route
                  path="/project-management"
                  element={
                    <ProjectManagement
                      workorders={workorders}
                      user={user}
                      setWorkorders={setWorkorders}
                    />
                  }
                />
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/accounts/:id" element={<AccountProfile />} />
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
                  path="/accounts"
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
          <ToastContainer />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
