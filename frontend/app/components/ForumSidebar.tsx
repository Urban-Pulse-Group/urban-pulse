import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  Search,
  Banknote,
  PieChart,
  Landmark,
  CircleArrowOutUpRight,
  ScrollText,
  Info,
  CircleHelp,
  Map,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

import { Button } from "./Button";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { Input } from "./Input";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./Sheet";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

export default function Sidebar({ children }: { children: ReactNode }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="grid min-h-screen  fixed w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
      <div className="hidden border-r  bg-muted/40 md:block">
        <div className="flex  h-full max-h-screen flex-col gap-2">
          <div className="flex border-r-0  h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex ml-[-3rem]  gap-2 font-semibold">
              <Logo></Logo>
            </Link>
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1  h-full ">
            <nav className="grid items-start px-2 transition-all text-sm font-medium lg:px-4">
              <div className="border-b pb-3">
                {items.map((item) => {
                  return (
                    <Link
                      className={`${
                        path.includes(item.path)
                          ? "bg-muted text-primary"
                          : "text-muted-foreground"
                      } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground  transition-all text-md duration-300 hover:text-primary `}
                      to={item.path}>
                      {item.icon}
                      {item.title}
                    </Link>
                  );
                })}{" "}
              </div>
              <Accordion
                defaultValue={["item-1", "item-2", "item-3"]}
                type="multiple"
                className="w-full border-b ">
                <AccordionItem className="px-3 py-2 border-b" value="item-1">
                  <AccordionTrigger className="font-md  text-[#71717A] hover:text-red-600">
                    Recent
                  </AccordionTrigger>
                  <AccordionContent>None so far</AccordionContent>
                </AccordionItem>

                <AccordionItem className="px-3 py-2 border-b" value="item-2">
                  <AccordionTrigger className="font-md    text-[#71717A] hover:text-red-600">
                    Communities
                  </AccordionTrigger>
                  <AccordionContent>None so far</AccordionContent>
                </AccordionItem>

                <AccordionItem
                  data-state="open"
                  className="px-3 py-2 scale-1"
                  value="item-3">
                  <AccordionTrigger className="font-md  text-[#71717A] hover:text-red-600">
                    Resources
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {resourceItems.map((item) => {
                        return (
                          <li>
                            <Link to={item.path}>
                              <div className="flex items-center gap-3 rounded-lg px-3 py-2 tex-md text-muted-foreground  transition-all text-md duration-300 hover:text-primary">
                                {item.icon}
                                {item.title}
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </nav>
          </div>
          {/* <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex  h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2  font-medium  right-1 pl-2  no-scrollbar  overflow-y-scroll ">
                <Link
                  to="/"
                  className="flex mt-[-1rem]  border-b  mb-4 items-center gap-2 text-lg font-semibold">
                  <Logo></Logo>
                </Link>
                <SheetClose className="border-b">
                  {items.map((item) => {
                    return (
                  
                        <Link
                          to={item.path}
                          className={`${
                            path.includes(item.path)
                              ? "bg-muted text-primary"
                              : "text-muted-foreground"
                          } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all  duration-300`}>
                          {item.icon}
                          {item.title}
                        </Link>
                    
                    );
                  })}
                </SheetClose>

                <Accordion
                  defaultValue={["item-1", "item-2", "item-3"]}
                  type="multiple"
                  className="w-full border-b ">
                  <AccordionItem className="px-3 py-2 border-b" value="item-1">
                    <AccordionTrigger className="font-md  text-[#71717A] hover:text-red-600">
                      Recent
                    </AccordionTrigger>
                    <AccordionContent>None so far</AccordionContent>
                  </AccordionItem>

                  <AccordionItem className="px-3 py-2 border-b" value="item-2">
                    <AccordionTrigger className="font-md    text-[#71717A] hover:text-red-600">
                      Communities
                    </AccordionTrigger>
                    <AccordionContent>None so far</AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    data-state="open"
                    className="px-3 py-2 scale-1"
                    value="item-3">
                    <AccordionTrigger className="font-md  text-[#71717A] hover:text-red-600">
                      Resources
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {resourceItems.map((item) => {
                          return (
                            <li>
                              <Link to={item.path}>
                                <div className="flex items-center gap-3 rounded-lg px-3 py-2 tex-md text-muted-foreground  transition-all text-md duration-300 hover:text-primary">
                                  {item.icon}
                                  {item.title}
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </nav>
              {/* <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-ful">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div> */}
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={""}></AvatarImage>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex h-screen overflow-scroll  flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

const items = [
  {
    title: "Home",
    icon: <Home className="h-4 w-4" />,
    path: "/forum/home",
  },
  {
    title: "Popular",
    icon: <CircleArrowOutUpRight className="h-4 w-4" />,
    path: "/forum/popular",
  },
  {
    title: "All",
    icon: <ScrollText className="h-4 w-4" />,
    path: "/forum/all",
  },
];

const resourceItems = [
  {
    title: "Home",
    icon: <Home className="h-4 w-4" />,
    path: "/",
  },
  {
    title: "Map",
    icon: <Map className="h-4 w-4" />,
    path: "/map",
  },
  {
    title: "help",
    icon: <CircleHelp className="h-4 w-4" />,
    path: "/help",
  },
  {
    title: "About Urban Pulse",
    icon: <Info className="h-4 w-4" />,
    path: "/about",
  },
];
