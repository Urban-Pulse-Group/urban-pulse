import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/home-page/Home';
import AboutUs from './components/home-page/AboutUs';
import Mission from './components/home-page/Mission';
import Map from './components/LeafletMap';
import './styles.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map data={{}} />} />
      </Routes>
    </Router>
  );
}

export default App;
// function App() {
//   return <Map data={{}} />;
// }

// export default App;
