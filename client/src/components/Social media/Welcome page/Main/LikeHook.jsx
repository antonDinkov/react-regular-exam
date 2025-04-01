import { getUser } from "../../../HTTP/localeStorageApi";
import { getPostById, postLike } from "../../../HTTP/registerAndLogin";

function useLikeHandle() {

    

    const handleLike = async (postId) => {
        try {
            const currentUser = JSON.parse(getUser());
            const currUserName = currentUser.name;
            console.log(currUserName);
            const postInfo = await getPostById(postId);
            const likesArray = postInfo.feedback.likedPeople;
            console.log(likesArray);
            
            const isLiked = likesArray.filter((name) => name === currUserName);
            console.log(isLiked);
            
            if (isLiked.length > 0) {
                return alert('You  can like only once');
            }
            await postLike(postId, currUserName);
        } catch (error) {
            alert("Error adding like: " + error.message);
        }
    };

    return { handleLike };
}

export default useLikeHandle;