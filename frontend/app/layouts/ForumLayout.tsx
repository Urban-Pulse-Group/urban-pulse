import React, { useEffect } from "react";
import Sidebar from "../components/ForumSidebar";
import { Outlet, useFetcher } from "react-router-dom";
import { useAuth } from "../state/authStore";
import { useNavigate } from "react-router-dom";
export default function ForumLayout() {
  const { user, loadingUser } = useAuth(); 
  const navigate = useNavigate();
  useEffect(() => {
    if (loadingUser) return;
    if (!user) {
     navigate("/login")
   }
 }, [user])
  return (
    <div>
      <Sidebar>
        <Outlet />
        
      </Sidebar>

    </div>
  );
}
