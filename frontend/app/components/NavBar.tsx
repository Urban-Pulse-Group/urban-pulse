import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useAuth } from "../state/authStore";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Logo from "./Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu";
interface NavbarItem {
  link: string;
  name: string;
}
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

export default function NavBar() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <nav className="flex   p-1 px-10 items-center  justify-between">
        <Logo />

        <ul className="hidden md:flex w-fit px-14 items-center h-fit gap-10">
          {items.map((item) => {
            return (
              <li
                key={Math.floor(Math.random() * 23443243)}
                className=" text-lg h-fit">
                <Link to={item.link}>{item.name}</Link>
              </li>
            );
          })}
          {!isLoggedIn ? (
            <Link className="" to="/login">
              <li>
                <Button className="">Sign in</Button>
              </li>
            </Link>
          ) : (
            <li className="cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{user?.name.split("")[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup></DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <div onClick={() => logout(navigate)}>
                    <DropdownMenuItem className="cursor-pointer">
                      <p>Log out</p>
                    </DropdownMenuItem>{" "}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          )}
        </ul>

        <HamburgerMenuIcon className="block md:hidden scale-[1.6] cursor-pointer " />
      </nav>
    </div>
  );
}

// const items: NavbarItem[] = [
//   {
//     link: "/",
//     name: "Home",
//   },
//   {
//     link: "/about",
//     name: "About us",
//   },
//   {
//     link: "/mission",
//     name: "Mission",
//   },
//   {
//     link: "/map",
//     name: "Map",
//   },
//   {
//     link: "/forum",
//     name: "Communities",
//   },
// ];
const items: NavbarItem[] = [
  {
    link: "/",
    name: "Home",
  },
  {
    link: "/#about-us",
    name: "About us",
  },
  {
    link: "/#mission",
    name: "Mission",
  },
  {
    link: "/map",
    name: "Map",
  },
  {
    link: "/forum",
    name: "Communities",
  },
];
