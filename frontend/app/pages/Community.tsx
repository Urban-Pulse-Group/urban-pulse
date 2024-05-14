import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Community } from "../components/ForumSidebar";
import { authenticatedFetch } from "../utils/fetchUtils";
export default function CommunityPage() {
    const { slugs } = useParams();
    const [community, setCommunity] = useState<Community | null>();

    useEffect(() => {
        const getCommunity = async () => {
            
        }
    })

    return (
        <div>
            {slugs}
            
        </div>
    )
}