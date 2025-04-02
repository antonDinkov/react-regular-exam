import { useLocation } from 'react-router';
import styles from './Details.module.css';
import usePostComment from './postCommentHook';
import { useEffect, useRef, useState } from 'react';
import { getPostById } from '../../../../HTTP/registerAndLogin';
/* import useViewHandle from '../ViewHook'; */

function Details() {
    const location = useLocation();
    const { handleComment } = usePostComment();
    const post = location.state?.postId;
    const refComment = useRef();
    const [postData, setPostData] = useState(null);
    const [comments, setComments] = useState([]);
    /* const [stoper, setStoper] = useState(false) */
    /* const {handleView} = useViewHandle(); */

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
            setPostData(data)
        }
        fetchPost();
    }, [comments]);


    return (
        <>
            {!postData ? (
                <p>Loading post data...</p>
            ) : (
                <div key={postData.id} className={styles.post}>
                    <div className={styles.imgWrap}>
                        <div className={styles.meta}>
                            <img src={postData.meta.img || postData.meta.avatar || "https://example.com/default-avatar.jpg"} alt="Profile" />
                            <h4>{postData.meta.author}</h4>
                            <p>{postData.meta.date}</p>
                        </div>
                        <p>{postData.content}</p>
                        <img src={postData.img || "https://example.com/default-avatar.jpg"} alt="Img or Video" />
                    </div>

                    <div className={styles.feedback}>
                        <p><i className="fa-regular fa-comment"></i><span>{postData.feedback.comments}</span></p>
                        <p><i className="fa-regular fa-heart"></i><span>{postData.feedback.likes}</span></p>
                        <p><i className="fa-solid fa-magnifying-glass"></i><span>{postData.feedback.views}</span></p>
                    </div>


                    <div className={styles.actions}>
                        <button className={styles.editButton} onClick={() => handleEdit(post.id)}>Edit</button>
                        <button className={styles.deleteButton} onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>


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
                                    {/* <img src={comment.avatar || "https://example.com/default-avatar.jpg"} alt="User" /> */}
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