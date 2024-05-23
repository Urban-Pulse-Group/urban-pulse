import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { authenticatedFetch } from "../utils/fetchUtils";
import { timeSince } from "../utils/genUtils";
import { Comment } from "../pages/PostPage";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { MessageSquare, Share } from "lucide-react";
import { useAuth } from "../state/authStore";
import { Button } from "./Button";
import { Input } from "./Input";
import ReplyCard, { Reply } from "./ReplyCard";
interface Props {
  commentState: {
    comments: Comment[];
    setComments: Dispatch<SetStateAction<Comment[]>>;
  };
}

export default function CommentCard({ comment }: { comment: Comment }) {
  const [upvotes, setUpvotes] = useState<number>(1);
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [originalVote, setOriginalVote] = useState(0);
  const [replyActive, setReplyActive] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [reply, setReply] = useState<string>("");
  const { user } = useAuth();
console.log(comment)
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await authenticatedFetch(
          `/api/reply/${comment.id}`,
          localStorage.getItem("token"), {
            method: "GET"
          }
         
        );
        const data = await res.json();
        console.log(data)
       
        setReplies(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReplies()
  }, [comment]);


  useEffect(() => {
    setUpvotes(comment?.likes! ?? 0);
    setOriginalVote(comment?.likes! ?? 0);

    const likedComments = localStorage.getItem("liked");
    const dislikedComments = localStorage.getItem("disliked");

    if (likedComments) {
      const likedSet = new Set(JSON.parse(likedComments));
      if (likedSet.has(comment?.id)) {
        setLiked(true);
        setOriginalVote(comment?.likes! - 1);
      }
    }

    if (dislikedComments) {
      const dislikedSet = new Set(JSON.parse(dislikedComments));
      if (dislikedSet.has(comment?.id)) {
        setDisliked(true);
        setOriginalVote(comment?.likes! + 1);
      }
    }
  }, [comment]);

  const updateVotes = async (
    query: "up" | "down",
    neutral: boolean = false
  ) => {
    let newLikes;
    if (neutral) {
      newLikes = originalVote;
    } else {
      newLikes = query === "up" ? originalVote + 1 : originalVote - 1;
    }

    const res = await authenticatedFetch(
      `/api/thread/${comment.id}/likes`,
      localStorage.getItem("token"),
      {
        method: "PUT",
        body: JSON.stringify({ likes: newLikes }),
      }
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
        likedSet.add(comment.id);
        dislikedSet.delete(comment.id);
        setLiked(true);
        setDisliked(false);
      } else if (query === "down" && !neutral) {
        dislikedSet.add(comment.id);
        likedSet.delete(comment.id);
        setDisliked(true);
        setLiked(false);
      } else if (neutral) {
        likedSet.delete(comment.id);
        dislikedSet.delete(comment.id);
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
  const handleSubmitReply = async () => {
    try {
      const res = await authenticatedFetch(
        "/api/reply",
        localStorage.getItem("token"),
        {
          method: "POST",
          body: JSON.stringify({
            userId: user?.id,
            content: reply,
            threadId: comment?.id,
          }),
        }
      );
      const data = await res.json();
      setReplies((replies) => [...replies, data.data]);
      setReplyActive(false)
    } catch (err) {
      console.log(err);
    }
    setReply("");
  };

  return (
    <div className="mb-10 ">
      <div className="flex items-center gap-2 ">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.user_img} />
          <AvatarFallback>{comment.user_username?.split("")[0]}</AvatarFallback>
        </Avatar>

        <p className="text-sm font-semibold">{comment.user_username}</p>
        <p className="text-xs mt-[2px] text-gray-500 ">
          {timeSince(comment.created_at)}
        </p>
      </div>
      <p className="pl-10 text-sm mt-2 text-wrap">{comment.content}</p>
      <div className="flex mt-2 gap-3 items-center">
        <div
          className={`flex gap-2 ${
            liked ? "" : disliked ? "" : ""
          } w-fit p-2 rounded-full`}>
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

        <div className=" cursor-pointer flex items-center w-fit gap-1 text-sm p-2 px-4 rounded-full">
          <MessageSquare
            onClick={() => setReplyActive((replyActive) => !replyActive)}
            className="w-4 h-4 "
          />
          Reply
        </div>

        <div className="text-sm flex items-center gap-1 w-fit p-2 px-4 rounded-full">
          <Share className="w-4 h-4" /> Share
        </div>
      </div>
      {replyActive && (
        <div className="w-[95%] ml-1 mt-5 gap-5 items-center flex">
          <Input
            onChange={(e) => setReply(e.target.value)}
            value={reply}
            placeholder="Add a reply"
            className="text-xs"
          />
          <Button onClick={handleSubmitReply} className="text-xs p-2 py-1">
            Reply
          </Button>
        </div>
      )}

      {replies?.map((reply) => {
        return (
          <div className="w-[95%] ml-10 mt-5 gap-5 items-center flex">
            <ReplyCard reply={reply} />
          </div>
        );
      })}
    </div>
  );
}
