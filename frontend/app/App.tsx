import Map from "./pages/Map";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import "./globals.css";
import "./styles.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./state/authStore";
import HomeLayout from "./layouts/HomeLayout";
import AboutUs from "./pages/AboutUs";
import { ThemeProvider } from "./components/ThemeProvider";
export default function App() {
  const { getUser, setUser, setIsLoggedIn, isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      }
    };
    fetchUser();
  }, [isLoggedIn]);

  return (
   
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="/map" element={<Map />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
 
  );
}
