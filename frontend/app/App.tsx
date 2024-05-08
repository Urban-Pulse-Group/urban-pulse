import { useState } from "react";
import Map from "./components/LeafletMap";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import "./globals.css";
import "./styles.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
import HomeLayout from "./layouts/HomeLayout";
import AboutUs from "./pages/AboutUs";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/map" element={<Map data={{}} />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
