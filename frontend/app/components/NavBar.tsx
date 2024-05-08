import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";

interface NavbarItem {
  link: string;
  name: string;
}

export default function NavBar() {
  return (
    <nav className="flex  p-4 items-center  justify-between">
      <div className="w-[220px]">
        <img src="/logo.svg" alt="logo" />
      </div>
      
      <ul className="flex w-fit px-14 items-center h-fit gap-10">
        {items.map((item) => {
          return (
            <li className=" text-lg h-fit">
              <Link to={item.link}>{item.name}</Link>
            </li>
          );
        })}
        <Link to="/login">
       
        <li>
          <Button className="bg-red-600 hover:bg-red-700">Sign in</Button>
        </li>
         </Link>
      </ul>
     
    </nav>
  );
}

const items: NavbarItem[] = [
  {
    link: "/",
    name: "Home",
  },
  {
    link: "/about",
    name: "About us",
  },
  {
    link: "/mission",
    name: "Mission",
  },
  {
    link: "/map",
    name: "Map",
  },
];
