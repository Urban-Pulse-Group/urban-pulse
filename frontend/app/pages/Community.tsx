import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Community } from "../components/ForumSidebar";
import { authenticatedFetch } from "../utils/fetchUtils";
export default function CommunityPage() {
  const { slugs } = useParams();
  const [community, setCommunity] = useState<Community | null>();

  useEffect(() => {
      const getCommunity = async () => {
          try {
           const res = await authenticatedFetch(
        `http://localhost:4040/api/community/${slugs}`,localStorage.get("token")
      );
        const data = await res.json();
              console.log(data);
              setCommunity(data.data[0])
        } catch (err) {
              console.log(err)
        }
      
    };
      getCommunity();
  },[]);

  return (
    <div>
      <img src={community?.img} alt="" />
    </div>
  );
}
