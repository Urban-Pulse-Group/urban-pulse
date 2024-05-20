import React, { useState } from "react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const NavbarItem = ({ link, name }) => (
  <li className="text-md h-fit">
    <a className="hover:text-primary" href={link}>
      {name}
    </a>
  </li>
);

export const items = [
  { link: "/", name: "Home" },
  { link: "/#features", name: "Features" },
  { link: "/#mission", name: "Mission" },
  { link: "/map", name: "Map" },
  { link: "/forum/home", name: "Communities" },
];

export default function NavBar() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="sticky z-[10000]">
      <nav className="  flex border-b px-10 lg:px-0 items-center justify-between">
        <Link to="/" className="ml-[-2.5rem] lg:ml-[-.9rem]">
          <Logo className="" />
        </Link>

        <ul className="hidden lg:flex w-fit px-10 items-center h-fit gap-12">
          {items.map((item) => (
            <NavbarItem key={item.name} link={item.link} name={item.name} />
          ))}
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
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.img} />
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
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          )}
        </ul>

        <HamburgerMenuIcon
          className="block lg:hidden scale-[1.6] cursor-pointer"
          onClick={toggleMobileMenu}
        />
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed  inset-0 z-[10000] bg-gray-800 transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="absolute top-0 right-0 p-4">
          <button
            className="text-white text-2xl"
            onClick={toggleMobileMenu}
          >
            ×
          </button>
        </div>
        <ul className="flex flex-col text-4xl gap-10 items-center justify-center bg-primary h-full text-white">
          {items.map((item) => (
            <NavbarItem key={item.name} link={item.link} name={item.name} />
          ))}
          {!isLoggedIn ? (
            <Link className="" to="/login" onClick={toggleMobileMenu}>
              <li>
                <Button className="">Sign in</Button>
              </li>
            </Link>
          ) : (
            <li className="cursor-pointer" onClick={toggleMobileMenu}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.img} />
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
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
