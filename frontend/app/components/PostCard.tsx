import React, { useEffect, useState } from "react";
import { authenticatedFetch } from "../utils/fetchUtils";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { timeSince, truncateText } from "../utils/genUtils";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { MessageSquare, Share } from "lucide-react";
import DOMPurify from "dompurify";
import { Post } from "./CommunityPosts";
import { useAuth } from "../state/authStore";

export default function PostCard({
  post,
  truncatedLength,
}: {
  post: Post;
  truncatedLength: number;
}) {
  const [upvotes, setUpvotes] = useState<number>(1);
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [originalVote, setOriginalVote] = useState(0);

  const { user } = useAuth();
  const sanitizedContent = DOMPurify.sanitize(post.content);
  const truncatedContent = truncateText(sanitizedContent, truncatedLength);

  useEffect(() => {
    setUpvotes(post?.likes);
    setOriginalVote(post?.likes);

    const likedPosts = localStorage.getItem("liked");
    const dislikedPosts = localStorage.getItem("disliked");

    if (likedPosts) {
      const likedSet = new Set(JSON.parse(likedPosts));
      if (likedSet.has(post?.id)) {
        setLiked(true);
      }
    }

    if (dislikedPosts) {
      const dislikedSet = new Set(JSON.parse(dislikedPosts));
      if (dislikedSet.has(post?.id)) {
        setDisliked(true);
      }
    }
  }, [post]);

  const updateVotes = async (query: "up" | "down", neutral: boolean = false) => {
    let newLikes;
    if (neutral) {
      newLikes = originalVote;
    } else {
      newLikes = query === "up" ? originalVote + 1 : originalVote - 1;
    }

    const res = await authenticatedFetch(
      `http://localhost:4040/api/post/${post.id}/likes`,
      localStorage.getItem("token"),
      {
        method: "PUT",
        body: JSON.stringify({
          likes: newLikes,
        }),
      }
    );

    if (res.ok) {
      setUpvotes(newLikes);
      const likedPosts = localStorage.getItem("liked");
      const dislikedPosts = localStorage.getItem("disliked");
      let likedSet = new Set();
      let dislikedSet = new Set();

      if (likedPosts) {
        likedSet = new Set(JSON.parse(likedPosts));
      }
      if (dislikedPosts) {
        dislikedSet = new Set(JSON.parse(dislikedPosts));
      }

      if (query === "up" && !neutral) {
        likedSet.add(post.id);
        dislikedSet.delete(post.id);
        setLiked(true);
        setDisliked(false);
      } else if (query === "down" && !neutral) {
        dislikedSet.add(post.id);
        likedSet.delete(post.id);
        setDisliked(true);
        setLiked(false);
      } else if (neutral) {
        likedSet.delete(post.id);
        dislikedSet.delete(post.id);
        setLiked(false);
        setDisliked(false);
      }

      localStorage.setItem("liked", JSON.stringify([...likedSet]));
      localStorage.setItem("disliked", JSON.stringify([...dislikedSet]));
    } else {
      console.error("Failed to update likes:", await res.text());
    }
  };

  const handleClick = (query: "up" | "down") => {
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

  return (
    <div className="border-t p-5  w-[80vw] md:w-[70%]">
      <div className="flex text-xs text-gray-600 items-center gap-2 text-s">
        <Avatar className="w-8 h-8 ">
          <AvatarImage src=""></AvatarImage>
          <AvatarFallback>
            {post.username.split("")[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p>{post.username}</p>
        <p>{timeSince(post.created_at)}</p>
      </div>
      <h2 className="font-semibold text-lg mt-2">
        {post.title.split("")[0].toUpperCase() + post.title.slice(1)}
      </h2>

      <div
        className="text-sm mb-5"
        dangerouslySetInnerHTML={{ __html: truncatedContent }}></div>
      <div className="flex gap-3 items-center">
        <div className={`flex gap-2 ${liked ? "bg-blue-600" : disliked ? "bg-primary" : "bg-slate-100"} w-fit p-2 rounded-full`}>
          <ThickArrowUpIcon
            onClick={() => handleClick("up")}
            className={`w-5 h-5 cursor-pointer ${liked ? "text-white" : "hover:text-blue-600"}`}
          />
          <p className={` text-sm {liked ? "text-white" : ""}`}>{upvotes}</p>
          <ThickArrowDownIcon
            onClick={() => handleClick("down")}
            className={`w-5 h-5 cursor-pointer ${disliked ? "text-white" : "hover:text-primary"}`}
          />
        </div>

        <div className="bg-slate-100 flex items-center w-fit gap-1 text-sm p-2 px-4 rounded-full">
          <div className=""> 
          <MessageSquare className="w-4 h-4" /></div> 100
        </div>

        <div className="bg-slate-100 text-sm flex items-center gap-1 w-fit p-2 px-4 rounded-full">
          <Share className="w-4 h-4" /> Share
        </div>
      </div>
    </div>
  );
}