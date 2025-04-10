import { useLocation, useNavigate } from 'react-router';
import styles from './Details.module.css';
import usePostComment from './postCommentHook';
import { useEffect, useRef, useState } from 'react';
import { deletePost, getAllPosts, getPostById } from '../../../../HTTP/registerAndLogin';
import { getUser } from '../../../../HTTP/localeStorageApi';
import useLikeHandle from '../LikeHook'


function Details() {
    const location = useLocation();
    const { handleComment } = usePostComment();
    const post = location.state?.postId;
    const refComment = useRef();
    const [postData, setPostData] = useState(null);
    const [comments, setComments] = useState([]);
    const [owner, setOwner] = useState(false);
    const navigate = useNavigate();
    const {handleLike} = useLikeHandle();


    if (!post) return <p>No post data found</p>;

    const handleReply = async () => {
        const newComment = await handleComment(postData, refComment);
        if (newComment) {
            setComments((prevComments) => [...prevComments, newComment]); 6
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            const data = await getPostById(post);
            const currUserInfo = JSON.parse(getUser());
            const currUserName = currUserInfo.name;
            if (currUserName === data.meta.author) {
                setOwner(true)
            }
            setPostData(data)
        }
        fetchPost();
    }, [comments]);

    const handleDelete = async () => {

        const postId = postData.id;
        deletePost(postId);

        navigate('/react-regular-exam/welcome');
    };

    const handleEdit = () => {
        if (postData) {
            navigate(`/react-regular-exam/welcome/${postData.id}/details/edit`, {state: {postData}});
        }
    }

    const likesHandle = async (e) => {
            const sourceElement = e.target.closest('#closestId');
            const postId = sourceElement.getAttribute("data-id");
    
            await handleLike(postId)
            const data = await getPostById(post);
            if(data){
                setPostData(data);
            }
        }


    return (
        <>
            {!postData ? (
                <p>Loading post data...</p>
            ) : (
                <div id='closestId' data-id={postData.id} data-imgid={postData.imgId} key={postData.id} className={styles.post}>
                    <div className={styles.imgWrap}>
                        <div className={styles.meta}>
                            <img src={postData.meta.img || postData.meta.avatar || "https://example.com/default-avatar.jpg"} alt="Profile" />
                            <h4>{postData.meta.author}</h4>
                            <p>{postData.meta.date}</p>
                        </div>
                        <p>{postData.content}</p>
                        {postData.img && <img src={postData.img} alt="" />}
                    </div>

                    <div className={styles.feedback}>
                        <p><i className="fa-regular fa-comment"></i><span>{postData.feedback.comments}</span></p>
                        <p onClick={(e) => likesHandle(e)}><i className="fa-regular fa-heart"></i><span>{postData.feedback.likes}</span></p>
                        <p><i className="fa-solid fa-magnifying-glass"></i><span>{postData.feedback.views}</span></p>
                    </div>

                    {owner && (
                        <div className={styles.actions}>
                            <button className={styles.editButton} onClick={() => handleEdit()}>Edit</button>
                            <button className={styles.deleteButton} onClick={() => handleDelete()}>Delete</button>
                        </div>
                    )}



                    <div className={styles.commentSection}>
                        <textarea ref={refComment} placeholder="Post your reply" className={styles.commentInput}></textarea>
                        <button className={styles.commentButton} onClick={() => handleReply()}>Reply</button>
                    </div>
                </div>
            )}
            {!postData ? (
                <p>Loading post data...</p>
            ) : (
                <div className={styles.commentsContainer}>
                    {postData.comments && postData.comments.length > 0 ? (
                        postData.comments.map((comment) => (
                            <div key={comment.data.id} className={styles.comment}>
                                <div className={styles.commentHeader}>

                                    <h5>{comment.data.author}</h5>
                                    <p className={styles.commentDate}>{comment.data.date}</p>
                                </div>
                                <p className={styles.commentText}>{comment.data.text}</p>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noComments}>No comments yet. Be the first to reply!</p>
                    )}

                </div>
            )}
        </>

    )
}

export default Details;