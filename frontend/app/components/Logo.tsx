import React from "react";
import { Link } from "react-router-dom";
export default function Logo({className=""}) {
  return (
    <>
      <Link to="/" className={`w-[220px]    md:m-0 ${className}`}>
        <img src="/logo2.svg" alt="logo" />
      </Link>
    </>
  );
}
