import React, { useEffect, useState } from "react";
import { authenticatedFetch } from "../utils/fetchUtils";
import HomePostCard from "../components/HomePostCard";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import { Community } from "../components/ForumSidebar";
import { HomePost } from "../components/HomePostCard";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<HomePost[]>([]);
  const [truncatedLength, setTruncatedLength] = useState(100);
  const [recommendedCommunities, setRecommendedCommunities] = useState<Community[]>([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const fetchRecentCommunities = async () => {
    try {
      const res = await authenticatedFetch(
        "/api/community",
        localStorage.getItem("token")
      );
      const data = await res.json();
      setRecommendedCommunities(data.data);
    } catch (error) {
      console.error("Error fetching recent communities:", error);
    }
  };

  const fetchSearchResults = async () => {
    if (!query) return;
    console.log("Fetching search results for query:", query);
    try {
      const res = await authenticatedFetch(
        `/api/search/searchPosts?query=${query}`,
        localStorage.getItem("token")
      );
      const data = await res.json();
      console.log("Search results:", data);
      setSearchResults(data);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  useEffect(() => {
    fetchSearchResults();
    fetchRecentCommunities();
  }, [query]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let length;

      if (screenWidth < 640) {
        length = 100;
      } else {
        length = 200;
      }

      setTruncatedLength(length);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex mt-5 lg:px-10 justify-center md:mx-auto flex-col">
      <div className="flex">
        <div className="overflow-scroll no-scrollbar h-screen pb-20 mr-5">
          {searchResults.length > 0 ? (
            searchResults.map((post) => (
              <HomePostCard
                key={post.id}
                post={post}
                truncatedLength={truncatedLength}
              />
            ))
          ) : (
            <div className="w-[80vw] md:w-[20rem] xl:w-[40rem] 2xl:w-[50rem] p-5 flex justify-center h-[50vh] items-center text-primary font-bold">
              No results found
            </div>
          )}
        </div>
        <div className="hidden md:flex w-72 h-screen 2xl:w-96 flex-col bg-slate-50 rounded-md">
          <div className="border-b w-full flex flex-col items-center p-5">
            <div className="ml-8">
                          <Logo />
                          
            </div>
            <p className="text-gray-500">Connect and Thrive</p>
          </div>
          <div className="flex mt-5 justify-center gap-5">
            <div className="flex flex-col items-center">
              Featured Communities
              <ul className="hidden xl:flex text-xs mt-5 flex-col gap-5">
                {recommendedCommunities.map((community) => (
                  <Link
                    className="flex items-center gap-2"
                    to={`/forum/communities/${community.slugs}`}
                    key={community.id}
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={community.img} />
                      <AvatarFallback>
                        {community.title.split("")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {community.title.split(",")[0]}
                  </Link>
                ))}
              </ul>
              <ul className="flex xl:hidden text-xs mt-5 flex-col gap-5">
                {recommendedCommunities.map((community) => (
                  <Link
                    className="flex items-center gap-2"
                    to={`/forum/communities/${community.slugs}`}
                    key={community.id}
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={community.img} />
                      <AvatarFallback>
                        {community.title.split("")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {community.title.split(".")[0]}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
