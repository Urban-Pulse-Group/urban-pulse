import React from "react";
import { Mission } from "../components/Mission";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";
export default function Home() {
  return (
    <div className="z-">
      <Hero />
      <Features />
      <Mission />
      <Footer />
    </div>
  );
}
