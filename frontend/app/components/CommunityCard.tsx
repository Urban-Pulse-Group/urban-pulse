import React from "react";
import { Avatar, AvatarFallback } from "../components/Avatar";
import { Link } from "react-router-dom";
import { Community } from "../components/ForumSidebar";

const CommunityCard = ({ community }: { community: Community }) => {
  return (
    <Link
      to={`/forum/communities/${community.slugs}`}
      className="relative flex items-end justify-start p-4 bg-cover bg-center h-40 w-72 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      style={{ backgroundImage: `url(${community.img})` }}>
      <div className="bg-gradient-to-t from-black to-transparent absolute inset-0 rounded-lg"></div>
      <div className="relative z-10 flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarFallback>
            {community.title.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-bold text-white">
            {community.title.split(",")[0]}
          </h3>
          <p className="text-sm text-gray-300">{community.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
