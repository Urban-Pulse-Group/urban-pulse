import { useState } from "react";
import Map from "./components/LeafletMap";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import "./globals.css";
import "./styles.css"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/map" element={<Map data={{}} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
