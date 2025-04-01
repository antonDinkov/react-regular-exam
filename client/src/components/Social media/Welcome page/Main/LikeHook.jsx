import { getLiked, setLiked } from "../../../HTTP/localeStorageApi";
import { postLike } from "../../../HTTP/registerAndLogin";

function useLikeHandle() {

    

    const handleLike = async (postId) => {
        try {
            const isLiked = getLiked(postId)
            if (isLiked === "true") {
                return alert('You  can like only once');
            }
            await postLike(postId);
            setLiked(postId);
        } catch (error) {
            alert("Error adding like: " + error.message);
        }
    };

    return { handleLike };
}

export default useLikeHandle;