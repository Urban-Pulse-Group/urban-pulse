import React from "react";
import { useParams } from "react-router-dom";


export default function Community() {
    const { slugs } = useParams();

    return (
        <div>
            {slugs}
            
        </div>
    )
}