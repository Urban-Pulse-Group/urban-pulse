import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Community } from "../components/ForumSidebar";
import { authenticatedFetch } from "../utils/fetchUtils";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { Link } from "react-router-dom";
import CommunityPosts from "../components/CommunityPosts";

export default function CommunityPage() {
  const { slugs } = useParams();
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState();
  useEffect(() => {
    if (!community) {
      return;
    }
    const fetchPosts = async () => {
      try {
        const res = await authenticatedFetch(
          `http://localhost:4040/api/post/${community.id}`,
          localStorage.getItem("token")
        );

        const data = await res.json();
        console.log(data);
        setPosts(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [community]);

  useEffect(() => {
    const getCommunity = async () => {
      try {
        const res = await authenticatedFetch(
          `http://localhost:4040/api/community/${slugs}`,
          localStorage.getItem("token")
        );
        const data = await res.json();
        console.log(data);
        setCommunity(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCommunity();
  }, [slugs]);

  return (
    <div
      className={`flex mt-5 md:mt-20 lg:px-10 justify-center 

      md:mx-auto  flex-col  `}>
      <div className="">
        <div className="flex flex-col md:flex-row justify-between  w-full flex-wrap ">
          <div className="flex items-center gap-4">
            <Avatar className="w-[3rem] h-[3rem]">
              <AvatarImage src={community?.img}></AvatarImage>
              <AvatarFallback>{community?.title.split("")[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-2xl font-semibold">{community?.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-4  md:mt-0">
            <Link to={`/forum/${slugs}/new-post`}>
              <button className="rounded-3xl border p-3 hover:border-black text-sm transition-all">
                Create a post
              </button>
            </Link>
            <button className="rounded-3xl border px-3 py-2 text-sm hover:border-primary bg-primary hover:bg-primary text-white">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 flex  ">
        {/* posts */}

        {posts && <CommunityPosts postState={{ posts, setPosts }} />}

        {!posts && (
          <div className="w-[80vw] md:w-[20rem]  xl:w-[40rem] 2xl:w-[50rem] p-5   flex justify-center h-[50vh] items-center text-primary font-bold">
            No posts yet
          </div>
        )}

        <div className="hidden md:flex  w-72 h-screen 2xl:w-96  flex-col  bg-slate-50 rounded-md">
          <div className="border-b w-full flex flex-col items-center p-5">
            <h2 className="font-bold">The {community?.title} community</h2>

            <p className="text-gray-500 ">{community?.description}</p>
          </div>

          <div className="flex mt-5  justify-center gap-5">
            <div className="flex flex-col items-center ">
              <p>35</p>
              <p className="text-gray-500 text-sm">members</p>
            </div>
            <div className="flex flex-col items-center ">
              <p>12</p>
              <p className="text-gray-500 text-sm">posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
