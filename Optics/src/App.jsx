import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import ProjectManagement from "./components/ProjectManagement";
import Accounts from "./components/accounts";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Proposals from "./components/Proposals";
import AccountProfile from "./components/AccountProfile";
import ProfilePage from "./components/Profile-Page";
import TopIcons from "./components/TopIcons";
import CustomToast from "./components/CustomToast";
import Spinner from "./components/Spinner";

const useDarkMode = () => {
  const savedMode = localStorage.getItem("darkMode");
  return savedMode ? JSON.parse(savedMode) : true;
};

const App = () => {
  const [workorders, setWorkorders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(useDarkMode);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastPathname", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const authenticateAndFetchData = async () => {
      const accessToken = localStorage.getItem("authToken");
      const userData = localStorage.getItem("user");
      const lastPathname = localStorage.getItem("lastPathname");

      if (location.pathname === "/register") {
        setLoading(false);
        return;
      }

      if (accessToken && userData && userData !== "undefined") {
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

          const response = await axios.get(
            "http://localhost:5000/api/workorders",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          setWorkorders(response.data);
        } catch (error) {
          console.error("Error:", error);
          handleLogout();
        }
      } else {
        handleLogout();
      }
      setLoading(false);
    };

    authenticateAndFetchData();
  }, [navigate, location.pathname]);

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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
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
      background: { default: darkMode ? "#181818" : "#F5F5F5" },
    },
    components: {
      MuiIconButton: {
        styleOverrides: { root: { color: darkMode ? "#FFF" : "#000" } },
      },
    },
  });

  useEffect(() => {
    // Add smooth scrolling behavior to the whole document
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  if (loading) return <Spinner />;

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
        {isAuthenticated && (
          <Sidebar
            logout={handleLogout}
            user={user}
          />
        )}
        {/* prettier-ignore */}
        <Box component="main" sx={{flexGrow: 1, bgcolor: isAuthRoute ? '#181818' : 'background.default', color: '#FFF', p: 2, height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
          {!isAuthRoute && <TopIcons toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}
          <Routes>
            {/* prettier-ignore */}
            <Route path="/" element={isAuthenticated ? <Home user={user} /> : <LoginForm setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/register" element={<RegisterForm setIsAuthenticated={setIsAuthenticated} />} />
            {isAuthenticated && (


              <>
                {/* prettier-ignore */}
                <Route path="/project-management" element={<ProjectManagement user={user} />} />
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/accounts/:id" element={<AccountProfile />} />
                <Route path="/profile-page" element={<ProfilePage user={user} />} />
              </>
            )}
            {!isAuthenticated && (
              <>
                {/* prettier-ignore */}
                <Route path="/project-management" element={<LoginForm setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
                {/* prettier-ignore */}
                <Route path="/proposals" element={<LoginForm setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
                {/* prettier-ignore */}
                <Route path="/accounts" element={<LoginForm setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
                {/* prettier-ignore */}
                <Route path="/profile-page" element={<LoginForm setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
              </>
            )}
          </Routes>
          <CustomToast />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
