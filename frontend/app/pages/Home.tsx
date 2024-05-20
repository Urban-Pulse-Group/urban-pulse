import React from "react";
import { Link } from "react-router-dom";
import { Home as HomeIcon, Info, Map } from "lucide-react";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
    </div>
  );
}
