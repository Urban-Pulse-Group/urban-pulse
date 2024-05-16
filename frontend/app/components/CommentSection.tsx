import React, { Dispatch, SetStateAction } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { timeSince } from "../utils/genUtils";
import { Comment } from "../pages/PostPage";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { MessageSquare, Share } from "lucide-react";
import DOMPurify from "dompurify";

import { Post } from "./CommunityPosts";
import { Link } from "react-router-dom";
import { useAuth } from "../state/authStore";
import { useNavigate } from "react-router-dom";
import { Community } from "./ForumSidebar";
import CommentCard from "./CommentCard";
interface Props {
  commentState: {
    comments: Comment[];
    setComments: Dispatch<SetStateAction<Comment[]>>;
  };
}

export default function CommentSection({ commentState }: Props) {
  const { comments, setComments } = commentState;
  return (
    <div className="mt-10">
      {comments?.map((comment) => {
        return (
         <CommentCard comment={comment} />
        );
      })}
    </div>
  );
}
