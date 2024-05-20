import React, { useEffect, useState } from "react";
import { authenticatedFetch } from "../utils/fetchUtils";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { timeSince, truncateText } from "../utils/genUtils";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { MessageSquare } from "lucide-react";
import { Share } from "lucide-react";
import PostCard from "./PostCard";
import DOMPurify from "dompurify";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Community } from "./ForumSidebar";
export interface Post {
  id?: string;
  userId: string;
  title: string;
  content: string;
  communityId: string;
  created_at?: string;
  img?: string;
  username: string;
  likes: number;
  reply_count?: number;
  thread_count?: number;
  total_count?: number;
}
export default function CommunityPosts({
  postState,
}: {
  postState: { posts: Post[]; setPosts: Dispatch<SetStateAction<Post[]>> };
}) {
  const [truncatedLength, setTruncatedLength] = useState(100);

  const { posts, setPosts } = postState;

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
    <div className="overflow-scroll  no-scrollbar h-screen pb-20 mr-5">
      {posts?.map((post) => {
        return <PostCard post={post} truncatedLength={truncatedLength} />;
      })}
    </div>
  );
}
