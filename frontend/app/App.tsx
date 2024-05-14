import Map from "./pages/Map";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import "./globals.css";
import "./styles.css";
import ForumLayout from "./layouts/ForumLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./state/authStore";
import HomeLayout from "./layouts/HomeLayout";
import AboutUs from "./pages/AboutUs";
import ForumHome from "./pages/forum-pages/Forum";
import ForumPopular from "./pages/forum-pages/ForumPopular";
import ForumAll from "./pages/forum-pages/ForumAll";
import CommunityPage from "./pages/Community";
export default function App() {
  const { getUser, setUser, setIsLoggedIn, isLoggedIn, user } = useAuth();
  console.log(isLoggedIn)

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
            <Route path="map" element={<Map />} />
        </Route>
          
        <Route path="/forum" element={<ForumLayout />}>
          <Route path="home" element={<ForumHome />} />
          <Route path="popular" element={<ForumPopular />} />
          <Route path="all" element={<ForumAll />} />
          <Route path="communities/:slugs" element={<CommunityPage  />} />
        </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
 
  );
}
