import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/home-page/Home';
import AboutUs from './components/home-page/AboutUs';
import Mission from './components/home-page/Mission';
import Map from './components/LeafletMap';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/map">
          <Map data={{}} />
        </Route>
      </Switch>
      <Home /> {/* im going to render the about us and our mission on the same page*/}
    </Router>
  );
}

export default App;
// function App() {
//   return <Map data={{}} />;
// }

// export default App;
