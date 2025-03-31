import { getUser } from "../../../../HTTP/localeStorageApi";
import { postComment } from "../../../../HTTP/registerAndLogin";
import { v4 as uuidv4 } from 'uuid';

function usePostComment() {
    const userInfo = JSON.parse(getUser());
    const userName = userInfo.name;
    const handleComment = async (post, refComment) => {
        const postId = post.id;
        const data = {
            id: uuidv4(),
            author: userName,
            text: refComment.current.value,
            date: new Date().toLocaleString()
        }
        refComment.current.value = '';
        await postComment(postId, data);
        return data;
    }
    
    return { handleComment };
};

export default usePostComment;