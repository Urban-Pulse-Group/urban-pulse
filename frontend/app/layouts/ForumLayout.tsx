import React from "react";
import Sidebar from "../components/ForumSidebar";
import { Outlet } from "react-router-dom";

export default function ForumLayout() {
  return (
    <div>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </div>
  );
}
