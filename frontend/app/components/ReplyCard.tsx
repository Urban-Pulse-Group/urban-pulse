import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { timeSince } from "../utils/genUtils";
import { Comment } from "../pages/PostPage";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { MessageSquare, Share } from "lucide-react";
import { authenticatedFetch } from "../utils/fetchUtils";
import { useAuth } from "../state/authStore";

export interface Reply {
  id?: string; //uuid
  userId: string; //uuid
  content: string;
  threadId: string;
  created_at?: Date;
  likes?: number;
  username?: string;
}

export default function ReplyCard({ reply }: { reply: Reply }) {
  const [upvotes, setUpvotes] = useState<number>(1);
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [originalVote, setOriginalVote] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    setUpvotes(reply?.likes ?? 0);
    setOriginalVote(reply?.likes ?? 0);

    const likedComments = localStorage.getItem("liked");
    const dislikedComments = localStorage.getItem("disliked");

    if (likedComments) {
      const likedSet = new Set(JSON.parse(likedComments));
      if (likedSet.has(reply?.id)) {
        setLiked(true);
        setOriginalVote(reply?.likes! - 1);
      }
    }

    if (dislikedComments) {
      const dislikedSet = new Set(JSON.parse(dislikedComments));
      if (dislikedSet.has(reply?.id)) {
        setDisliked(true);
        setOriginalVote(reply?.likes! + 1);
      }
    }
  }, [reply]);

  const updateVotes = async (
    query: "up" | "down",
    neutral: boolean = false,
  ) => {
    let newLikes;
    if (neutral) {
      newLikes = originalVote;
    } else {
      newLikes = query === "up" ? originalVote + 1 : originalVote - 1;
    }

    const res = await authenticatedFetch(
      `http://localhost:4040/api/thread/${reply.id}/likes`,
      localStorage.getItem("token"),
      {
        method: "PUT",
        body: JSON.stringify({ likes: newLikes }),
      },
    );

    if (res.ok) {
      setUpvotes(newLikes);
      const likedComments = localStorage.getItem("liked");
      const dislikedComments = localStorage.getItem("disliked");
      let likedSet = new Set();
      let dislikedSet = new Set();

      if (likedComments) likedSet = new Set(JSON.parse(likedComments));
      if (dislikedComments) dislikedSet = new Set(JSON.parse(dislikedComments));

      if (query === "up" && !neutral) {
        likedSet.add(reply.id);
        dislikedSet.delete(reply.id);
        setLiked(true);
        setDisliked(false);
      } else if (query === "down" && !neutral) {
        dislikedSet.add(reply.id);
        likedSet.delete(reply.id);
        setDisliked(true);
        setLiked(false);
      } else if (neutral) {
        likedSet.delete(reply.id);
        dislikedSet.delete(reply.id);
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
        if (disliked) {
          setDisliked(false);
          setUpvotes(originalVote + 1);
          updateVotes("up");
        } else {
          setUpvotes(originalVote + 1);
          updateVotes("up");
        }
        setLiked(true);
      }
    } else if (query === "down") {
      if (disliked) {
        setUpvotes(originalVote);
        updateVotes("down", true);
      } else {
        if (liked) {
          setLiked(false);
          setUpvotes(originalVote - 1);
          updateVotes("down");
        } else {
          setUpvotes(originalVote - 1);
          updateVotes("down");
        }
        setDisliked(true);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={""} />
          <AvatarFallback>{reply.username?.split("")[0]}</AvatarFallback>
        </Avatar>

        <p className="text-sm font-semibold">{reply.username}</p>
        <p className="text-xs mt-[2px] text-gray-500 ">
          {timeSince(reply.created_at)}
        </p>
      </div>
      <p className="pl-10 text-sm mt-2">{reply.content}</p>
      <div className="flex mt-2 gap-3 items-center">
        <div
          className={`flex gap-2 ${
            liked ? "" : disliked ? "" : ""
          } w-fit p-2 rounded-full`}
        >
          <ThickArrowUpIcon
            onClick={(e) => handleClick("up", e)}
            className={`w-5 h-5 cursor-pointer ${
              liked ? "text-blue-600" : "hover:text-blue-600"
            }`}
          />
          <p className={` text-sm ${liked || disliked ? "" : ""}`}>{upvotes}</p>
          <ThickArrowDownIcon
            onClick={(e) => handleClick("down", e)}
            className={`w-5 h-5 cursor-pointer ${
              disliked ? "text-primary" : "hover:text-primary"
            }`}
          />
        </div>
{/* 
        <div className="  flex items-center w-fit gap-1 text-sm p-2 px-4 rounded-full">
          <MessageSquare className="w-4 h-4 " />
          100
        </div> */}

        <div className="text-sm flex items-center gap-1 w-fit p-2 px-4 rounded-full">
          <Share className="w-4 h-4" /> Share
        </div>
      </div>
    </div>
  );
}
