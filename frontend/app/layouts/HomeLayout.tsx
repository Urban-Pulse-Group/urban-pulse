import React, { ReactNode } from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
    return (
        <div>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
