import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { authenticatedFetch } from "../utils/fetchUtils";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { timeSince, truncateText } from "../utils/genUtils";
import {
  InputIcon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import { MessageSquare, Share } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import DOMPurify from "dompurify";
import { useAuth } from "../state/authStore";
import { Post } from "../components/CommunityPosts";
import { useLocation } from "react-router-dom";
import { Community } from "../components/ForumSidebar";
import CommentSection from "../components/CommentSection";

export interface Comment {
  id?: string;
  userId: string;
  content: string;
  postId: string;
  created_at?: Date;
  slugs: string;
  user_username?: string;
  likes?: number;
  user_img: string;
}

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [upvotes, setUpvotes] = useState<number>(1);
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [community, setCommunity] = useState<Community>();
  const [originalVote, setOriginalVote] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const location = useLocation();
  const { user, setJoinedCommunities, joinedCommunities } = useAuth();
  const [members, setMembers] = useState<number>(0);
  const [isMember, setIsMember] = useState(false);

  const slugs = location.pathname.split("/")[3];

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

  const sortedComments = (comments) =>
    [...comments].sort(
      (a: Comment, b: Comment) =>
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );

  const getComments = async () => {
    try {
      const res = await authenticatedFetch(
        `http://localhost:4040/api/thread/${post?.id}`,
        localStorage.getItem("token"),
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setComments(sortedComments(data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPost = async () => {
    try {
      const res = await authenticatedFetch(
        `http://localhost:4040/api/post/byId/${id}`,
        localStorage.getItem("token")
      );
      const data = await res.json();
      setPost(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCommunity();
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (!post) {
      return;
    }
    getComments();
  }, [post]);

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

  const sanitizedContent = DOMPurify.sanitize(post?.content ?? "");

  useEffect(() => {
    if (post) {
      setUpvotes(post.likes);
      setOriginalVote(post.likes);

      const likedPosts = localStorage.getItem("liked");
      const dislikedPosts = localStorage.getItem("disliked");

      if (likedPosts) {
        const likedSet = new Set(JSON.parse(likedPosts));
        if (likedSet.has(post.id)) {
          setLiked(true);
          setOriginalVote(post.likes - 1);
        }
      }

      if (dislikedPosts) {
        const dislikedSet = new Set(JSON.parse(dislikedPosts));
        if (dislikedSet.has(post.id)) {
          setDisliked(true);
          setOriginalVote(post.likes + 1);
        }
      }
    }
  }, [post]);

  const updateVotes = async (
    query: "up" | "down",
    neutral: boolean = false
  ) => {
    let newLikes = neutral
      ? originalVote
      : query === "up"
      ? originalVote + 1
      : originalVote - 1;

    const res = await authenticatedFetch(
      `http://localhost:4040/api/post/${post?.id}/likes`,
      localStorage.getItem("token"),
      {
        method: "PUT",
        body: JSON.stringify({ likes: newLikes }),
      }
    );

    if (res.ok) {
      setUpvotes(newLikes);
      const likedPosts = localStorage.getItem("liked");
      const dislikedPosts = localStorage.getItem("disliked");
      let likedSet = new Set();
      let dislikedSet = new Set();

      if (likedPosts) likedSet = new Set(JSON.parse(likedPosts));
      if (dislikedPosts) dislikedSet = new Set(JSON.parse(dislikedPosts));

      if (query === "up" && !neutral) {
        likedSet.add(post?.id);
        dislikedSet.delete(post?.id);
        setLiked(true);
        setDisliked(false);
      } else if (query === "down" && !neutral) {
        dislikedSet.add(post?.id);
        likedSet.delete(post?.id);
        setDisliked(true);
        setLiked(false);
      } else if (neutral) {
        likedSet.delete(post?.id);
        dislikedSet.delete(post?.id);
        setLiked(false);
        setDisliked(false);
      }

      localStorage.setItem("liked", JSON.stringify([...likedSet]));
      localStorage.setItem("disliked", JSON.stringify([...dislikedSet]));
    } else {
      console.error("Failed to update likes:", await res.text());
    }
  };

  const handleClick = (query: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation();
    if (query === "up") {
      if (liked) {
        setUpvotes(originalVote);
        updateVotes("up", true);
      } else {
        setUpvotes(originalVote + 1);
        updateVotes("up");
      }
    } else if (query === "down") {
      if (disliked) {
        setUpvotes(originalVote);
        updateVotes("down", true);
      } else {
        setUpvotes(originalVote - 1);
        updateVotes("down");
      }
    }
  };

  const handleSubmitComment = async () => {
    try {
      const res = await authenticatedFetch(
        "http://localhost:4040/api/thread",
        localStorage.getItem("token"),
        {
          method: "POST",
          body: JSON.stringify({
            userId: user?.id,
            content: comment,
            postId: post?.id,
          }),
        }
      );
      const data = await res.json();
      setComments(sortedComments([...comments, data.data]));
    } catch (err) {
      console.log(err);
    }
    setComment("");
  };

  return (
    <div className="  flex flex-col ">
      {" "}
      <div
        className={`flex  lg:px-10 justify-center 
    md:mx-auto  flex-col  `}>
        <div className="">
          <div className="flex flex-col md:flex-row justify-between  w-full flex-wrap ">
            <div className="flex items-center gap-5 mt-4  md:mt-0"></div>
          </div>
        </div>
        <div className="flex  ">
          <div
            className=" flex overflow-y-scroll no-scrollbar  lg:px-10 
    md:mx-auto  flex-col    :w-[80vw] lg:w-[25rem] xl:w-[40rem] 2xl:w-[50rem] p-5">
            <div className="flex items-center justify-center  ">
              <div className="">
                {" "}
                <div className="  flex items-center gap-4">
                  <Avatar className="w-[2rem] h-[2rem]">
                    <AvatarImage src={community?.img}></AvatarImage>
                    <AvatarFallback>
                      {community?.title.split("")[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold ">
                        <div className="flex items-center gap-3">
                          <p className="text-2xl">{community?.title} </p>
                          <p className="text-xs font-normal text-gray-500 mt-1">
                            {timeSince(post?.created_at)}
                          </p>
                        </div>

                        <p className="text-sm font-normal text-gray-500">
                          {post?.username}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex text-xs text-gray-600 items-center gap-2 text-s"></div>
                <h2 className="font-semibold text-lg mt-2">
                  {(post?.title?.split("")[0].toUpperCase() as string) +
                    post?.title?.slice(1)}
                </h2>
                <div
                  className="text-sm mb-5"
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
                <div className="flex gap-3 items-center">
                  <div
                    className={`flex gap-2 ${
                      liked
                        ? "bg-blue-600"
                        : disliked
                        ? "bg-primary"
                        : "bg-slate-100"
                    } w-fit p-2 rounded-full`}>
                    <ThickArrowUpIcon
                      onClick={(e) => handleClick("up", e)}
                      className={`w-5 h-5 cursor-pointer ${
                        liked ? "text-white" : "hover:text-blue-600"
                      }`}
                    />
                    <p
                      className={`text-sm ${
                        liked || disliked ? "text-white" : ""
                      }`}>
                      {upvotes}
                    </p>
                    <ThickArrowDownIcon
                      onClick={(e) => handleClick("down", e)}
                      className={`w-5 h-5 cursor-pointer ${
                        disliked ? "text-white" : "hover:text-primary"
                      }`}
                    />
                  </div>

                  <div className="bg-slate-100 hover:bg-slate-200 flex items-center w-fit gap-1 text-sm p-2 px-4 rounded-full">
                    <MessageSquare className="w-4 h-4" /> {comments.length}
                  </div>

                  <div className="bg-slate-100 hover:bg-slate-200 text-sm flex items-center gap-1 w-fit p-2 px-4 rounded-full">
                    <Share className="w-4 h-4" /> Share
                  </div>
                </div>{" "}
              </div>
            </div>{" "}

            <div className="w-full mt-5 gap-5 items-center flex">
              <Input
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder="Add a comment"
                className=""
              />
              <Button onClick={handleSubmitComment}>Comment</Button>
            </div>
            <div className="overflow-y-scroll mt-10 h-[60vh] no-scrollbar">
              <CommentSection commentState={{ comments, setComments }} />
            </div>
          </div>{" "}

          <div className="hidden   lg:flex  w-72 2xl:w-96  flex-col  bg-slate-50 rounded-md">
            <div className="border-b w-full flex flex-col items-center p-5">
              <div className="flex border-b pb-3 items-center justify-between mb-5 w-full">
                <h2 className="font-bold text-xl">{community?.title}</h2>
                {isMember ? (
                  <button
                    onClick={leaveCommunity}
                    className="rounded-3xl border px-3 py-2 text-xs hover:border-primary bg-primary hover:bg-primary text-white ">
                    Leave
                  </button>
                ) : (
                  <button
                    onClick={joinCommunity}
                    className="rounded-3xl border px-3 py-2 text-xs hover:border-primary bg-primary hover:bg-primary text-white ">
                    Join
                  </button>
                )}
              </div>

              <h2 className="font-bold">The {community?.title} community</h2>

              <p className="text-gray-500 ">{community?.description}</p>
            </div>

            <div className="flex mt-5  justify-center gap-5">
        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
