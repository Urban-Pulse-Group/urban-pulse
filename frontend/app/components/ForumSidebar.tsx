import { Link } from "react-router-dom";
import Logo from "./Logo";
import { MoonLoader } from "react-spinners";
import {
  Home,
  Menu,
  Search,
  CircleArrowOutUpRight,
  ScrollText,
  Info,
  CircleHelp,
  Map,
  Plus,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";
import { toast } from "sonner";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Textarea } from "./TextArea";
import { Button } from "./Button";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
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
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { authenticatedFetch } from "../utils/fetchUtils";
import { useAuth } from "../state/authStore";
import { Description } from "@radix-ui/react-dialog";
import LoadingOverlay from "./LoadingOverlay";
import { useNavigate } from "react-router-dom";
interface FormData {
  title: string;
  description: string;
  imageUpload: File | null;
}

interface Community {
  title: string;
  id: number;
}

export default function Sidebar({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { token, user } = useAuth();
  const [imageSrc, setImageSrc] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [recentCommunities, setRecentCommunities] = useState<Community[]>([]);
  const [showAllCommunities, setShowAllCommunities] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [communityNameInitial, setCommunityNameInitial] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    imageUpload: null,
  });
  const navigate = useNavigate();
  const path = location.pathname;
  console.log("user", user);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.startsWith("image/")) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc("");
      setFileError("unsupported file type");
    }
  };
  const uploadImage = async () => {
    if (formData.imageUpload === null) return null;
    const imageRef = ref(
      storage,
      `images/${formData.imageUpload.name + uuid()}`
    );
    const res = await uploadBytes(imageRef, formData.imageUpload);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const handleCreateCommunity = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = await uploadImage();
    try {
      const res = await authenticatedFetch(
        "http://localhost:4040/api/community",
        token,
        {
          method: "post",
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            img: url,
            userId: user?.id,
          }),
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const handleMobileNavigate = (src: string) => {
    navigate(src)
  }
  const fetchRecentCommunities = async () => {
    try {
      const res = await authenticatedFetch(
        "http://localhost:4040/api/community",
        token
      );

      const data = await res.json();

      setRecentCommunities(data.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecentCommunities();
  }, [recentCommunities]);

  const handleShowMoreCommunities = () => {
    setShowAllCommunities(true);
  };

  return (
    <div className="grid min-h-screen  fixed w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
      <div className="hidden border-r  bg-muted/40 md:block">
        <div className="flex  h-full max-h-screen flex-col gap-2">
          <div className="flex border-r-0  h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex ml-[-3rem]  gap-2 font-semibold">
              <Logo></Logo>
            </Link>
          </div>
          {loading && <LoadingOverlay />}
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
                      to={item.path}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  );
                })}{" "}
              </div>
              <Accordion
                defaultValue={["item-1", "item-2", "item-3"]}
                type="multiple"
                className="w-full border-b "
              >
                <AccordionItem className="px-3 py-2 border-b" value="item-1">
                  <AccordionTrigger className="font-md  text-[#71717A] hover:text-primary">
                    Recent
                  </AccordionTrigger>
                  <AccordionContent>None so far</AccordionContent>
                </AccordionItem>

                <AccordionItem className="px-3 py-2 border-b" value="item-2">
                  <AccordionTrigger className="font-md    text-[#71717A] hover:text-primary">
                    Communities
                  </AccordionTrigger>

                  <AccordionContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => setImageSrc("")}
                          className="flex gap-1  items-center mb-2 text-[#71717A] hover:text-primary cursor-pointer"
                        >
                          <Plus className="w-4 h-4" /> Create a community
                        </button>
                      </DialogTrigger>
                      <DialogContent className=" flex flex-col items-center w-[80vw] rounded-md  sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Create a community</DialogTitle>
                          <DialogDescription>
                            Insert the required fields needed to make a
                            community
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={handleCreateCommunity}
                          className="flex gap-4 items-center flex-col justify-center   py-4"
                        >
                          <div>
                            <Avatar className="h-20 w-20">
                              <AvatarImage
                                src={imageSrc}
                                alt="uploaded picture"
                              />

                              <AvatarFallback>
                                {communityNameInitial || "?"}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex  w-[60vw] sm:w-96 items-center justify-center gap-4">
                            <Input
                              id="title"
                              placeholder="Title"
                              autoComplete="off"
                              className="col-span-3"
                              value={formData.title}
                              onChange={(e) => {
                                setCommunityNameInitial(
                                  e.target.value.length > 0
                                    ? e.target.value.split("")[0].toUpperCase()
                                    : e.target.value.split("")[0]
                                );
                                setFormData((formData) => ({
                                  ...formData,
                                  title: e.target.value,
                                }));
                              }}
                              required
                            />
                          </div>
                          <div className="flex items-center w-[60vw] sm:w-96 gap-4">
                            <Textarea
                              id="description"
                              placeholder="Description"
                              className="col-span-3"
                              value={formData.description}
                              onChange={(e) =>
                                setFormData((formData) => ({
                                  ...formData,
                                  description: e.target.value,
                                }))
                              }
                              required
                            />
                          </div>
                          {fileError && (
                            <p className="text-sm text-red-600">{fileError}</p>
                          )}

                          <input
                            type="file"
                            onChange={(e) => {
                              handleFileChange(e);
                              setFormData((formData) => ({
                                ...formData,
                                imageUpload: e.target.files![0] as File,
                              }));
                            }}
                            className=" flex bg-slate-50 border p-1 rounded-md  w-[90%] file:bg-primary file:text-white file:border-none file:p-1 file:px-3 file:text-sm file:rounded-md file:mr-5 file:py-2 file:hover:bg-primary/90  file:cursor-pointer"
                          ></input>

                          <DialogFooter>
                            <DialogPrimitive.Close>
                              <Button type="submit">Create Community</Button>
                            </DialogPrimitive.Close>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>

                    <div className="flex items-center ml-[-1rem] w-full justify-center flex-col">
                      {recentCommunities
                        .slice(
                          0,
                          showAllCommunities ? recentCommunities.length : 7
                        )
                        .map((community) => (
                          <Link
                            to={`/community/${community.id}`}
                            key={community.id}
                          >
                            {community.title}
                          </Link>
                        ))}
                      {/* Show more button if there are more than 7 communities */}
                      {recentCommunities.length > 7 && !showAllCommunities && (
                        <button onClick={handleShowMoreCommunities}>
                          Show More
                        </button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  data-state="open"
                  className="px-3 py-2 scale-1"
                  value="item-3"
                >
                  <AccordionTrigger className="font-md  text-[#71717A] hover:text-primary ">
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
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex  h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2  font-medium  right-1 pl-2  no-scrollbar  overflow-y-scroll ">
                <Link
                  to="/"
                  className="flex mt-[-1rem]  border-b  mb-4 items-center gap-2 text-lg font-semibold"
                >
                  <Logo></Logo>
                </Link>
             
                  {items.map((item) => {
                    return (
                      <SheetClose
                       onClick={() => handleMobileNavigate(item.path)}
                        className={`${
                          path.includes(item.path)
                            ? "bg-muted text-primary"
                            : "text-muted-foreground"
                        } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all  duration-300`}
                      >
                        {item.icon}
                        {item.title}
                      </SheetClose>
                    );
                  })}
            

                <Accordion
                  defaultValue={["item-1", "item-2", "item-3"]}
                  type="multiple"
                  className="w-full border-b "
                >
                  <AccordionItem className="px-3 py-2 border-b" value="item-1">
                    <AccordionTrigger className="font-md  text-[#71717A] hover:text-primary">
                      Recent
                    </AccordionTrigger>
                    <AccordionContent>None so far</AccordionContent>
                  </AccordionItem>

                  <AccordionItem className="px-3 py-2 border-b" value="item-2">
                    <AccordionTrigger className="font-md    text-[#71717A] hover:text-primary">
                      Communities
                    </AccordionTrigger>
                    <AccordionContent>None so far</AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    data-state="open"
                    className="px-3 py-2 scale-1"
                    value="item-3"
                  >
                    <AccordionTrigger className="font-md  text-[#71717A] hover:text-primary">
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
                  <AvatarFallback>?</AvatarFallback>
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
