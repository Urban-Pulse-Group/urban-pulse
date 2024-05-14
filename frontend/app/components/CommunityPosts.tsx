import React, { useEffect, useState } from "react";
import { authenticatedFetch } from "../utils/fetchUtils";
export interface Post {
  id?: string;
  userId: string;
  title: string;
  content: string;
  communityId: string;
  created_at?: Date;
  img?: string;
}
export default function CommunityPosts({ communityId }: { communityId: string }) {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await authenticatedFetch(
          `http://localhost:4040/api/post/${communityId}`,
          localStorage.getItem("token")
        );

        const data = await res.json();
        setPosts(data.data);
      } catch (error) {
        console.error(error);
      }
    };
  });
  return <div></div>;
}
