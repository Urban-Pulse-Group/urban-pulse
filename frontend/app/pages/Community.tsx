import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Community } from "../components/ForumSidebar";
import { authenticatedFetch } from "../utils/fetchUtils";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import CommunityPosts from "../components/CommunityPosts";
import { useAuth } from "../state/authStore";
import { Post } from "../components/CommunityPosts";

export default function CommunityPage() {
  const { slugs } = useParams();
  const { user, setJoinedCommunities, joinedCommunities } = useAuth();
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [members, setMembers] = useState<number>(0);

  const getMembershipCount = async (communityId: string) => {
    try {
      const response = await authenticatedFetch(
        `http://localhost:4040/api/membership/count/${communityId}`,
        localStorage.getItem("token")
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMembers(data.data);
    } catch (error) {
      console.error("Error fetching membership count:", error);
      throw error;
    }
  };
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const getCommunity = async () => {
      try {
        const res = await authenticatedFetch(
          `http://localhost:4040/api/community/${slugs}`,
          localStorage.getItem("token")
        );
        const data = await res.json();
        setCommunity(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCommunity();
  }, [slugs]);

  useEffect(() => {
    if (!community || !user) return;

    const checkMembership = async () => {
      try {
        const isMemberRes = await authenticatedFetch(
          `http://localhost:4040/api/membership/isMember?userId=${user.id}&communityId=${community.id}`,
          localStorage.getItem("token")
        );
        const isMemberData = await isMemberRes.json();
        setIsMember(isMemberData.isMember);
      } catch (err) {
        console.log(err);
      }
    };
    checkMembership();
  }, [community, user]);

  useEffect(() => {
    if (!community) return;

    const fetchPosts = async () => {
      try {
        const res = await authenticatedFetch(
          `http://localhost:4040/api/post/${community.id}`,
          localStorage.getItem("token")
        );

        const data = await res.json();
        setPosts(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
    getMembershipCount(community.id!);
  }, [community]);

  const joinCommunity = async () => {
    try {
      await authenticatedFetch(
        `http://localhost:4040/api/membership/join`,
        localStorage.getItem("token"),
        {
          method: "POST",
          body: JSON.stringify({
            userId: user?.id,
            communityId: community?.id,
          }),
        }
      );
      setIsMember(true);
      setJoinedCommunities([...joinedCommunities, community!]);
    } catch (err) {
      console.log(err);
    }
  };

  const leaveCommunity = async () => {
    try {
      await authenticatedFetch(
        `http://localhost:4040/api/membership/leave`,
        localStorage.getItem("token"),
        {
          method: "POST",
          body: JSON.stringify({
            userId: user?.id,
            communityId: community?.id,
          }),
        }
      );
      setIsMember(false);
      setJoinedCommunities(
        joinedCommunities.filter((hood) => {
          return hood.id != community?.id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex mt-5 md:mt-20  lg:px-10 justify-center md:mx-auto flex-col">
      <div className="">
        <div className="flex gap-5 flex-col  md:flex-row justify-between w-full flex-wrap">
          <div className="flex items-center gap-4">
            <Avatar className="w-[3rem] h-[3rem]">
              <AvatarImage src={community?.img}></AvatarImage>
              <AvatarFallback>{community?.title.split("")[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-2xl w-[307.3px] font-semibold">
                {community?.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-4 md:mt-0">
            <Link to={`/forum/${slugs}/new-post`}>
              <button className="rounded-3xl border p-3 hover:border-black text-sm transition-all">
                Create a post
              </button>
            </Link>
            {isMember ? (
              <button
                onClick={leaveCommunity}
                className="rounded-3xl border px-3 py-2 text-sm hover:border-primary bg-primary hover:bg-primary text-white"
              >
                Leave
              </button>
            ) : (
              <button
                onClick={joinCommunity}
                className="rounded-3xl border px-3 py-2 text-sm hover:border-primary bg-primary hover:bg-primary text-white"
              >
                Join
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 flex">
        {posts && <CommunityPosts postState={{ posts, setPosts }} />}
        {!posts && (
          <div className="w-[80vw] md:w-[20rem] xl:w-[40rem] 2xl:w-[50rem] p-5 flex justify-center h-[50vh] items-center text-primary font-bold">
            No posts yet
          </div>
        )}
        <div className="hidden md:flex w-72 h-screen 2xl:w-96 flex-col bg-slate-50 rounded-md">
          <div className="border-b w-full flex flex-col items-center p-5">
            <h2 className="font-bold">The {community?.title} community</h2>
            <p className="text-gray-500 ">{community?.description}</p>
          </div>
          <div className="flex mt-5 justify-center gap-5">
            <div className="flex flex-col items-center">
              <p>{members}</p>
              <p className="text-gray-500 text-sm">members</p>
            </div>
            <div className="flex flex-col items-center">
              <p>{posts?.length ?? 0}</p>
              <p className="text-gray-500 text-sm">posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
