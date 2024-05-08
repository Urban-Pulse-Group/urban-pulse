import { useState } from "react";
import Map from "./components/LeafletMap";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import "./globals.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
