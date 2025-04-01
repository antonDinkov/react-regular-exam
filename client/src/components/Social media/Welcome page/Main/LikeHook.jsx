import { useEffect } from "react";
import { postLike } from "../../../HTTP/registerAndLogin";

function useLikeHandle() {

    const handleLike = async (postId) => {
        try {
            await postLike(postId);
        } catch (error) {
            alert("Error adding like: " + error.message);
        }
    };

    return { handleLike };
}

export default useLikeHandle;