import React, { useEffect, useState } from "react";
import { authenticatedFetch } from "../utils/fetchUtils";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { timeSince, truncateText } from "../utils/genUtils";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { MessageSquare } from "lucide-react";
import { Share } from "lucide-react";
import PostCard from "./PostCard";
import DOMPurify from "dompurify";
export interface Post {
  id?: string;
  userId: string;
  title: string;
  content: string;
  communityId: string;
  created_at?: string;
  img?: string;
    username: string;
    likes: number
}
export default function CommunityPosts({
  communityId,
}: {
  communityId: string;
}) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [truncatedLength, setTruncatedLength] = useState(100);
  const [upvotes, setUpvotes] = useState();

  useEffect(() => {
    if (!communityId) {
      return;
    }
    const fetchPosts = async () => {
      try {
        const res = await authenticatedFetch(
          `http://localhost:4040/api/post/${communityId}`,
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
  }, [communityId]);
  console.log("post:", posts);
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
    <div className="">
      {posts?.map((post) => {
        return <PostCard post={post} truncatedLength={truncatedLength} />;
      })}
    </div>
  );
}
