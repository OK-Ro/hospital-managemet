import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Main from "./components/home/Main";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on app load by checking for a token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={!isLoggedIn ? <LandingPage /> : <Main />} />

          {/* Login Route */}
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />

          {/* Register Route */}
          <Route path="/register" element={<Register />} />

          {/* Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Main /> : <Login setIsLoggedIn={setIsLoggedIn} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
