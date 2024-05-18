import React, { useEffect, useState } from "react";
import { authenticatedFetch } from "../utils/fetchUtils";
import HomePostCard from "./HomePostCard";
import { Dispatch, SetStateAction } from "react";
import { HomePost } from "./HomePostCard";


export default function HomePosts({
  postState,
}: {
  postState: { posts: HomePost[]; setPosts: Dispatch<SetStateAction<HomePost[]>> };
}) {
  const [truncatedLength, setTruncatedLength] = useState(100);
  const { posts, setPosts } = postState;

  useEffect(() => {
    const fetchRandomPosts = async () => {
      try {
        const response = await authenticatedFetch("/api/post/random", localStorage.getItem("token"));
        if (!response.ok) {
          throw new Error("Failed to fetch random posts");
        }
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching random posts:", error);
      }
    };

    fetchRandomPosts();
  }, [setPosts]);

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
    <div className="overflow-scroll no-scrollbar h-screen pb-20 mr-5">
      {posts?.map((post) => {
        return <HomePostCard key={post.id} post={post} truncatedLength={truncatedLength} />;
      })}
    </div>
  );
}
