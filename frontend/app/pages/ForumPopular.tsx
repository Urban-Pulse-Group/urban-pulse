import React, { useEffect, useState } from "react";
import { authenticatedFetch } from "../utils/fetchUtils";
import HomePostCard from "../components/HomePostCard";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { Link } from "react-router-dom";
import { HomePost } from "../components/HomePostCard";
import Logo from "../components/Logo";
import { Community } from "../components/ForumSidebar";
import CommunityCard from "../components/CommunityCard"; // Import the new CommunityCard component

export default function forumPopular() {
    const [popularPosts, setPopularPosts] = useState<HomePost[]>([]);
    const [truncatedLength, setTruncatedLength] = useState(100);
    const [recommendedCommunities, setRecommendedCommunities] = useState<Community[]>([]);
    const [randomCommunities, setRandomCommunities] = useState<Community[]>([]);
  
    const fetchRecentCommunities = async () => {
      try {
        const res = await authenticatedFetch(
          "/api/community",
          localStorage.getItem("token")
        );
  
        const data = await res.json();
        console.log(data);
  
        // Filter out "Homeless Crisis"
        const filteredCommunities = data.data.filter(
          (community: Community) => community.title !== "Homelessness Crisis. Los Angeles, CA"
        );
  
        // Shuffle the array to get random communities
        const shuffledCommunities = filteredCommunities.sort(() => 0.5 - Math.random());
  
        // Select the first three random communities
        setRandomCommunities(shuffledCommunities.slice(0, 3));
  
        // Set the recommended communities for the sidebar
        setRecommendedCommunities(filteredCommunities);
      } catch (error) {
        console.error(error);
      }
    };
  
    const getPopularPosts = async () => {
      try {
        const res = await authenticatedFetch(
          `http://localhost:4040/api/post/popular/10`,
          localStorage.getItem("token")
        );
        const data = await res.json();
        console.log(data);
        setPopularPosts(data.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getPopularPosts();
      fetchRecentCommunities();
    }, []);
  
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
        <div className=" hidden xl:flex flex-wrap justify-center gap-4 mb-8">
          {randomCommunities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
  
        <div className="flex">
          <div className="overflow-scroll no-scrollbar h-screen pb-20 mr-5">
            {popularPosts.length > 0 ? (
              popularPosts.map((post) => (
                <HomePostCard key={post.id} post={post} truncatedLength={truncatedLength} />
              ))
            ) : (
              <div className="w-[80vw] md:w-[20rem] xl:w-[40rem] 2xl:w-[50rem] p-5 flex justify-center h-[50vh] items-center text-primary font-bold">
                No posts yet
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
  
                <ul className="hidden xl:flex text-xs mt-5 flex-col gap-5 ">
                  {recommendedCommunities.map((community) => (
                    <Link
                      className="flex items-center gap-2"
                      to={`/forum/communities/${community.slugs}`}
                      key={community.id}
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={community.img} />
                        <AvatarFallback>{community.title.split("")[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {community.title.split(",")[0]}
                    </Link>
                  ))}
                </ul>
  
                <ul className="flex xl:hidden text-xs mt-5 flex-col gap-5 ">
                  {recommendedCommunities.map((community) => (
                    <Link
                      className="flex items-center gap-2"
                      to={`/forum/communities/${community.slugs}`}
                      key={community.id}
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={community.img} />
                        <AvatarFallback>{community.title.split("")[0].toUpperCase()}</AvatarFallback>
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