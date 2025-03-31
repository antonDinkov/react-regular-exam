import { postComment } from "../../../../HTTP/registerAndLogin";
import { v4 as uuidv4 } from 'uuid';

function usePostComment() {
    const handleComment = async (post, refComment) => {
        const postId = post.id;
        const data = {
            id: uuidv4(),
            author: post.meta.author,
            text: refComment.current.value,
            date: new Date().toLocaleString()
        }
        return postComment(postId, data)
    }

    return { handleComment };
};

export default usePostComment;