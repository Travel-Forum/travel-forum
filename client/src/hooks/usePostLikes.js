import { useEffect, useState } from "react";
import { getLikedPostIds } from "../services/likesService";

export const usePostLikes = (userId) => {
    const [likedPostIds, setLikedPostIds] = useState([]);
    
    useEffect(() => {
        if (!userId) return;

        let ignore = false;

        getLikedPostIds(userId).then(({data}) => {
            if (!ignore && data ) setLikedPostIds(data);
        });
        
        return () => {
            ignore = true;
        };
    }, [userId]);
    
    const isLiked = (postId) => likedPostIds.includes(postId);

    return { isLiked };
};