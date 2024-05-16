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
    <div className="flex lg:px-20  flex-col md:mx-auto max-w-[calc(100vw-272px)]">
      <div>
        <div className="flex flex-col md:flex-row justify-between w-full flex-wrap mt-5 md:mt-20">
          <div className="flex items-center gap-4">
            <Avatar className="w-[3rem] h-[3rem]">
              <AvatarImage src={community?.img}></AvatarImage>
              <AvatarFallback>{community?.title.split("")[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-2xl font-semibold">{community?.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-4 md:mt-0">
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
      <div className="mt-10">
        {/* posts */}
        <CommunityPosts communityId={community?.id as string} />
      </div>
    </div>
  );
}
