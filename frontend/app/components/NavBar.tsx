import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/mission">Mission</Link></li>
        <li><Link to="/map">Map</Link></li> 
      </ul>
    </nav>
  );
}

