import React from "react";

export default function Logo({className=""}) {
  return (
    <>
      <div className={`w-[220px]  ml-[-3rem] md:m-0 ${className}`}>
        <img src="/logo2.svg" alt="logo" />
      </div>
    </>
  );
}
